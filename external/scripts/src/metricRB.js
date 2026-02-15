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
    // const link = document.querySelector('[href="/rb-summer/"]');
    //
    // if (link) {
    //     link.addEventListener('click', () => {
    //         ym(215233, "reachGoal", "entry_point", {
    //             name_stock: {
    //                 EB_landing: {
    //                     name_point: "link_gnb"
    //                 }
    //             }
    //         });
    //     });
    // }
    //
    // setTimeout(() => {
    //     const obs = new MutationObserver(() => {
    //         const banner = document.querySelector('[href="https://www.sunmar.ru/rb-summer/?banner_on_site=main-rb-summer26"]');
    //
    //         if (banner) {
    //             obs.disconnect();
    //
    //             banner.addEventListener('click', () => {
    //                 ym(215233, "reachGoal", "entry_point", {
    //                     name_stock: {
    //                         EB_landing: {
    //                             name_point: "main_carousel"
    //                         }
    //                     }
    //                 });
    //             });
    //         }
    //     });
    //
    //     obs.observe(document.body, {
    //         childList: true,
    //         subtree: true,
    //     });
    // }, 1000);

    const obs = new MutationObserver(mutations => {
        const bannerItem = document.querySelector('[class*="BannerHotelListCard_wrapper"]');

        if (bannerItem) {
            obs.disconnect();

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
    });

    obs.observe(document.body, {
        childList: true,
        subtree: true,
    });
});