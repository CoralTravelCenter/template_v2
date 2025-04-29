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
    const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="16" viewBox="0 0 26 16" fill="none">
            <path d="M0.577148 13V3C0.577148 1.34315 1.9203 0 3.57715 0H19.7715C20.9145 0 21.9581 0.649453 22.463 1.67486L24.9247 6.67486C25.3361 7.5104 25.3361 8.4896 24.9247 9.32514L22.463 14.3251C21.9581 15.3505 20.9145 16 19.7715 16H3.57715C1.92029 16 0.577148 14.6569 0.577148 13Z" fill="#E84F0E"/>
            <path d="M8.35935 12.8L7.46249 11.8667L15.7969 3.2L16.6938 4.14L8.35935 12.8ZM14.7719 13C14.3491 13 13.9626 12.8933 13.6124 12.68C13.2665 12.4622 12.9889 12.1733 12.7796 11.8133C12.5703 11.4489 12.4657 11.0444 12.4657 10.6C12.4657 10.1644 12.5725 9.76444 12.786 9.4C12.9995 9.03556 13.2814 8.74444 13.6316 8.52667C13.9818 8.30889 14.3619 8.2 14.7719 8.2C15.1947 8.2 15.5812 8.30889 15.9314 8.52667C16.2816 8.74 16.5592 9.02889 16.7642 9.39333C16.9735 9.75333 17.0781 10.1556 17.0781 10.6C17.0781 11.0444 16.9735 11.4489 16.7642 11.8133C16.5592 12.1733 16.2816 12.4622 15.9314 12.68C15.5812 12.8933 15.1947 13 14.7719 13ZM14.7719 11.7933C14.9812 11.7933 15.1712 11.74 15.3421 11.6333C15.5172 11.5222 15.656 11.3756 15.7585 11.1933C15.8652 11.0111 15.9186 10.8133 15.9186 10.6C15.9186 10.3867 15.8652 10.1889 15.7585 10.0067C15.656 9.82444 15.5172 9.68 15.3421 9.57333C15.1712 9.46222 14.9812 9.40667 14.7719 9.40667C14.5669 9.40667 14.3769 9.46222 14.2018 9.57333C14.0309 9.68 13.8921 9.82444 13.7854 10.0067C13.6829 10.1889 13.6316 10.3867 13.6316 10.6C13.6316 10.8133 13.6829 11.0111 13.7854 11.1933C13.8921 11.3756 14.0309 11.5222 14.2018 11.6333C14.3769 11.74 14.5669 11.7933 14.7719 11.7933ZM9.38434 7.8C8.96153 7.8 8.57503 7.69333 8.22483 7.48C7.87462 7.26222 7.59489 6.97333 7.38562 6.61333C7.18062 6.24889 7.07812 5.84444 7.07812 5.4C7.07812 4.96444 7.18489 4.56444 7.39843 4.2C7.61197 3.83556 7.89384 3.54444 8.24404 3.32667C8.59425 3.10889 8.97435 3 9.38434 3C9.80714 3 10.1915 3.10889 10.5374 3.32667C10.8876 3.54 11.1674 3.82889 11.3767 4.19333C11.5859 4.55333 11.6906 4.95556 11.6906 5.4C11.6906 5.84444 11.5859 6.24889 11.3767 6.61333C11.1674 6.97333 10.8876 7.26222 10.5374 7.48C10.1915 7.69333 9.80714 7.8 9.38434 7.8ZM9.38434 6.59333C9.58934 6.59333 9.77938 6.54 9.95449 6.43333C10.1296 6.32222 10.2684 6.17556 10.3709 5.99333C10.4777 5.81111 10.531 5.61333 10.531 5.4C10.531 5.18667 10.4777 4.98889 10.3709 4.80667C10.2684 4.62444 10.1296 4.48 9.95449 4.37333C9.77938 4.26222 9.58934 4.20667 9.38434 4.20667C9.17934 4.20667 8.98929 4.26222 8.81419 4.37333C8.64336 4.48 8.50456 4.62444 8.39779 4.80667C8.29102 4.98889 8.23764 5.18667 8.23764 5.4C8.23764 5.61333 8.29102 5.81111 8.39779 5.99333C8.50456 6.17556 8.64336 6.32222 8.81419 6.43333C8.98502 6.54 9.17507 6.59333 9.38434 6.59333Z" fill="white"/>
        </svg>
    `;

    function handleDesktop() {
        const actionPoint = document.querySelector('[aria-label="/poleznaya-informatsiya/offers/hot-offers"].basic-menu-item');
        if (!actionPoint) return;

        Object.assign(actionPoint.style, {
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
        });

        actionPoint.insertAdjacentHTML('afterbegin', svgIcon);
    }

    function handleMobile() {
        const observer = new MutationObserver((mutations) => {
            const burgerContainer = document.querySelector('.mobile-hambuerger-menu-conainer');
            const burgerLink = burgerContainer?.querySelector('[aria-label="/poleznaya-informatsiya/offers/hot-offers"]');

            if (burgerLink && !burgerLink.querySelector('svg')) {
                burgerLink.insertAdjacentHTML('beforeend', svgIcon);
                svgIcon.style.transform = 'rotate(180deg)';
            }
        });

        const headerMobile = document.querySelector('.header-mobile');
        if (headerMobile) {
            observer.observe(headerMobile, { childList: true, subtree: true });
        }
    }

    window.innerWidth < 992 ? handleMobile() : handleDesktop();
});
