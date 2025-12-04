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
    if (window.dataLayer && !window.dataLayer.__isProxied) {
        const originalPush = window.dataLayer.push;

        window.dataLayer.push = function (...args) {
            const result = originalPush.apply(this, args);

            args.forEach(arg => {
                if (
                    typeof arg === 'object' &&
                    arg.event === 'view_item_list' &&
                    Array.isArray(arg.ecommerce?.items)
                ) {
                    const hasThailand = arg.ecommerce.items.some(item => item.item_brand === "Таиланд");

                    if (hasThailand) {
                        startBannerObserver();
                    }
                }
            });

            return result;
        };

        window.dataLayer.__isProxied = true;
    }

    function startBannerObserver() {
        const obs = new MutationObserver(() => {
            const targetBlock = document.querySelector('.quicksearch-change-wrapper');
            const searchBlock = document.querySelector('[class*="ConditionalRenderer_conditionalRenderer"]');

            if (targetBlock) {
                clearTimeout(timeoutId);
                obs.disconnect();

                targetBlock.insertAdjacentHTML('beforebegin', `
                    <a href="https://www.coral.ru/main/thailand/" style="display: flex; margin: 0 auto;" id="tai-not-found">
                        <picture>
                            <source media="(max-width: 768px)" srcset="https://b2ccdn.coral.ru/content/thailand/tai_banner_m.webp">
                            <img src="https://b2ccdn.coral.ru/content/thailand/tai_banner.webp" alt="">
                        </picture>
                    </a>
                `);

                const banner = document.getElementById('tai-not-found');

                if (banner) {
                    banner.addEventListener('click', (event) => {
                        ym(96674199, "reachGoal", "segmentation_entry_point", {
                            page_path: {
                                "/main/thailand/": {
                                    name_point: "search_not_found",
                                },
                            },
                        });
                    });
                }
            }

            if (searchBlock) {
                clearTimeout(timeoutId);
                obs.disconnect();

                searchBlock.insertAdjacentHTML('beforeend', `
                    <a href="https://www.coral.ru/main/thailand/" style="display: flex; margin: 0 auto 10px; width: fit-content;" id="tai-search">
                        <picture>
                            <source media="(max-width: 768px)" srcset="https://b2ccdn.coral.ru/content/thailand/tai_banner-2_m.webp">
                            <img src="https://b2ccdn.coral.ru/content/thailand/tai_banner-2.webp" alt="">
                        </picture>
                    </a>
                `);

                const banner = document.getElementById('tai-search');

                if (banner) {
                    banner.addEventListener('click', (event) => {
                        ym(96674199, "reachGoal", "segmentation_entry_point", {
                            page_path: {
                                "/main/thailand/": {
                                    name_point: "search_banner",
                                },
                            },
                        });
                    });
                }
            }
        });

        const timeoutId = setTimeout(() => {
            obs.disconnect();
        }, 5000);

        obs.observe(document, {
            childList: true,
            subtree: true
        });
    }
});