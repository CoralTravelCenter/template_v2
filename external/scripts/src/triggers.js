async function hostReactAppReady(selector = '#__next > div', timeout = 500) {
    return new Promise(resolve => {
        const waiter = () => {
            const host_el = document.querySelector(selector);
            if (host_el?.getBoundingClientRect().height) {
                resolve();
            } else {
                setTimeout(waiter, timeout);
            }
        };
        waiter();
    });
}

hostReactAppReady().then(() => {
    if (window.__YM_CUSTOM_TRACKER__) return;
    Object.defineProperty(window, '__YM_CUSTOM_TRACKER__', { value: true });

    const CONFIG = Object.freeze({
        COUNTER_ID: 96674199,
        GOALS: Object.freeze({
            click: 'trigger_click',
            pageview2: 'trigger_page_view',
            scroll: 'trigger_scroll',
            time30: 'trigger_time',
            all: 'all_triggers',
        }),
        STORAGE_KEY: 'ym_custom_state_v3',
        HOUR_MS: 60 * 60 * 1000,
        TIME_GOAL_MS: 30 * 1000,
        DEBUG: false,
    });

    const log = (...args) => CONFIG.DEBUG && console.log('[YM-CT]', ...args);
    const now = () => Date.now();


    const storage = (() => {
        try {
            const t = '__ym_ct_test__';
            localStorage.setItem(t, '1');
            localStorage.removeItem(t);
            return {
                get: () => JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) ?? 'null'),
                set: (v) => localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(v)),
                clear: () => localStorage.removeItem(CONFIG.STORAGE_KEY),
            };
        } catch {
            let mem = null;
            log('localStorage недоступен — используем память вкладки');
            return {
                get: () => (mem ? JSON.parse(JSON.stringify(mem)) : null),
                set: (v) => { mem = JSON.parse(JSON.stringify(v)); },
                clear: () => { mem = null; },
            };
        }
    })();

    const freshState = (startTs = now()) => ({
        windowStart: startTs,
        pageviews: 0,
        activeMs: 0,
        lastUrl: null,
        lastTickTs: null,
        sent: { click: false, pageview2: false, scroll: false, time30: false, all: false },
    });

    let state = storage.get() ?? freshState();
    const save = () => storage.set(state);
    const isExpired = (s) => !s || (now() - s.windowStart >= CONFIG.HOUR_MS);

    const resetWindow = (startTs = now()) => {
        log('Сброс окна отслеживания');
        state = freshState(startTs);
        save();
        scheduleExpiryTimer();
    };

    if (isExpired(state)) resetWindow();


    let expiryTimer;
    const scheduleExpiryTimer = () => {
        if (expiryTimer) clearTimeout(expiryTimer);
        const left = Math.max(0, state.windowStart + CONFIG.HOUR_MS - now());
        expiryTimer = setTimeout(() => resetWindow(), left);
    };
    scheduleExpiryTimer();


    const goalQueue = [];
    let ymPoll;
    const ymAvailable = () => typeof window.ym === 'function';

    const flushGoals = () => {
        if (!ymAvailable()) return;
        while (goalQueue.length) {
            const g = goalQueue.shift();
            try {
                window.ym(CONFIG.COUNTER_ID, 'reachGoal', g);
                log('Отправил цель из очереди:', g);
            } catch (e) {
                log('Ошибка отправки цели:', g, e);
            }
        }
        if (ymPoll) { clearInterval(ymPoll); ymPoll = null; }
    };

    const sendGoal = (goalName) => {
        if (isExpired(state)) resetWindow();
        if (ymAvailable()) {
            try {
                window.ym(CONFIG.COUNTER_ID, 'reachGoal', goalName);
                log('Отправил цель:', goalName);
            } catch (e) {
                log('Ошибка, буфер:', goalName, e);
                goalQueue.push(goalName);
            }
        } else {
            log('ym недоступен, буфер:', goalName);
            goalQueue.push(goalName);
            if (!ymPoll) ymPoll = setInterval(flushGoals, 400);
        }
    };


    let windowStarted = !!state.windowStart;
    const ensureWindowStarted = () => {
        if (!windowStarted) {
            state.windowStart = now();
            windowStarted = true;
            save();
            scheduleExpiryTimer();
        }
    };


    const maybeSendAll = () => {
        const s = state.sent;
        if (!s.all && s.click && s.scroll && s.time30 && s.pageview2) {
            sendGoal(CONFIG.GOALS.all);
            s.all = true;
            save();
            log('Отправлен all_triggers');
        }
    };


    const handlePageview = () => {
        ensureWindowStarted();
        const url = location.href;
        if (state.lastUrl === url) return;
        state.lastUrl = url;
        state.pageviews += 1;
        log('Pageview', state.pageviews, url);

        if (!state.sent.pageview2 && state.pageviews >= 2) {
            sendGoal(CONFIG.GOALS.pageview2);
            state.sent.pageview2 = true;
            save();
            maybeSendAll();
        } else {
            save();
        }
    };


    (() => {
        const dispatch = () => {
            try {
                window.dispatchEvent(new Event('locationchange'));
            } catch {
                const evt = document.createEvent('Event');
                evt.initEvent('locationchange', true, true);
                window.dispatchEvent(evt);
            }
        };
        const wrap = (method) => (...args) => {
            const res = method.apply(history, args);
            dispatch();
            return res;
        };
        history.pushState = wrap(history.pushState);
        history.replaceState = wrap(history.replaceState);
        window.addEventListener('popstate', dispatch);
        window.addEventListener('hashchange', dispatch);
        window.addEventListener('locationchange', handlePageview);
    })();


    handlePageview();


    window.addEventListener('click', () => {
        ensureWindowStarted();
        if (!state.sent.click) {
            sendGoal(CONFIG.GOALS.click);
            state.sent.click = true;
            save();
            maybeSendAll();
        }
    }, { passive: true, once: true });


    window.addEventListener('scroll', () => {
        ensureWindowStarted();
        if (!state.sent.scroll) {
            sendGoal(CONFIG.GOALS.scroll);
            state.sent.scroll = true;
            save();
            maybeSendAll();
        }
    }, { passive: true, once: true });


    let tickInterval;

    const startActiveTimer = () => {
        if (tickInterval) return;
        state.lastTickTs = now();
        tickInterval = setInterval(() => {
            const t = now();
            if (document.visibilityState === 'visible') {
                let dt = t - (state.lastTickTs ?? t);
                if (dt > 5000) dt = 1000; // защита от «пробуждения»
                state.activeMs += dt;
                if (!state.sent.time30 && state.activeMs >= CONFIG.TIME_GOAL_MS) {
                    sendGoal(CONFIG.GOALS.time30);
                    state.sent.time30 = true;
                    save();
                    maybeSendAll();
                } else {
                    save();
                }
            }
            state.lastTickTs = t;
        }, 1000);
    };

    const stopActiveTimer = () => {
        if (tickInterval) { clearInterval(tickInterval); tickInterval = null; }
        state.lastTickTs = null;
        save();
    };

    const onVisibility = () => {
        if (document.visibilityState === 'visible') {
            ensureWindowStarted();
            startActiveTimer();
        } else {
            stopActiveTimer();
        }
    };

    if (document.visibilityState === 'visible') {
        ensureWindowStarted();
        startActiveTimer();
    }
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', stopActiveTimer);


    Object.defineProperty(window, 'YM_CT_state', {
        get: () => JSON.parse(JSON.stringify(state)),
    });

    log('Инициализировано', state);
});
