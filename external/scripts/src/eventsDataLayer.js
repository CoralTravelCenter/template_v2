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

        const isTourEvent = evt.event === 'search_tour';
        const searchType = isTourEvent ? 1 : 2;

        const countryIds = item.destination_id.filter(id => typeof id === 'string' && !id.endsWith('-7'));
        const hotelIdsRaw = item.destination_id.filter(id => typeof id === 'string' && id.endsWith('-7'));

        // --- Страны ---
        countryIds.forEach((destId, i) => {
            const customFields = {
                adultCount: item.item_adult_count,
                childCount: item.item_child_count,
                nights: item.nights,
                searchType
            };

            if (isTourEvent) {
                customFields.departures = item.departure;
                customFields.flightDateFrom = item.period_flight?.[0];
                customFields.flightDateTo = item.period_flight?.[1];
            } else {
                customFields.hotelDateFrom = item.period_hotel?.[0];
                customFields.hotelDateTo = item.period_hotel?.[1];
            }

            const payload = {
                operation: "Website.ViewCategory",
                data: {
                    viewProductCategory: {
                        productCategory: { ids: { hotels: destId } },
                        customerAction: { customFields }
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

        // --- Отели ---
        hotelIdsRaw
            .map(id => id.replace(/-7$/, ''))
            .forEach((hotelId, i) => {
                const customFields = {
                    adultCount: item.item_adult_count,
                    childCount: item.item_child_count,
                    nights: item.nights,
                    hotelId,
                    searchType
                };

                if (isTourEvent) {
                    customFields.departures = item.departure;
                    customFields.flightDateFrom = item.period_flight?.[0];
                    customFields.flightDateTo = item.period_flight?.[1];
                } else {
                    customFields.hotelDateFrom = item.period_hotel?.[0];
                    customFields.hotelDateTo = item.period_hotel?.[1];
                }

                const payload = {
                    operation: "Website.SearchHotel",
                    data: { customerAction: { customFields } },
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
