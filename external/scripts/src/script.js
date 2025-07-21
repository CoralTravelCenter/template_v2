const eventMapping = {
    add_to_wishlist: {
        operation: 'Website.AddToFavourites',
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
    view_room: {
        operation: 'Website.SelectRoom',
        buildRequest: (itemID, itemPrice, roomName) => ({
            viewProduct: {
                price: itemPrice,
                product: {
                    ids: {
                        hotels: itemID
                    }
                },
                customerAction: {
                    customFields: {
                        roomName: roomName
                    }
                }
            }
        })
    },
    view_item: [
        {
            operation: 'Website.ViewHotel',
            buildRequest: (itemID, itemPrice, roomName) => ({
                viewProduct: {
                    price: itemPrice,
                    product: {
                        ids: {
                            hotels: itemID
                        }
                    },
                    customerAction: {
                        customFields: {
                            roomName: roomName
                        }
                    }
                }
            })
        },
        {
            operation: 'Website.ViewCategory',
            buildRequest: (itemCategory, roomName) => ({
                viewProductCategory: {
                    productCategory: {
                        ids: {
                            hotels: itemCategory
                        }
                    },
                    customerAction: {
                        customFields: {
                            roomName: roomName
                        }
                    }
                }
            })
        }
    ],
    search_tour: {
        operation: 'Website.SearchTour',
        buildRequest: (departure, destination, destinationId, adultCount, childCount, nights, flightDates) => ({
            customerAction: {
                customFields: {
                    departure: departure.join(', '),
                    destination: destination.join(', '),
                    destinationId: destinationId.join(', '),
                    adultCount,
                    childCount,
                    nights,
                    flightDateFrom: flightDates[0],
                    flightDateTo: flightDates[1]
                }
            }
        })
    },
};

function handleEvent(eventData) {
    const eventName = eventData.event;
    const mapping = eventMapping[eventName];

    if (!mapping) {
        console.warn(`Нет обработчика для события: ${eventName}`);
        return;
    }

    // Приводим к массиву, чтобы унифицировать обработку
    const handlers = Array.isArray(mapping) ? mapping : [mapping];

    handlers.forEach(handler => {
        const { operation, buildRequest } = handler;

        // Извлекаем данные из события
        const itemID = eventData.ecommerce?.items?.[0]?.item_id;
        const itemPrice = eventData.ecommerce?.items?.[0]?.price;
        const roomName = eventData.ecommerce?.items?.[0]?.room_name || "";
        const itemCategory = eventData.ecommerce?.items?.[0]?.item_category;

        // Данные для search_tour
        const departure = eventData.ecommerce?.items?.[0]?.departure || [];
        const destination = eventData.ecommerce?.items?.[0]?.destination || [];
        const destinationId = eventData.ecommerce?.items?.[0]?.destination_id || [];
        const adultCount = eventData.ecommerce?.items?.[0]?.item_adult_count;
        const childCount = eventData.ecommerce?.items?.[0]?.item_child_count;
        const nights = eventData.ecommerce?.items?.[0]?.nights || [];
        const flightDates = eventData.ecommerce?.items?.[0]?.period_flight || [];

        let args = [];

        // Определяем, какие аргументы передавать в buildRequest
        if (operation === 'Website.ViewHotel') {
            args = [itemID, itemPrice, roomName];
        } else if (operation === 'Website.ViewCategory') {
            args = [itemCategory, roomName];
        } else if (operation === 'Website.SelectRoom') {
            args = [itemID, itemPrice, roomName];
        } else if (operation === 'Website.SearchTour') {
            args = [
                departure,
                destination,
                destinationId,
                adultCount,
                childCount,
                nights,
                flightDates
            ];
        } else if (operation.startsWith('Website.AddToFavourites') ||
            operation.startsWith('Website.RemoveFromFavourites') ||
            operation.startsWith('Website.AddToComparison') ||
            operation.startsWith('Website.RemoveFromComparison')) {
            args = [itemID];
        }

        // Передаём все данные в sendWithExponentialBackoff
        sendWithExponentialBackoff({
            operation,
            buildRequest: () => buildRequest(...args),
            itemID,
            itemPrice,
            roomName,
            itemCategory,
            departure,
            destination,
            destinationId,
            adultCount,
            childCount,
            nights,
            flightDates
        });
    });
}

if (window.dataLayer) {
    const originalPush = window.dataLayer.push;

    window.dataLayer.push = function (...args) {
        originalPush.apply(this, args);

        if (args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
            handleEvent(args[0]);
        }
    };
}

function sendWithExponentialBackoff(data, attempt = 1, maxAttempts = 5) {
    if (attempt > maxAttempts) {
        console.error(`Превышено количество попыток для ${data.operation}`);
        return;
    }

    const {
        operation,
        buildRequest,
        itemID,
        itemPrice,
        roomName,
        itemCategory,
        departure,
        destination,
        destinationId,
        adultCount,
        childCount,
        nights,
        flightDates
    } = data;

    const delay = Math.pow(2, attempt) * 1000;

    setTimeout(() => {
        try {
            const requestData = buildRequest();

            console.groupCollapsed(`Попытка ${attempt}: Отправляем в Mindbox — ${operation}`);
            console.log('itemID:', itemID);
            console.log('itemPrice:', itemPrice);
            console.log('roomName:', roomName);
            console.log('itemCategory:', itemCategory);
            console.log('departure:', departure);
            console.log('destination:', destination);
            console.log('destinationId:', destinationId);
            console.log('adultCount:', adultCount);
            console.log('childCount:', childCount);
            console.log('nights:', nights);
            console.log('flightDateFrom:', flightDates[0]);
            console.log('flightDateTo:', flightDates[1]);
            console.log('Тело запроса:', requestData);
            console.groupEnd();

            window.mindbox("async", {
                operation,
                data: requestData
            });

            console.log('✅ Успешно отправлено:', operation);

        } catch (error) {
            console.groupCollapsed(`❌ Ошибка при попытке ${attempt} для ${operation}:`, error);
            console.log('Последние данные:', {
                itemID,
                itemPrice,
                roomName,
                itemCategory,
                departure,
                destination,
                destinationId,
                adultCount,
                childCount,
                nights,
                flightDates
            });
            console.warn(`Повтор через ${delay / 1000} секунд...`);
            console.groupEnd();

            sendWithExponentialBackoff(data, attempt + 1, maxAttempts);
        }
    }, delay);
}
