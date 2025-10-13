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
    const obs = new MutationObserver(() => {

        const url = 'https://www.coral.ru/hot-offers/black-friday/?banner_on_site=search-black-friday25';
        const banner = document.querySelector(`a[href="${CSS.escape(url)}"]`);

        if (banner) {
            obs.disconnect()

            banner.addEventListener('click', (e) => {

                const ymParams = {
                    name_stock: {
                        black_friday: {
                            name_point: "search",
                        },
                    },
                }

                ym(96674199, "reachGoal", "entry-point", ymParams);
            });
        }
    });

    obs.observe(document, {
        childList: true,
        subtree: true,
    });
});