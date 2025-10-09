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

    setTimeout(() => {

    }, 2000);

    const obs = new MutationObserver(mutations => {
        const menuList = document.querySelector('.basic-menu');

        if (menuList) {
            obs.disconnect();

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
                    color: black!important;
                }
            `;
            document.head.appendChild(style);

            const menuItems = menuList.children;
            const lastMenuItem = menuItems[menuItems.length - 1];

            const newLink = document.createElement('a');
            newLink.className = 'black-friday__link';
            newLink.href = '/';
            newLink.innerHTML = `
                <img src="https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/icon.svg" alt="">
                <span>Черная пятница</span>
            `;

            menuList.insertBefore(newLink, lastMenuItem);

            newLink.addEventListener('click', () => {
                const yaParams = {
                    name_stock: {
                        black_friday: {
                            name_point: "main_page_link",
                        },
                    },
                }

                ym(96674199, "reachGoal", "entry-point", yaParams);
            });
        }
    });

    obs.observe(document, {
        childList: true,
        subtree: true
    });
});