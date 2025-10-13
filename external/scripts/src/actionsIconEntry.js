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

    if (window.innerWidth <= 768) {
        const obs = new MutationObserver(mutations => {
            const actionIcon = document.querySelector('coral-popup-trigger');

            if (actionIcon) {
                obs.disconnect();

                const actionLink = document.createElement('a');

                actionLink.href = 'https://www.coral.ru/hot-offers/black-friday/';
                actionLink.innerHTML = `
                    <img src="https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/icon_m.svg" alt="">
            `;

                actionIcon.parentNode.replaceChild(actionLink, actionIcon);

                actionLink.addEventListener('click', (e) => {

                    const ymParams = {
                        name_stock: {
                            black_friday: {
                                name_point: "main_page_mobile",
                            },
                        }
                    }

                    ym(96674199, "reachGoal", "entry-point", ymParams);
                })
            }
        });

        obs.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});