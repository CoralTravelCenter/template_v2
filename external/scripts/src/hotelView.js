(() => {
    const dl = window.dataLayer = window.dataLayer || [];
    if (!dl.__hooked_view_item) {
        const origPush = dl.push.bind(dl);
        dl.push = function(...args) {
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

        let searchType;
        if (item.item_variant === "tour") {
            searchType = 1;
        } else if (item.item_variant === "onlyhotel") {
            searchType = 2;
        } else return;

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
                            searchType: searchType,
                            departures: item.item_departure,
                            nights: [item.item_nights]
                        }
                    }
                }
            },
            onSuccess: function() {
                console.log("✅ ViewHotel успех. Отправили payload:", payload);
            },
            onError: function(error) {
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