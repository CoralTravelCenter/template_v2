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
            if (window.innerWidth > 768) {
                if (link.dataset.bg === 'tr') {
                    banner.style.backgroundImage = 'url(https://b2ccdn.sunmar.ru/content/landing-pages/russia/spb/banner_turkey.webp)';
                } else if (link.dataset.bg === 'uae') {
                    banner.style.backgroundImage = 'url(https://b2ccdn.sunmar.ru/content/landing-pages/russia/spb/banner_uae.webp)';
                } else if (link.dataset.bg === 'eg') {
                    banner.style.backgroundImage = 'url(https://b2ccdn.sunmar.ru/content/landing-pages/russia/spb/banner_egypt.webp)';
                } else if (link.dataset.bg === 'th') {
                    banner.style.backgroundImage = 'url(https://b2ccdn.sunmar.ru/content/landing-pages/russia/spb/banner_thailand.webp)';
                } else {
                    banner.style.backgroundImage = 'url(https://b2ccdn.sunmar.ru/content/landing-pages/russia/spb/banner_russia.webp)';
                }
            } else {
                if (link.dataset.bg === 'tr') {
                    banner.style.backgroundImage = 'url(https://b2ccdn.sunmar.ru/content/landing-pages/russia/spb/banner_turkey_m.webp)';
                } else if (link.dataset.bg === 'uae') {
                    banner.style.backgroundImage = 'url(https://b2ccdn.sunmar.ru/content/landing-pages/russia/spb/banner_uae_m.webp)';
                } else if (link.dataset.bg === 'eg') {
                    banner.style.backgroundImage = 'url(https://b2ccdn.sunmar.ru/content/landing-pages/russia/spb/banner_egypt_m.webp)';
                } else if (link.dataset.bg === 'th') {
                    banner.style.backgroundImage = 'url(https://b2ccdn.sunmar.ru/content/landing-pages/russia/spb/banner_thailand_m.webp)';
                } else {
                    banner.style.backgroundImage = 'url(https://b2ccdn.sunmar.ru/content/landing-pages/russia/spb/banner_russia_m.webp)';
                }
            }
        });
    });


    const togglers = document.querySelectorAll(".js-toggler");

    togglers.forEach(toggler => {
        const header = toggler.querySelector(".js-toggler-header");
        const body = toggler.querySelector(".js-toggler-body");

        header.addEventListener("click", () => {
            const isOpen = toggler.classList.contains("active");

            if (isOpen) {
                closeAccordion(toggler, body);
            } else {
                openAccordion(toggler, body);
            }
        });
    });

    function openAccordion(container, body) {
        container.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
    }

    function closeAccordion(container, body) {
        container.classList.remove("active");
        body.style.maxHeight = 0;
    }
});