(function () {
    'use strict';

    const SEARCH_ENCRYPT_PATHS = [
        '/endpoints/PackageTourHotelProduct/PriceSearchEncrypt',
        '/endpoints/OnlyHotelProduct/PriceSearchEncrypt',
    ];
    const ELITE_FILTER_TYPES = new Set([3, 21]);
    const ELITE_FILTERS = [
        {type: 3, values: [{id: '1', value: '1'}], providers: []},
        {type: 21, values: [{id: '2', value: '2'}], providers: []},
    ];
    const ELITE_URL_PARAM = 'elite';

    function parseJson(value) {
        if (typeof value !== 'string' || !value.trim()) return null;

        try {
            return JSON.parse(value);
        } catch {
            return null;
        }
    }

    function isSearchEncryptUrl(url) {
        try {
            return SEARCH_ENCRYPT_PATHS.includes(new URL(url, location.origin).pathname);
        } catch {
            return typeof url === 'string' && SEARCH_ENCRYPT_PATHS.some((path) => url.includes(path));
        }
    }

    function isSearchPage(url = window.location.href) {
        try {
            const pathname = new URL(url, window.location.origin).pathname.toLowerCase();
            return pathname.startsWith('/packagetours/') || pathname.startsWith('/onlyhotel/');
        } catch {
            return false;
        }
    }

    function withEliteFilters(payload) {
        const parsedPayload = parseJson(payload);
        if (!parsedPayload) return payload;

        const existingFilters = Array.isArray(parsedPayload.additionalFilters) ? parsedPayload.additionalFilters : [];
        const nextFilters = existingFilters.filter((filter) => !ELITE_FILTER_TYPES.has(Number(filter?.type)));
        const nextPayload = {
            ...parsedPayload,
            additionalFilters: [...nextFilters, ...ELITE_FILTERS],
        };

        console.group('[elite-search-magic] encrypt');
        console.log('Перехваченный payload:', parsedPayload);
        console.log('Payload после подмены:', nextPayload);
        console.groupEnd();

        return JSON.stringify(nextPayload);
    }

    function subscribeToUrlChanges(callback) {
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function (...args) {
            originalPushState.apply(this, args);
            callback(window.location.href);
        };

        history.replaceState = function (...args) {
            originalReplaceState.apply(this, args);
            callback(window.location.href);
        };

        window.addEventListener('popstate', () => callback(window.location.href));
    }

    window.initEliteSearchInterceptor = function initEliteSearchInterceptor({state}) {
        const activateEliteChainFromUrl = () => {
            let url;

            try {
                url = new URL(window.location.href);
            } catch {
                return;
            }

            if (!isSearchPage(url.toString())) return;
            if (url.searchParams.get(ELITE_URL_PARAM) !== '1') return;

            state.activateEliteSearch();
            state.showShield();
            url.searchParams.delete(ELITE_URL_PARAM);
            history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
        };

        const clearEliteChainIfOutsideSearch = (url = window.location.href) => {
            if (!isSearchPage(url)) {
                state.clearEliteSearch();
            }
        };

        const syncEliteChainState = (url = window.location.href) => {
            if (isSearchPage(url)) {
                activateEliteChainFromUrl();
                return;
            }

            clearEliteChainIfOutsideSearch(url);
        };

        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function (method, url, ...args) {
            this.__eliteSearchMagic = {
                matched: typeof url === 'string' && isSearchEncryptUrl(url),
            };

            return originalOpen.call(this, method, url, ...args);
        };

        XMLHttpRequest.prototype.send = function (body) {
            const requestMeta = this.__eliteSearchMagic;
            const shouldRewrite = requestMeta?.matched && state.isEliteSearchActive() && isSearchPage();

            if (shouldRewrite && typeof body === 'string') {
                body = withEliteFilters(body);
            }

            return originalSend.call(this, body);
        };

        syncEliteChainState();
        subscribeToUrlChanges(syncEliteChainState);
    };
})();
