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
    const links = document.querySelectorAll('.js-banner-link');
    const banner = document.querySelector('.js-banner');

    links.forEach((link) => {
        link.addEventListener('mouseover', (event) => {
           if (link.dataset.bg === 'tr') {
               banner.style.backgroundImage = 'url(site/sunmar.ru/assets/banner_turkey.webp)';
           } else if (link.dataset.bg === 'uae') {
               banner.style.backgroundImage = 'url(site/sunmar.ru/assets/banner_uae.webp)';
           } else if (link.dataset.bg === 'eg') {
               banner.style.backgroundImage = 'url(site/sunmar.ru/assets/banner_egypt.webp)';
           } else if (link.dataset.bg === 'th') {
               banner.style.backgroundImage = 'url(site/sunmar.ru/assets/banner_thailand.webp)';
           } else {
               banner.style.backgroundImage = 'url(site/sunmar.ru/assets/banner_russia.webp)';
           }
        });
    });
});