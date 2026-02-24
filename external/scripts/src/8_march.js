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
    const style = document.createElement('style');
    style.innerHTML = `
        .ant-tabs-nav-operations:has(#rc-tabs-2-more) {
            display: none;
        }
        
        .flowers {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px;
            border-radius: 80px;
            border: 1px solid rgba(255, 255, 255, 0.42);
            height: 50px;
            margin-left: auto;
        }
        
        .flowers p {
            font-size: 16px;
            line-height: 24px;
            color: white;
            margin: 0;
        }
        
        @media screen and (max-width: 992px) {
            .flowers {
                padding: 0;
            }
        }
    `;

    document.body.appendChild(style);

    const obs = new MutationObserver(() => {

        if (window.innerWidth > 992) {
            const nav = document.querySelector('.ant-tabs-nav-wrap');

            if (nav) {
                obs.disconnect();

                nav.insertAdjacentHTML('beforeend', `
                    <a href="https://www.sunmar.ru/info-actions/8-march/" target="_blank" class="flowers" onclick="ym(215233, 'reachGoal', 'entry_point', {name_stock: {WDay: {name_point: 'PC'}}});">
                        <img src="https://b2ccdn.sunmar.ru/content/landing-pages/8-march/8_march.png" alt="">
                        <p>Спецпредложение к 8 марта</p>
                    </a>
                `);
            }
        } else {
            const login = document.querySelector('[class*="LoginButton_loginButton"]');

            if (login) {
                obs.disconnect();

                login.insertAdjacentHTML('beforebegin', `
                    <a href="https://www.sunmar.ru/info-actions/8-march/" target="_blank" class="flowers" onclick="ym(215233, 'reachGoal', 'entry_point', {name_stock: {WDay: {name_point: 'mobile'}}});">
                        <img src="https://b2ccdn.sunmar.ru/content/landing-pages/8-march/8_march.png" alt="">
                    </a>
                `);
            }
        }
    });

    obs.observe(document.body, {
        childList: true,
        subtree: true,
    });
});