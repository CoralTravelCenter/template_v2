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
    const modal = document.getElementById('modal_action');

    if (modal) {
        modal.classList.add('is-active');

        const close = document.getElementById('close-button');

        close.addEventListener('click', () => {
            modal.classList.remove('is-active');
        });
    }
});