async function hostReactAppReady(selector = '#__next > div', timeout = 500) {
    return new Promise(resolve => {
        const waiter = () => {
            const hostEl = document.querySelector(selector);
            if (hostEl?.getBoundingClientRect().height) resolve();
            else setTimeout(waiter, timeout);
        };
        waiter();
    });
}

async function waitForElement(selector, {timeout = 20000, interval = 200} = {}) {
    const start = Date.now();
    return new Promise(resolve => {
        const tick = () => {
            const el = document.querySelector(selector);
            if (el) return resolve(el);
            if (Date.now() - start > timeout) return resolve(null);
            setTimeout(tick, interval);
        };
        tick();
    });
}

hostReactAppReady().then(async () => {
    if (
        typeof window.createEliteState !== 'function' ||
        typeof window.createElitePopupController !== 'function' ||
        typeof window.createEliteShieldController !== 'function' ||
        typeof window.initEliteSearchInterceptor !== 'function'
    ) {
        console.warn('[elite] modules are not fully loaded');
        return;
    }

    const YM_ID = 96674199;
    const analytics = {
        reachGoal(goal, params) {
            try {
                if (typeof window.ym === 'function') {
                    if (params !== undefined) window.ym(YM_ID, 'reachGoal', goal, params);
                    else window.ym(YM_ID, 'reachGoal', goal);
                }
            } catch (e) {
            }
        },
        mindboxAsync(payload) {
            try {
                if (typeof window.mindbox === 'function') {
                    window.mindbox('async', payload);
                }
            } catch (e) {
            }
        },
        mindboxSync(payload) {
            try {
                if (typeof window.mindbox === 'function') {
                    window.mindbox('sync', payload);
                }
            } catch (e) {
            }
        },
    };

    const state = window.createEliteState();
    const popup = window.createElitePopupController({state, analytics});
    const shield = window.createEliteShieldController({
        state,
        analytics,
        openPopup: () => popup.openElitePopup(),
        waitForElement,
    });

    window.initEliteSearchInterceptor({state});

    await shield.init();

    if (state.shouldAutoOpenPopup()) {
        state.markPopupShown();
        popup.openElitePopup({isAutoOpen: true});
    }

    analytics.mindboxSync({
        operation: 'getUserName',
        onSuccess(response) {
            state.setEliteUserName(response?.customer?.firstName?.trim() || '');
        },
        onValidationError(messages) {
        },
        onError(error) {
        },
    });
});
