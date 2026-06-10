(() => {
    const styleId = 'onlyflight-banner-styles';
    const bannerClass = 'onlyflight-inline-banner';
    const listSelector = '[data-testid="virtuoso-item-list"]';
    const firstCardSelector = `${listSelector} > [data-index="0"], ${listSelector} > [data-item-index="0"]`;
    let syncScheduled = false;

    const ensureStyles = () => {
        if (document.getElementById(styleId)) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = styleId;
        styles.textContent = `
            .${bannerClass} {
                display: block;
                margin-top: 16px;
            }

            .${bannerClass} a {
                display: block;
                width: 100%;
                text-decoration: none;
            }

            .${bannerClass} img {
                display: block;
                width: 100%;
                height: auto;
                border-radius: 16px;
            }
        `;

        document.head.appendChild(styles);
    };

    const createBanner = () => {
        const wrapper = document.createElement('div');
        wrapper.className = bannerClass;
        wrapper.innerHTML = `
            <a href="https://www.coral.ru/hotel/?banner_on_site=page-hotel" onclick="ym(96674199,'reachGoal','onlyflight_banner');" target="_blank" rel="noopener noreferrer">
                <picture>
                    <source media="(max-width: 514px)" srcset="https://b2ccdn.coral.ru/content/onlyflight/of_mobil.webp">
                    <source media="(max-width: 767px)" srcset="https://b2ccdn.coral.ru/content/onlyflight/of_tablet.webp">
                    <source media="(max-width: 991px)" srcset="https://b2ccdn.coral.ru/content/onlyflight/of_large.webp">
                    <img src="https://b2ccdn.coral.ru/content/onlyflight/of_wide.webp" alt="">
                </picture>
            </a>
        `;
        return wrapper;
    };

    const cleanupDuplicates = currentHost => {
        document.querySelectorAll(`.${bannerClass}`).forEach(node => {
            if (node.parentElement !== currentHost) {
                node.remove();
            }
        });
    };

    const syncBanner = () => {
        syncScheduled = false;
        ensureStyles();

        const firstCard = document.querySelector(firstCardSelector);
        if (!firstCard) {
            cleanupDuplicates(null);
            return;
        }

        cleanupDuplicates(firstCard);

        if (!firstCard.querySelector(`:scope > .${bannerClass}`)) {
            firstCard.appendChild(createBanner());
        }
    };

    const scheduleSync = () => {
        if (syncScheduled) {
            return;
        }

        syncScheduled = true;
        requestAnimationFrame(syncBanner);
    };

    const observer = new MutationObserver(scheduleSync);

    observer.observe(document, {
        childList: true,
        subtree: true
    });

    window.addEventListener('load', scheduleSync, {once: true});
    window.addEventListener('scroll', scheduleSync, {passive: true});
    window.addEventListener('resize', scheduleSync, {passive: true});

    scheduleSync();
})();
