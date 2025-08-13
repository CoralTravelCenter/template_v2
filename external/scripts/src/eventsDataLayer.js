(() => {
    const dl = window.dataLayer = window.dataLayer || [];
    if (!dl.__hooked) {
        const origPush = dl.push.bind(dl);
        dl.push = function (...args) {
            args.forEach(handle);
            return origPush(...args);
        };
        dl.__hooked = true;
        dl.forEach(handle);
    }

    function handle(evt) {
        if (!evt || (evt.event !== 'search_tour' && evt.event !== 'search_onlyhotel')) return;

        const item = evt?.ecommerce?.items?.[0];
        if (!item || !Array.isArray(item.destination_id)) return;

        const countryIds = item.destination_id.filter(id => typeof id === 'string' && id.endsWith('-0'));
        const hotelIdsRaw = item.destination_id.filter(id => typeof id === 'string' && id.endsWith('-7'));

        countryIds.forEach((destId, i) => {
            const payload = {
                operation: "Website.ViewCategory",
                data: {
                    viewProductCategory: {
                        productCategory: { ids: { hotels: destId } },
                        customerAction: {
                            customFields: {
                                adultCount: item.item_adult_count,
                                childCount: item.item_child_count,
                                departures: item.departure,
                                nights: item.nights,
                                flightDateFrom: item.period_flight?.[0],
                                flightDateTo: item.period_flight?.[1],
                                searchType: 1
                            }
                        }
                    }
                },
                onSuccess: function () {
                    console.log(`✅ ViewCategory успех (${i + 1}/${countryIds.length}) id=${destId}`, payload);
                },
                onError: function (error) {
                    console.error(`❌ ViewCategory ошибка id=${destId}`, error);
                }
            };

            if (typeof window.mindbox === 'function') {
                window.mindbox("async", payload, payload.onSuccess, payload.onError);
            } else {
                console.warn(`⚠️ mindbox не найден. ViewCategory не отправлен id=${destId}`, payload);
            }
        });

        hotelIdsRaw
            .map(id => id.replace(/-7$/, ''))
            .forEach((hotelId, i) => {
                const payload = {
                    operation: "Website.SearchHotel",
                    data: {
                        customerAction: {
                            customFields: {
                                adultCount: item.item_adult_count,
                                childCount: item.item_child_count,
                                distanceToTheAirportInMeters: undefined,
                                distanceToTheBeachInMeters: undefined,
                                flightDateFrom: item.period_flight?.[0],
                                flightDateTo: item.period_flight?.[1],
                                hotelDateFrom: item.period_hotel?.[0],
                                hotelDateTo: item.period_hotel?.[1],
                                hotelId,
                                isRecommended: undefined,
                                roomName: undefined,
                                roomSelected: undefined,
                                searchType: 1,
                                beachTypes: undefined,
                                childrenServices: undefined,
                                departures: item.departure,
                                hotelCategoryNames: undefined,
                                hotelConcepts: undefined,
                                hotelFeatures: undefined,
                                mealTypes: undefined,
                                nights: item.nights,
                                roomFeatures: undefined,
                                roomTypes: undefined,
                                waterParkAndPoolServices: undefined
                            }
                        }
                    },
                    onSuccess: function () {
                        console.log(`✅ SearchHotel успех (${i + 1}/${hotelIdsRaw.length}) hotelId=${hotelId}`, payload);
                    },
                    onError: function (error) {
                        console.error(`❌ SearchHotel ошибка hotelId=${hotelId}`, error);
                    }
                };

                if (typeof window.mindbox === 'function') {
                    window.mindbox("async", payload, payload.onSuccess, payload.onError);
                } else {
                    console.warn(`⚠️ mindbox не найден. SearchHotel не отправлен hotelId=${hotelId}`, payload);
                }
            });
    }
})();
