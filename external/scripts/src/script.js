function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`)
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (window.dataLayer && window.mindbox) {
    const originalPush = window.dataLayer.push;

    window.dataLayer.push = function (...args) {
        originalPush.apply(this, args);

        if (args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
            const eventData = args[0];

            if (eventData.event === 'add_to_wishlist') {
                const itemID = eventData.ecommerce?.items?.[0]?.item_id;
                const listID = eventData.ecommerce?.items?.[0]?.item_list_id;
                const deviceUUID = getCookie('mindboxDeviceUUID');

                if (itemID) {
                    console.log(itemID);
                    console.log(listID);
                    console.log(deviceUUID);

                    mindbox("async", {
                        operation: "Website.AddToFavourites",
                        data: {
                            addProductToList: {
                                product: {
                                    ids: {
                                        hotels: itemID
                                    }
                                },
                            }
                        }
                    });

                } else {
                    console.warn('err');
                }
            }
        }
    };
} else {
    console.warn('err');
}