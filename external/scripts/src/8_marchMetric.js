async function hostReactAppReady(selector = '#__next > div', timeout = 500) {
    return new Promise(resolve => {
        const waiter = () => {
            const host_el = document.querySelector(selector);
            if (host_el?.getBoundingClientRect().height) {
                resolve();
            } else {
                setTimeout(waiter, timeout);
            }
        };
        waiter();
    });
}

hostReactAppReady().then(() => {
    const TARGET_IMAGE_URL = "https://b2ccdn.sunmar.ru/content/banner/desktop/bannerslide_18022026130509.jpg";

    const obs = new MutationObserver(mutations => {
        const bannerItems = document.querySelectorAll('[class*="BannerHotelListCard_wrapper"]');

        if (bannerItems.length > 0) {
            bannerItems.forEach(bannerItem => {
                const bgImage = bannerItem.style.backgroundImage;

                if (bgImage) {
                    const urlMatch = bgImage.match(/url\(["']?([^"')]+)["']?\)/);

                    if (urlMatch && urlMatch[1] === TARGET_IMAGE_URL) {
                        bannerItem.addEventListener('click', () => {
                            ym(215233, "reachGoal", "entry_point", {
                                name_stock: {
                                    EB_landing: {
                                        name_point: "search",
                                    },
                                },
                            });
                        });
                    }
                }
            });

            obs.disconnect();
        }
    });

    obs.observe(document.body, {
        childList: true,
        subtree: true,
    });
});