async function hostReactAppReady(
    selector = "#__next > div",
    timeout = 500,
) {
    return new Promise((resolve) => {
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
    let debounceTimer = null;
    const DEBOUNCE_DELAY = 300;

    const obs = new MutationObserver(() => {
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            const airLink = document.querySelector('[data-node-key="3"]');

            if (airLink) {
                obs.disconnect();
                clearTimeout(debounceTimer);

                airLink.addEventListener('click', event => {
                    ym(96674199, 'reachGoal', 'search_air_tickets');
                });
            }
        }, DEBOUNCE_DELAY);
    });

    obs.observe(document.body, {
        childList: true,
        subtree: true
    });
});