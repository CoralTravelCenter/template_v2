function removeSpecs(root = document) {
    root.querySelectorAll('.card__spec').forEach(spec => spec.remove());
}

async function hostReactAppReady(selector = '#__next > div', timeout = 500) {
    return new Promise(resolve => {
        const waiter = () => {
            const hostEl = document.querySelector(selector);
            if (hostEl?.getBoundingClientRect().height) {
                resolve(hostEl);
            } else {
                setTimeout(waiter, timeout);
            }
        };
        waiter();
    });
}

hostReactAppReady().then(() => {
    if (typeof ym === 'function') {
        ym(96674199, 'reachGoal', 'secret_hotel_group_A');
    }

    removeSpecs(hostEl);

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (!(node instanceof Element)) continue;

                if (node.matches('.card__spec')) {
                    node.remove();
                    continue;
                }

                removeSpecs(node);
            }
        }
    });

    observer.observe(hostEl, {
        childList: true,
        subtree: true,
    });
});