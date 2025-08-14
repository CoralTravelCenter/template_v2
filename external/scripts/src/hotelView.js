
(() => {
    const dl = window.dataLayer = window.dataLayer || [];
    if (!dl.__hooked_view_item) {
        const origPush = dl.push.bind(dl);
        dl.push = function (...args) {
            args.forEach(handleViewItem);
            return origPush(...args);
        };
        dl.__hooked_view_item = true;

        dl.forEach(handleViewItem);
    }

    function handleViewItem(evt) {
        if (!evt || evt.event !== 'view_item') return;

        const item = evt?.ecommerce?.items?.[0];
        if (!item) return;

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
                    productGroup: {
                        ids: {
                            hotels: item.item_list_id
                        }
                    },
                    customerAction: {
                        customFields: {
                            adultCount: item.item_adult_count,
                            childCount: item.item_child_count,
                            distanceToTheAirportInMeters: undefined,
                            distanceToTheBeachInMeters: undefined,
                            flightDateFrom: item.item_dates?.[0],
                            flightDateTo: item.item_dates?.[1],
                            hotelDateFrom: undefined,
                            hotelDateTo: undefined,
                            hotelId: item.item_id,
                            isRecommended: item.item_recommended_by_coral,
                            roomName: item.room_name,
                            roomSelected: undefined,
                            searchType: undefined,
                            beachTypes: undefined,
                            childrenServices: undefined,
                            departures: item.item_departure,
                            hotelCategoryNames: undefined,
                            hotelConcepts: undefined,
                            hotelFeatures: undefined,
                            mealTypes: undefined,
                            nights: item.item_nights,
                            roomFeatures: undefined,
                            roomTypes: undefined,
                            waterParkAndPoolServices: undefined
                        }
                    }
                }
            },
            onSuccess: function () {
                console.log("✅ ViewHotel успех. Отправили payload:", payload);
            },
            onError: function (error) {
                console.error("❌ ViewHotel ошибка:", error);
            }
        };

        if (typeof window.mindbox === 'function') {
            window.mindbox("async", payload, payload.onSuccess, payload.onError);
        } else {
            console.warn("⚠️ mindbox не найден. ViewHotel не отправлен:", payload);
        }
    }
})();
