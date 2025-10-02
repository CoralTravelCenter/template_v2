(() => {
    const H = {
        listeners: new Map(),
        processedBy: new WeakMap(),
        add(name, fn) {
            this.listeners.set(name, fn);
        },
        mark(evt, name) {
            let s = this.processedBy.get(evt);
            if (!s) {
                s = new Set();
                this.processedBy.set(evt, s);
            }
            return s.has(name) ? false : (s.add(name), true);
        }
    };

    function hook() {
        if (!Array.isArray(window.dataLayer)) window.dataLayer = [];
        const dl = window.dataLayer;

        if (dl.__dlHub && dl.__dlHub.version) return dl;

        const origPush = Array.prototype.push.bind(dl);

        function wrappedPush(...args) {
            for (const evt of args) {
                if (!evt || typeof evt !== 'object') continue;
                for (const [name, fn] of H.listeners) {
                    try {
                        if (H.mark(evt, name)) fn(evt);
                    } catch (e) {
                        console.error(`[DL-HUB] listener "${name}" error`, e);
                    }
                }
            }
            return origPush(...args);
        }

        Object.defineProperty(dl, 'push', {configurable: true, writable: true, value: wrappedPush});
        dl.__dlHub = {version: 1, at: Date.now()};

        try {
            dl.forEach(evt => {
                for (const [n, fn] of H.listeners) {
                    if (H.mark(evt, n)) fn(evt);
                }
            });
        } catch (e) {
            console.error('[DL-HUB] forEach error', e);
        }

        setInterval(() => {
            try {
                const cur = window.dataLayer;
                if (!cur || typeof cur.push !== 'function' || !cur.__dlHub) hook();
            } catch (_) {
            }
        }, 1000);

        return dl;
    }

    H.add('searchHandlers', function handleSearch(evt) {
        if (!evt || (evt.event !== 'search_tour' && evt.event !== 'search_onlyhotel')) return;
        const item = evt?.ecommerce?.items?.[0];
        if (!item || !Array.isArray(item.destination_id)) return;

        const isTourEvent = evt.event === 'search_tour';
        const searchType = isTourEvent ? 1 : 2;

        const countryIds = item.destination_id.filter(id => typeof id === 'string' && !id.endsWith('-7'));
        const hotelIdsRaw = item.destination_id.filter(id => typeof id === 'string' && id.endsWith('-7'));

        // Страны
        countryIds.forEach((destId, i) => {
            const customFields = {
                adultCount: item.item_adult_count,
                childCount: item.item_child_count,
                nights: item.nights,
                searchType,
                ...(isTourEvent
                    ? {
                        departures: item.departure,
                        flightDateFrom: item.period_flight?.[0],
                        flightDateTo: item.period_flight?.[1]
                    }
                    : {hotelDateFrom: item.period_hotel?.[0], hotelDateTo: item.period_hotel?.[1]})
            };

            const payload = {
                operation: "Website.ViewCategory",
                data: {viewProductCategory: {productCategory: {ids: {hotels: destId}}, customerAction: {customFields}}},
                onSuccess() {
                    console.log(`✅ ViewCategory (${i + 1}/${countryIds.length}) id=${destId}`);
                },
                onError(e) {
                    console.error(`❌ ViewCategory id=${destId}`, e);
                }
            };
            if (typeof window.mindbox === 'function') window.mindbox("async", payload, payload.onSuccess, payload.onError);
        });

        // Отели
        hotelIdsRaw.map(id => id.replace(/-7$/, ''))
            .forEach((hotelId, i) => {
                const customFields = {
                    adultCount: item.item_adult_count,
                    childCount: item.item_child_count,
                    nights: item.nights,
                    hotelId,
                    searchType,
                    ...(isTourEvent
                        ? {
                            departures: item.departure,
                            flightDateFrom: item.period_flight?.[0],
                            flightDateTo: item.period_flight?.[1]
                        }
                        : {hotelDateFrom: item.period_hotel?.[0], hotelDateTo: item.period_hotel?.[1]})
                };

                const payload = {
                    operation: "Website.SearchHotel",
                    data: {customerAction: {customFields}},
                    onSuccess() {
                        console.log(`✅ SearchHotel (${i + 1}/${hotelIdsRaw.length}) hotelId=${hotelId}`);
                    },
                    onError(e) {
                        console.error(`❌ SearchHotel hotelId=${hotelId}`, e);
                    }
                };
                if (typeof window.mindbox === 'function') window.mindbox("async", payload, payload.onSuccess, payload.onError);
            });
    });

    H.add('viewItemHandler', function handleViewItem(evt) {
        if (!evt || evt.event !== 'view_item') return;
        const item = evt?.ecommerce?.items?.[0];
        if (!item) return;

        let searchType = item.item_variant === "tour" ? 1 : item.item_variant === "onlyhotel" ? 2 : null;
        if (!searchType) return;

        const payload = {
            operation: "Website.ViewHotel",
            data: {
                viewProduct: {
                    price: item.price ?? evt?.ecommerce?.value,
                    product: {ids: {hotels: item.item_id}},
                    customerAction: {
                        customFields: {
                            adultCount: item.item_adult_count,
                            childCount: item.item_child_count,
                            flightDateFrom: searchType === 1 ? item.item_dates?.[0] : undefined,
                            flightDateTo: searchType === 1 ? item.item_dates?.[1] : undefined,
                            hotelDateFrom: searchType === 2 ? item.item_dates?.[0] : undefined,
                            hotelDateTo: searchType === 2 ? item.item_dates?.[1] : undefined,
                            roomSelected: false,
                            searchType,
                            departures: item.item_departure,
                            nights: [item.item_nights]
                        }
                    }
                }
            },
            onSuccess() {
                console.log("✅ ViewHotel успех");
            },
            onError(e) {
                console.error("❌ ViewHotel ошибка", e);
            }
        };
        if (typeof window.mindbox === 'function') window.mindbox("async", payload, payload.onSuccess, payload.onError);
    });

    H.add('mappingHandler', function handleMapping(evt) {
        if (!evt || typeof evt !== 'object' || !evt.event) return;

        const eventMapping = {
            add_to_wishlist: {
                operation: 'Website.AddToFavourites',
                buildRequest: (itemID) => ({
                    addProductToList: {product: {ids: {hotels: itemID}}}
                })
            },
            remove_from_wishlist: {
                operation: 'Website.RemoveFromFavourites',
                buildRequest: (itemID) => ({
                    removeProductFromList: {product: {ids: {hotels: itemID}}}
                })
            },
            add_to_compare: {
                operation: 'Website.AddToComparison',
                buildRequest: (itemID) => ({
                    addProductToList: {product: {ids: {hotels: itemID}}}
                })
            },
            remove_from_compare: {
                operation: 'Website.RemoveFromComparison',
                buildRequest: (itemID) => ({
                    removeProductFromList: {product: {ids: {hotels: itemID}}}
                })
            },
            view_item: {
                operation: 'Website.ViewHotel',
                buildRequest: (itemID, itemPrice/*, roomName*/) => ({
                    viewProduct: {
                        price: itemPrice,
                        product: {ids: {hotels: itemID}},
                        customerAction: {customFields: {roomSelected: false}}
                    }
                })
            },
            select_room: {
                operation: 'Website.ViewHotel',
                buildRequest: (itemID, itemPrice, roomName, itemNights) => ({
                    viewProduct: {
                        price: itemPrice,
                        product: {ids: {hotels: itemID}},
                        customerAction: {customFields: {roomName, roomSelected: true, nights: itemNights}}
                    }
                })
            }
        };

        const mapping = eventMapping[evt.event];
        if (!mapping) return;

        const handlers = Array.isArray(mapping) ? mapping : [mapping];
        handlers.forEach(({operation, buildRequest}) => {
            const item = evt.ecommerce?.items?.[0] || {};
            const args =

                (operation === 'Website.AddToFavourites' ||
                    operation === 'Website.RemoveFromFavourites' ||
                    operation === 'Website.AddToComparison' ||
                    operation === 'Website.RemoveFromComparison') ? [item.item_id] : [item.item_id, item.price, item.room_name];

            sendWithRetry({
                operation,
                buildRequest: () => buildRequest(...args),
                context: {evt, item}
            });
        });

        function sendWithRetry({operation, buildRequest, context}, attempt = 1, maxAttempts = 5) {
            const delay = Math.pow(2, attempt) * 1000;
            setTimeout(() => {
                try {
                    const data = buildRequest();
                    if (typeof window.mindbox === 'function') {
                        window.mindbox('async', {operation, data});
                    } else {
                        console.warn(`[Mindbox] функция не найдена — ${operation}`, data);
                    }
                    console.log(`✅ ${operation} отправлено (попытка ${attempt})`, context);
                } catch (e) {
                    console.warn(`❌ ${operation} ошибка (попытка ${attempt})`, e, context);
                    if (attempt < maxAttempts) sendWithRetry({
                        operation,
                        buildRequest,
                        context
                    }, attempt + 1, maxAttempts);
                }
            }, delay);
        }
    });

    hook();
})();