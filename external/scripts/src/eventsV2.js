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

    const LOG_PREFIX = '[eventsV2]';

    function cloneForLog(value) {
        try {
            return JSON.parse(JSON.stringify(value));
        } catch (_) {
            return value;
        }
    }

    function log(message, payload) {
        if (payload === undefined) {
            console.log(LOG_PREFIX, message);
            return;
        }
        console.log(LOG_PREFIX, message, cloneForLog(payload));
    }

    function sendMindbox(asyncMode, payload, onSuccess, onError, meta = {}) {
        log('Mindbox send attempt', {
            meta,
            payload
        });

        if (typeof window.mindbox !== 'function') {
            log('Mindbox is unavailable, send skipped', {
                meta,
                payload,
                mindboxType: typeof window.mindbox
            });
            return;
        }

        try {
            window.mindbox(asyncMode, payload, onSuccess, onError);
            log('Mindbox send dispatched', {
                meta,
                operation: payload?.operation
            });
        } catch (error) {
            console.error(LOG_PREFIX, 'Mindbox send failed', {
                meta,
                payload: cloneForLog(payload),
                error
            });
            throw error;
        }
    }

    function hook() {
        if (!Array.isArray(window.dataLayer)) window.dataLayer = [];
        const dl = window.dataLayer;

        if (dl.__dlHub && dl.__dlHub.version) return dl;

        const origPush = Array.prototype.push.bind(dl);

        function wrappedPush(...args) {
            for (const evt of args) {
                if (!evt || typeof evt !== 'object') continue;
                log('dataLayer.push received event', evt);
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

        Object.defineProperty(dl, 'push', {
            configurable: true,
            writable: true,
            value: wrappedPush
        });
        dl.__dlHub = {
            version: 1,
            at: Date.now()
        };

        log('dataLayer hook attached', {
            version: dl.__dlHub.version,
            queuedEvents: dl.length
        });

        try {
            dl.forEach(evt => {
                log('Processing pre-existing dataLayer event', evt);
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
        log('searchHandlers matched event', evt);
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
                ...(isTourEvent ?
                    {
                        departures: item.departure,
                        flightDateFrom: item.period_flight?.[0],
                        flightDateTo: item.period_flight?.[1]
                    } :
                    {
                        hotelDateFrom: item.period_hotel?.[0],
                        hotelDateTo: item.period_hotel?.[1]
                    })
            };

            const payload = {
                operation: "Website.ViewCategory",
                data: {
                    viewProductCategory: {
                        productCategory: {
                            ids: {
                                hotels: destId
                            }
                        },
                        customerAction: {
                            customFields
                        }
                    }
                },
            };
            sendMindbox("async", payload, payload.onSuccess, payload.onError, {
                handler: 'searchHandlers',
                event: evt.event,
                targetType: 'country',
                targetId: destId
            });
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
                    ...(isTourEvent ?
                        {
                            departures: item.departure,
                            flightDateFrom: item.period_flight?.[0],
                            flightDateTo: item.period_flight?.[1]
                        } :
                        {
                            hotelDateFrom: item.period_hotel?.[0],
                            hotelDateTo: item.period_hotel?.[1]
                        })
                };

                const payload = {
                    operation: "Website.SearchHotel",
                    data: {
                        customerAction: {
                            customFields
                        }
                    },
                };
                sendMindbox("async", payload, payload.onSuccess, payload.onError, {
                    handler: 'searchHandlers',
                    event: evt.event,
                    targetType: 'hotel',
                    targetId: hotelId
                });
            });
    });

    H.add('viewItemHandler', function handleViewItem(evt) {
        if (!evt || evt.event !== 'view_item') return;
        log('viewItemHandler matched event', evt);
        const item = evt?.ecommerce?.items?.[0];
        if (!item) return;

        let searchType = item.item_variant === "tour" ? 1 : item.item_variant === "onlyhotel" ? 2 : null;
        if (!searchType) return;

        const payload = {
            operation: "Website.ViewHotel",
            data: {
                viewProduct: {
                    price: item.price ?? evt?.ecommerce?.value,
                    product: {
                        ids: {
                            hotels: item.item_id
                        }
                    },
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
            }
        };
        sendMindbox("async", payload, payload.onSuccess, payload.onError, {
            handler: 'viewItemHandler',
            event: evt.event,
            itemId: item.item_id
        });
    });

    H.add('mappingHandler', function handleMapping(evt) {
        if (!evt || typeof evt !== 'object' || !evt.event) return;
        log('mappingHandler inspecting event', {
            event: evt.event,
            payload: evt
        });

        function compactObject(obj) {
            return Object.fromEntries(
                Object.entries(obj).filter(([, value]) => value !== undefined && value !== null)
            );
        }

        function getSearchType(item) {
            if (item.item_variant === 'tour') return 1;
            if (item.item_variant === 'onlyhotel') return 2;
            if (Array.isArray(item.item_departure) && item.item_departure.length) return 1;
            return null;
        }

        function buildListActionCustomFields(item) {
            const searchType = getSearchType(item);
            const dateFrom = item.item_dates?.[0];
            const dateTo = item.item_dates?.[1];

            return compactObject({
                adultCount: item.item_adult_count,
                childCount: item.item_child_count,
                flightDateFrom: dateFrom,
                flightDateTo: dateTo,
                hotelDateFrom: dateFrom,
                hotelDateTo: dateTo,
                nights: item.item_nights ?? item.nights,
                searchType,
                departures: item.item_departure
            });
        }

        const eventMapping = {
            add_to_wishlist: {
                operation: 'Website.AddToFavourites',
                buildRequest: (itemID, customFields) => ({
                    addProductToList: {
                        customFields,
                        product: {
                            ids: {
                                hotels: itemID
                            }
                        }
                    }
                })
            },
            remove_from_wishlist: {
                operation: 'Website.RemoveFromFavourites',
                buildRequest: (itemID) => ({
                    removeProductFromList: {
                        product: {
                            ids: {
                                hotels: itemID
                            }
                        }
                    }
                })
            },
            add_to_compare: {
                operation: 'Website.AddToComparison',
                buildRequest: (itemID) => ({
                    addProductToList: {
                        product: {
                            ids: {
                                hotels: itemID
                            }
                        }
                    }
                })
            },
            remove_from_compare: {
                operation: 'Website.RemoveFromComparison',
                buildRequest: (itemID) => ({
                    removeProductFromList: {
                        product: {
                            ids: {
                                hotels: itemID
                            }
                        }
                    }
                })
            },
            view_item: {
                operation: 'Website.ViewHotel',
                buildRequest: (itemID, itemPrice /*, roomName*/) => ({
                    viewProduct: {
                        price: itemPrice,
                        product: {
                            ids: {
                                hotels: itemID
                            }
                        },
                        customerAction: {
                            customFields: {
                                roomSelected: false
                            }
                        }
                    }
                })
            },
            select_room: {
                operation: 'Website.ViewHotel',
                buildRequest: (itemID, itemPrice, roomName, nights) => ({
                    viewProduct: {
                        price: itemPrice,
                        product: {
                            ids: {
                                hotels: itemID
                            }
                        },
                        customerAction: {
                            customFields: {
                                roomName,
                                roomSelected: true,
                                nights: [nights]
                            }
                        }
                    }
                })
            }
        };

        const mapping = eventMapping[evt.event];
        if (!mapping) return;

        log('mappingHandler matched event', {
            event: evt.event,
            mapping: Array.isArray(mapping) ? mapping.map(({operation}) => operation) : [mapping.operation]
        });

        const handlers = Array.isArray(mapping) ? mapping : [mapping];
        handlers.forEach(({
                              operation,
                              buildRequest
                          }) => {
            const item = evt.ecommerce?.items?.[0] || {};
            const listActionCustomFields = buildListActionCustomFields(item);
            const args =
                operation === 'Website.AddToFavourites'
                    ? [item.item_id, listActionCustomFields]
                    : (operation === 'Website.RemoveFromFavourites' ||
                        operation === 'Website.AddToComparison' ||
                        operation === 'Website.RemoveFromComparison')
                        ? [item.item_id]
                        : [item.item_id, item.price, item.room_name, item.item_nights];

            sendWithRetry({
                operation,
                buildRequest: () => buildRequest(...args),
                context: {
                    evt,
                    item
                }
            });
        });

        function sendWithRetry({
                                   operation,
                                   buildRequest,
                                   context
                               }, attempt = 1, maxAttempts = 5) {
            const delay = Math.pow(2, attempt) * 1000;
            log('Scheduling Mindbox retry/send', {
                operation,
                attempt,
                maxAttempts,
                delay,
                event: context?.evt?.event,
                itemId: context?.item?.item_id
            });
            setTimeout(() => {
                try {
                    const data = buildRequest();
                    sendMindbox('async', {
                        operation,
                        data
                    }, undefined, undefined, {
                        handler: 'mappingHandler',
                        attempt,
                        event: context?.evt?.event,
                        itemId: context?.item?.item_id
                    });
                } catch (e) {
                    console.error(LOG_PREFIX, 'sendWithRetry failed', {
                        operation,
                        attempt,
                        maxAttempts,
                        event: context?.evt?.event,
                        itemId: context?.item?.item_id,
                        error: e
                    });
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
