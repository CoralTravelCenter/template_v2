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
    ]
};

function handleEvent(eventData) {
    const eventName = eventData.event;
    const mapping = eventMapping[eventName];

    if (!mapping) {
        console.warn(`Нет обработчика для события: ${eventName}`);
        return;
    }

    const handlers = Array.isArray(mapping) ? mapping : [mapping];

    handlers.forEach(handler => {
        const { operation, buildRequest } = handler;

        const itemID = eventData.ecommerce?.items?.[0]?.item_id;
        const itemPrice = eventData.ecommerce?.items?.[0]?.price;
        const roomName = eventData.ecommerce?.items?.[0]?.room_name || "test";
        const itemCategory = eventData.ecommerce?.items?.[0]?.item_category;

        let args = [];

        if (operation === 'Website.ViewHotel') {
            args = [itemID, itemPrice, roomName];
        } else if (operation === 'Website.ViewCategory') {
            args = [itemCategory, roomName];
        } else if (operation === 'Website.SelectRoom') {
            args = [itemID, itemPrice, roomName];
        } else if (operation.startsWith('Website.AddToFavourites') ||
            operation.startsWith('Website.RemoveFromFavourites') ||
            operation.startsWith('Website.AddToComparison') ||
            operation.startsWith('Website.RemoveFromComparison')) {
            args = [itemID];
        }

        sendWithExponentialBackoff({
            operation,
            buildRequest: () => buildRequest(...args)
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
        return;
    }

    const { operation, buildRequest } = data;
    const delay = Math.pow(2, attempt) * 1000;

    setTimeout(() => {
        try {
            console.log(`Попытка ${attempt}: Отправляем в Mindbox — ${operation}`);

            window.mindbox("async", {
                operation,
                data: buildRequest()
            });

            console.log('Успешно отправлено:', operation);
        } catch (error) {
            console.error(error);

            sendWithExponentialBackoff(data, attempt + 1, maxAttempts);
        }
    }, delay);
}