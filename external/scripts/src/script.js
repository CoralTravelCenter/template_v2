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
    view_item: {
        operation: 'Website.SelectRoom',
        buildRequest: (itemID, itemPrice) => ({
            viewProduct: {
                price: itemPrice,
                product: {
                    ids: {
                        hotels: itemID
                    }
                },
                customerAction: {
                    customFields: {
                        roomName: "test"
                    }
                }
            },
        })
    }
};

if (window.dataLayer) {
    console.log(1)
    const originalPush = window.dataLayer.push;

    window.dataLayer.push = function (...args) {
        console.log(2)
        originalPush.apply(this, args);

        if (args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
            const eventData = args[0];

            const mapping = eventMapping[eventData.event];

            if (mapping) {
                const itemID = eventData.ecommerce?.items?.[0]?.item_id;
                const itemPrice = eventData.ecommerce?.items?.[0]?.price;

                if (itemID) {
                    console.log(`Обнаружено событие: ${eventData.event}, item_id: ${itemID}`);

                    sendWithExponentialBackoff({
                        itemID,
                        itemPrice,
                        operation: mapping.operation,
                        buildRequest: mapping.buildRequest
                    });
                } else {
                    console.warn(`item_id не найден в событии: ${eventData.event}`);
                }
            }
        }
    };
} else {
    console.warn('dataLayer не определён');
}

function sendWithExponentialBackoff(data, attempt = 1, maxAttempts = 5) {
    if (attempt > maxAttempts) {
        console.error(`Превышено количество попыток для ${data.operation}`);
        return;
    }

    const { itemID, itemPrice, operation, buildRequest } = data;
    const delay = Math.pow(2, attempt) * 1000;

    setTimeout(() => {
        try {
            console.log(`Попытка ${attempt}: Отправляем в Mindbox — ${operation}`, itemID);

            window.mindbox("async", {
                operation,
                data: buildRequest(itemID, itemPrice)
            });

            console.log('Успешно отправлено:', itemID, 'операция:', operation);

        } catch (error) {
            console.error(`Ошибка при попытке ${attempt} для ${operation}:`, error);
            console.warn(`Повтор через ${delay / 1000} секунд...`);

            sendWithExponentialBackoff(data, attempt + 1, maxAttempts);
        }
    }, delay);
}