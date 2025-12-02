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
    const obs = new MutationObserver(mutations => {
        const targetHeader = document.querySelector('.ant-collapse-header');

        if (targetHeader) {
            obs.disconnect();

            ym(215233, 'reachGoal', 'dop_uslugi_close');

            const button = document.querySelector('.ant-collapse-expand-icon');

            if (button) {
                setTimeout(() => {
                    button.click();
                }, 700);

                button.addEventListener('click', () => {
                    ym(215233, 'reachGoal', 'dop_uslugi_open');
                });
            }
        }
    });

    obs.observe(document.body, {
        childList: true,
        subtree: true,
    });
});