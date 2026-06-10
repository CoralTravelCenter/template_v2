(() => {
    const SCRIPT_FLAG = '__eliteSearchInitialized__';
    const QUICK_SEARCH_SELECTOR = '#quick-search-tab-area [data-testid="QuickSearchPackageToursBlock"]';
    const ARRIVAL_COLUMN_SELECTOR = '[data-testid="quickSearchPackageToursArrivalLocationColumn"]';
    const SEARCH_BUTTON_COLUMN_SELECTOR = '[data-testid="quickSearchPackageTourSearchButtonColumn"]';
    const PENDING_STORAGE_KEY = 'eliteSearchPendingRedirect';
    const ACTIVE_ELITE_STORAGE_KEY = 'eliteSearchActiveFilters';
    const PENDING_TTL_MS = 30000;
    const ACTIVE_TTL_MS = 120000;
    const DECRYPT_ENDPOINT = 'https://b2capi.coral.ru/PackageTourHotelProduct/PriceSearchDecrypt';
    const ENCRYPT_ENDPOINT = 'https://b2capi.coral.ru/PackageTourHotelProduct/PriceSearchEncrypt';
    const ELITE_FILTER_SIGNATURE = [
        {type: 21, values: ['2'], match: 'all'},
        {type: 3, values: ['1', '49'], match: 'any'},
    ];

    if (window[SCRIPT_FLAG]) return;
    window[SCRIPT_FLAG] = true;

    const state = {
        isInitialized: false,
        isRedirecting: false,
        currentEliteFilters: [],
        lastHandledHref: '',
        locationCheckTimer: 0,
    };

    const logDebug = (...args) => {
        try {
            console.debug('[eliteSearch]', ...args);
        } catch (e) {
        }
    };

    const logWarn = (...args) => {
        try {
            console.warn('[eliteSearch]', ...args);
        } catch (e) {
        }
    };

    const safeJsonParse = (value) => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return null;
        }
    };

    const getCurrentUrl = () => {
        try {
            return new URL(window.location.href);
        } catch (e) {
            return null;
        }
    };

    const normalizeQueryParam = (value) => {
        let normalized = String(value || '').trim();

        for (let i = 0; i < 5; i += 1) {
            if (!normalized) break;

            if (normalized.startsWith('qp=')) {
                normalized = normalized.slice(3);
                continue;
            }

            if (/^qp%3d/i.test(normalized) || /%[0-9a-f]{2}/i.test(normalized)) {
                try {
                    const decoded = decodeURIComponent(normalized);
                    if (decoded === normalized) break;
                    normalized = decoded;
                    continue;
                } catch (e) {
                }
            }

            break;
        }

        return normalized;
    };

    const isPackageToursPage = (url = getCurrentUrl()) => {
        if (!url) return false;
        return /\/packagetours(?:\/|$)/.test(url.pathname);
    };

    const fetchJson = async (url, body) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} for ${url}`);
        }

        return response.json();
    };

    const waitForQuickSearch = (timeout = 20000) => new Promise((resolve) => {
        const existing = document.querySelector(QUICK_SEARCH_SELECTOR);
        if (existing) {
            resolve(existing);
            return;
        }

        const startedAt = Date.now();
        const observer = new MutationObserver(() => {
            const quickSearch = document.querySelector(QUICK_SEARCH_SELECTOR);
            if (quickSearch) {
                observer.disconnect();
                resolve(quickSearch);
                return;
            }

            if (Date.now() - startedAt > timeout) {
                observer.disconnect();
                resolve(null);
            }
        });

        observer.observe(document.documentElement, {childList: true, subtree: true});

        setTimeout(() => {
            observer.disconnect();
            resolve(document.querySelector(QUICK_SEARCH_SELECTOR));
        }, timeout);
    });

    const cloneJson = (value) => {
        try {
            return JSON.parse(JSON.stringify(value));
        } catch (e) {
            return value;
        }
    };

    const normalizeFilterValue = (value) => String(value?.value ?? value?.id ?? '');

    const hasAllValues = (filter, requiredValues = []) => {
        const existingValues = new Set((filter?.values || []).map(normalizeFilterValue));
        return requiredValues.every((value) => existingValues.has(String(value)));
    };

    const hasAnyValue = (filter, requiredValues = []) => {
        const existingValues = new Set((filter?.values || []).map(normalizeFilterValue));
        return requiredValues.some((value) => existingValues.has(String(value)));
    };

    const isEliteSearchCriteria = (searchCriterias) => {
        const filters = Array.isArray(searchCriterias?.additionalFilters) ? searchCriterias.additionalFilters : [];

        return ELITE_FILTER_SIGNATURE.every((signature) => {
            const filter = filters.find((item) => Number(item?.type) === Number(signature.type));
            if (!filter) return false;

            if (signature.match === 'any') {
                return hasAnyValue(filter, signature.values);
            }

            return hasAllValues(filter, signature.values);
        });
    };

    const extractEliteFilters = (searchCriterias) => {
        const sourceFilters = Array.isArray(searchCriterias?.additionalFilters) ? searchCriterias.additionalFilters : [];

        return ELITE_FILTER_SIGNATURE.map((signature) => {
            const sourceFilter = sourceFilters.find((item) => Number(item?.type) === Number(signature.type));
            if (!sourceFilter) return null;

            const values = (sourceFilter.values || []).filter((item) => signature.values.includes(normalizeFilterValue(item)));
            if (!values.length) return null;

            return {
                ...cloneJson(sourceFilter),
                type: Number(sourceFilter.type),
                values: cloneJson(values),
                providers: sourceFilter.providers ?? null,
            };
        }).filter(Boolean);
    };

    const mergeFilterValues = (baseValues = [], eliteValues = []) => {
        const result = [];
        const seen = new Set();

        [...baseValues, ...eliteValues].forEach((item) => {
            const key = `${item?.id ?? ''}:${item?.value ?? ''}:${item?.parent ?? ''}`;
            if (seen.has(key)) return;
            seen.add(key);
            result.push(cloneJson(item));
        });

        return result;
    };

    const mergeAdditionalFilters = (baseFilters = [], eliteFilters = []) => {
        const merged = new Map();

        baseFilters.forEach((filter) => {
            if (!filter || filter.type == null) return;
            merged.set(Number(filter.type), cloneJson(filter));
        });

        eliteFilters.forEach((filter) => {
            if (!filter || filter.type == null) return;
            const type = Number(filter.type);
            const existing = merged.get(type);

            if (!existing) {
                merged.set(type, cloneJson(filter));
                return;
            }

            existing.values = mergeFilterValues(existing.values || [], filter.values || []);
            if (existing.providers == null && filter.providers != null) {
                existing.providers = cloneJson(filter.providers);
            }
            merged.set(type, existing);
        });

        return Array.from(merged.values());
    };

    const buildEliteSearchPayload = (searchCriterias, eliteFilters) => {
        const nextPayload = cloneJson(searchCriterias) || {};
        const additionalFilters = Array.isArray(nextPayload.additionalFilters) ? nextPayload.additionalFilters : [];

        nextPayload.additionalFilters = mergeAdditionalFilters(additionalFilters, eliteFilters);
        return nextPayload;
    };

    const requestDecryptedCriteria = async (queryParam) => {
        const normalizedQueryParam = normalizeQueryParam(queryParam);
        console.log('Decrypting search criteria for qp', normalizedQueryParam);
        const response = await fetchJson(DECRYPT_ENDPOINT, {
            queryParam: encodeURIComponent(normalizedQueryParam),
        });

        return response?.result?.searchCriterias || null;
    };

    const requestEncryptedEliteUrl = async (payload) => {
        console.log('Encrypting elite payload', payload);
        return fetchJson(ENCRYPT_ENDPOINT, payload);
    };

    const buildRedirectUrl = (encryptionResponse, sourceUrl) => {
        const redirectionUrl = encryptionResponse?.result?.redirectionUrl;
        const queryParam = normalizeQueryParam(encryptionResponse?.result?.queryParam);

        if (!redirectionUrl || !queryParam) {
            throw new Error('Encrypt response does not contain redirect data');
        }

        const targetUrl = new URL(redirectionUrl, window.location.origin);
        const sourceParams = new URLSearchParams(sourceUrl.search);
        const finalParams = new URLSearchParams(targetUrl.search);

        finalParams.set('qp', queryParam);

        sourceParams.forEach((value, key) => {
            if (key === 'qp') return;
            finalParams.set(key, value);
        });

        targetUrl.search = finalParams.toString();
        return targetUrl.toString();
    };

    const navigateToEliteUrl = (url, {replace = false} = {}) => {
        if (!url) return;

        if (replace) {
            window.location.replace(url);
            return;
        }

        window.location.assign(url);
    };

    const readPendingRedirect = () => {
        const raw = sessionStorage.getItem(PENDING_STORAGE_KEY);
        const data = raw ? safeJsonParse(raw) : null;

        if (!data) return null;
        if (!Array.isArray(data.eliteFilters) || !data.expiresAt) {
            sessionStorage.removeItem(PENDING_STORAGE_KEY);
            return null;
        }

        if (Date.now() > Number(data.expiresAt)) {
            sessionStorage.removeItem(PENDING_STORAGE_KEY);
            return null;
        }

        return data;
    };

    const clearPendingRedirect = () => {
        sessionStorage.removeItem(PENDING_STORAGE_KEY);
    };

    const readActiveEliteFilters = () => {
        const raw = sessionStorage.getItem(ACTIVE_ELITE_STORAGE_KEY);
        const data = raw ? safeJsonParse(raw) : null;

        if (!data) return null;
        if (!Array.isArray(data.eliteFilters) || !data.expiresAt) {
            sessionStorage.removeItem(ACTIVE_ELITE_STORAGE_KEY);
            return null;
        }

        if (Date.now() > Number(data.expiresAt)) {
            sessionStorage.removeItem(ACTIVE_ELITE_STORAGE_KEY);
            return null;
        }

        return data;
    };

    const storeActiveEliteFilters = (eliteFilters) => {
        if (!Array.isArray(eliteFilters) || !eliteFilters.length) return;

        sessionStorage.setItem(ACTIVE_ELITE_STORAGE_KEY, JSON.stringify({
            eliteFilters,
            createdAt: Date.now(),
            expiresAt: Date.now() + ACTIVE_TTL_MS,
            sourceUrl: window.location.href,
        }));

        console.log('Stored active elite filters', eliteFilters);
    };

    const storePendingRedirect = (eliteFilters) => {
        if (!Array.isArray(eliteFilters) || !eliteFilters.length) return;

        sessionStorage.setItem(PENDING_STORAGE_KEY, JSON.stringify({
            eliteFilters,
            createdAt: Date.now(),
            expiresAt: Date.now() + PENDING_TTL_MS,
            sourcePath: window.location.pathname,
        }));

        console.log('Stored pending elite redirect', eliteFilters);
    };

    const shouldMarkPendingFromClick = (target, quickSearchRoot) => {
        if (!target || !quickSearchRoot?.contains(target)) return false;

        const interactive = target.closest('button, a, [role="button"], [role="option"], [type="submit"]');
        if (!interactive) return false;

        if (interactive.closest(SEARCH_BUTTON_COLUMN_SELECTOR)) return true;
        if (interactive.closest(ARRIVAL_COLUMN_SELECTOR)) return true;

        if (interactive.tagName === 'A') {
            const href = interactive.getAttribute('href') || '';
            return href.includes('/packagetours');
        }

        return false;
    };

    const bindQuickSearch = (quickSearchRoot, eliteFilters) => {
        if (!quickSearchRoot || quickSearchRoot.dataset.eliteSearchBound === '1') return;

        quickSearchRoot.dataset.eliteSearchBound = '1';

        quickSearchRoot.addEventListener('submit', () => {
            storePendingRedirect(eliteFilters);
            console.log('Marked pending elite redirect from quick-search submit');
        }, true);

        quickSearchRoot.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter') return;
            storePendingRedirect(eliteFilters);
            console.log('Marked pending elite redirect from quick-search Enter');
        }, true);

        quickSearchRoot.addEventListener('click', (event) => {
            if (!shouldMarkPendingFromClick(event.target, quickSearchRoot)) return;
            storePendingRedirect(eliteFilters);
            console.log('Marked pending elite redirect from quick-search click');
        }, true);
    };

    const upgradeCurrentPageToElite = async (eliteFilters) => {
        if (state.isRedirecting) return;
        state.isRedirecting = true;

        try {
            const currentUrl = getCurrentUrl();
            if (!currentUrl) return;

            const currentQueryParam = currentUrl.searchParams.get('qp');
            if (!currentQueryParam) return;

            const currentCriteria = await requestDecryptedCriteria(currentQueryParam);
            if (!currentCriteria) throw new Error('Failed to decrypt target search criteria');
            if (isEliteSearchCriteria(currentCriteria)) {
                clearPendingRedirect();
                return;
            }

            const payload = buildEliteSearchPayload(currentCriteria, eliteFilters);
            const encryptionResponse = await requestEncryptedEliteUrl(payload);
            const redirectUrl = buildRedirectUrl(encryptionResponse, currentUrl);

            clearPendingRedirect();
            console.log('Original search URL', currentUrl.toString());
            console.log('Encrypted elite response', encryptionResponse);
            console.log('Redirecting to elite search URL', redirectUrl);
            navigateToEliteUrl(redirectUrl, {replace: true});
        } catch (error) {
            clearPendingRedirect();
            logWarn('Failed to upgrade search URL to elite mode, keeping default search', error);
        } finally {
            state.isRedirecting = false;
        }
    };

    const isEliteSearchPage = async () => {
        const url = getCurrentUrl();
        if (!isPackageToursPage(url)) return false;

        const qp = url?.searchParams.get('qp');
        if (!qp) return false;

        try {
            const currentCriteria = await requestDecryptedCriteria(qp);
            if (!currentCriteria || !isEliteSearchCriteria(currentCriteria)) return false;

            state.currentEliteFilters = extractEliteFilters(currentCriteria);
            return state.currentEliteFilters.length > 0;
        } catch (error) {
            logWarn('Unable to detect elite search state', error);
            return false;
        }
    };

    const evaluateCurrentPage = async () => {
        const currentUrl = getCurrentUrl();
        if (!isPackageToursPage(currentUrl)) return;
        if (state.lastHandledHref === currentUrl.href) return;

        state.lastHandledHref = currentUrl.href;

        const pendingRedirect = readPendingRedirect();
        const activeElite = readActiveEliteFilters();
        const elitePage = await isEliteSearchPage();

        if (elitePage) {
            storeActiveEliteFilters(state.currentEliteFilters);
            clearPendingRedirect();
            const quickSearchRoot = await waitForQuickSearch();
            bindQuickSearch(quickSearchRoot, state.currentEliteFilters);
            console.log('Elite search page detected and quick-search hooks attached');
            return;
        }

        const redirectFilters = pendingRedirect?.eliteFilters?.length
            ? pendingRedirect.eliteFilters
            : activeElite?.eliteFilters;

        if (redirectFilters?.length && currentUrl?.searchParams.get('qp')) {
            console.log('Elite filters available on non-elite search page, upgrading URL', {
                hasPendingRedirect: Boolean(pendingRedirect?.eliteFilters?.length),
                hasActiveEliteFilters: Boolean(activeElite?.eliteFilters?.length),
                currentUrl: currentUrl.toString(),
            });
            await upgradeCurrentPageToElite(redirectFilters);
        }
    };

    const scheduleLocationCheck = () => {
        window.clearTimeout(state.locationCheckTimer);
        state.locationCheckTimer = window.setTimeout(() => {
            evaluateCurrentPage();
        }, 50);
    };

    const bindLocationListeners = () => {
        if (window.__eliteSearchLocationBound) return;
        window.__eliteSearchLocationBound = true;

        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function pushStateProxy(...args) {
            const result = originalPushState.apply(this, args);
            scheduleLocationCheck();
            return result;
        };

        history.replaceState = function replaceStateProxy(...args) {
            const result = originalReplaceState.apply(this, args);
            scheduleLocationCheck();
            return result;
        };

        window.addEventListener('popstate', scheduleLocationCheck);
    };

    const init = async () => {
        if (state.isInitialized) return;
        state.isInitialized = true;

        bindLocationListeners();
        await evaluateCurrentPage();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, {once: true});
    } else {
        init();
    }
})();
