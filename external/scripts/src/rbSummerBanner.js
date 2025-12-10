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
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function changeBannerImage() {
        const banner = document.querySelector('.kv-main-banner');

        if (!banner) return;

        const picture = banner.querySelector('picture');
        if (!picture) return;

        const source = picture.querySelector('source');
        const img = picture.querySelector('img');

        if (!source || !img) return;

        const newDesktopImage = 'https://b2ccdn.sunmar.ru/content/img/actions/Inner_page_Sunmar_desktop_L_1352x500_ny_early.webp';
        const newMobileImage = 'https://b2ccdn.sunmar.ru/content/img/actions/Inner_page_Sunmar_mobile_428x556_ny_early.webp';

        img.setAttribute('src', newDesktopImage);
        source.setAttribute('srcset', newMobileImage);
    }

    function checkAndChangeBanner() {
        const utmSource = getUrlParameter('utm_source');
        const utmMedium = getUrlParameter('utm_medium');
        const utmCampaign = getUrlParameter('utm_campaign');

        const hasNewBannerCookie = getCookie('sunmar_banner_version') === 'new';

        if (hasNewBannerCookie) {
            changeBannerImage();
            return;
        }

        const isOldCampaign = utmSource === 'yandex' &&
            utmMedium === 'cpm' &&
            utmCampaign === 'CTM_SUNMAR_MEDIA_EB_CREO-OLD';

        const isNewCampaign = utmSource === 'yandex' &&
            utmMedium === 'cpm' &&
            utmCampaign === 'CTM_SUNMAR_MEDIA_EB_CREO-NEW';

        if (isOldCampaign) {
            return;
        }

        if (isNewCampaign) {
            changeBannerImage();
            setCookie('sunmar_banner_version', 'new', 30);
        }
    }

    checkAndChangeBanner();
});