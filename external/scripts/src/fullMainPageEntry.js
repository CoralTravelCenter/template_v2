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

    let mainMenuProcessed = false;
    let iconTriggerProcessed = false;

    function disconnectObserver() {
        if (mainMenuProcessed && iconTriggerProcessed) {
            obs.disconnect();
        }
    }

    const obs = new MutationObserver(() => {
        if (!mainMenuProcessed && window.innerWidth > 992) {
            const menuList = document.querySelector('.basic-menu');

            if (menuList) {
                if (menuList.querySelector('.black-friday__link')) {
                    mainMenuProcessed = true;
                } else {
                    const style = document.createElement('style');
                    style.textContent = `
                .black-friday__link {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 0 10px;
                }
                .black-friday__link span {
                    font-size: 14px;
                    color: black !important;
                }
            `;
                    document.head.appendChild(style);

                    const menuItems = menuList.children;
                    const lastMenuItem = menuItems[menuItems.length - 1];

                    const newLink = document.createElement('a');
                    newLink.className = 'black-friday__link';
                    newLink.href = 'https://www.coral.ru/hot-offers/black-friday/';
                    newLink.innerHTML = `
                        <img src="https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/icon_gif.svg" alt="">
                        <span>Черная пятница</span>
                    `;

                    menuList.insertBefore(newLink, lastMenuItem);

                    newLink.addEventListener('click', (e) => {
                        const ymParams = {
                            name_stock: {
                                black_friday: {
                                    name_point: "main_page_link",
                                },
                            },
                        };
                        ym(96674199, "reachGoal", "entry-point", ymParams);
                    });

                    mainMenuProcessed = true;
                }
            }
        }

        if (!iconTriggerProcessed && window.innerWidth <= 992) {
            const actionIcon = document.querySelector('coral-popup-trigger');
            if (actionIcon) {
                const actionLink = document.createElement('a');
                actionLink.href = 'https://www.coral.ru/hot-offers/black-friday/';
                actionLink.innerHTML = `
                <img src="https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/icon_g.svg" alt="">
            `;

                actionIcon.parentNode.replaceChild(actionLink, actionIcon);

                actionLink.addEventListener('click', (e) => {
                    const ymParams = {
                        name_stock: {
                            black_friday: {
                                name_point: "main_page_mobile"
                            }
                        }
                    };
                    ym(96674199, "reachGoal", "entry-point", ymParams);
                });

                iconTriggerProcessed = true;
            }
        }

        disconnectObserver();
    });

    obs.observe(document, {
        childList: true,
        subtree: true
    });

});