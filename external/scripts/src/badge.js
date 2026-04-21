const BADGE_ID = 'secret-hotel-promo-badge';
const STYLE_ID = 'secret-hotel-promo-badge-style';
const HOST_CLASS = 'secret-hotel-promo-badge-host';
const TOAST_ID = 'secret-hotel-promo-badge-toast';
const SECRET_PROMO_CODE = 'СЕКРЕТ';
const LOCK_IMAGE_URL = 'https://b2ccdn.coral.ru/content/landing-pages/secret-hotel/cover_2.png';
const SECRET_HOTEL_IDS = new Set([
    '875', '626', '623', '975', '30511', '325', '24420', '13570', '983', '33799', '476', '8194',
    '11754', '972', '674', '948', '453', '4139', '947', '9910', '703', '973', '679', '8116',
    '19936', '29816', '58', '50000', '13279', '157', '84', '78607', '50799', '15577', '7568',
    '31420', '129', '82642', '19937', '78', '8387', '98', '49757', '187', '126', '64951',
    '19943', '90',
]);

function extractHotelIdFromImageUrl(value) {
    return String(value || '').match(/\/media\/image\/\d+\/(\d+)\//i)?.[1] || '';
}

function getCurrentHotelId() {
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');

    for (const script of jsonLdScripts) {
        try {
            const data = JSON.parse(script.textContent || '{}');
            const items = Array.isArray(data) ? data : [data];

            for (const item of items) {
                const hotelId = extractHotelIdFromImageUrl(item?.image);
                if (hotelId) {
                    return hotelId;
                }
            }
        } catch {
            continue;
        }
    }

    const ogImage = document.querySelector('meta[property="og:image"]')?.content || '';
    return extractHotelIdFromImageUrl(ogImage);
}

function ensureStyles() {
    if (document.getElementById(STYLE_ID)) {
        return;
    }

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
        .${HOST_CLASS} {
            position: relative !important;
        }

        #${BADGE_ID} {
            position: absolute;
            right: 16px;
            top: 16px;
            z-index: 8;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 10px;
            
            border: none;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px 0 rgba(255, 255, 255, 0.30);
            color: #202020;
            font-family: Arial, sans-serif;
            font-size: 14px;
            font-weight: 700;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            transition: transform 160ms ease, box-shadow 160ms ease;
        }

        #${BADGE_ID} .secret-hotel-promo-badge__icon {
            width: 26px;
            height: 26px;
            object-fit: contain;
            flex: 0 0 auto;
        }

        #${BADGE_ID} .secret-hotel-promo-badge__accent {
            color: #f07f4f;
            font-weight: 700;
        }

        #${TOAST_ID} {
            position: absolute;
            right: 24px;
            top: 0px;
            z-index: 9;
            padding: 10px 14px;
            border-radius: 14px;
            background: rgba(32, 32, 32, 0.9);
            color: #fff;
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.2;
            opacity: 0;
            transform: translateY(8px);
            pointer-events: none;
            transition: opacity 180ms ease, transform 180ms ease;
        }

        #${TOAST_ID}.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media screen and (max-width: 768px) {
            #${BADGE_ID} {
                right: 8px;
                top: 8px;
            }

            #${BADGE_ID} .secret-hotel-promo-badge__icon {
                width: 22px;
                height: 22px;
            }

            #${TOAST_ID} {
         
                font-size: 10px;
            }
        }
        
        @media screen and (max-width: 424px) {
        #${BADGE_ID} {
                top: unset;
            bottom: 8px;
            right: unset;
            left: 8px;
            font-size: 10px;
            }
        }
        
        #${TOAST_ID} {
             top: unset;
            bottom: 8px;
            right: unset;
            left: 8px;
               
            }
    `;

    document.head.appendChild(style);
}

function createBadge() {
    const badge = document.createElement('button');
    badge.id = BADGE_ID;
    badge.type = 'button';
    badge.setAttribute('aria-label', `Скопировать промокод ${SECRET_PROMO_CODE}`);
    badge.innerHTML = `\
        <img class="secret-hotel-promo-badge__icon" src="${LOCK_IMAGE_URL}" alt="" />\
        <span class="secret-hotel-promo-badge__text">ПРОМОКОД «<span class="secret-hotel-promo-badge__accent">${SECRET_PROMO_CODE}</span>»</span>\
    `;
    return badge;
}

function createToast() {
    const toast = document.createElement('div');
    toast.id = TOAST_ID;
    toast.setAttribute('aria-hidden', 'true');
    toast.textContent = 'Промокод скопирован';
    return toast;
}

function removeBadge() {
    document.getElementById(BADGE_ID)?.remove();
    document.getElementById(TOAST_ID)?.remove();
    document.querySelector(`.${HOST_CLASS}`)?.classList.remove(HOST_CLASS);
}

let toastTimerId = 0;

function showToast(host) {
    let toast = host.querySelector(`#${TOAST_ID}`);

    if (!toast) {
        toast = createToast();
        host.appendChild(toast);
    }

    clearTimeout(toastTimerId);
    toast.classList.add('is-visible');

    toastTimerId = window.setTimeout(() => {
        toast.classList.remove('is-visible');
    }, 1800);
}

async function copyPromoCode(host) {
    try {
        await navigator.clipboard.writeText(SECRET_PROMO_CODE);
        showToast(host);
    } catch {
        // no-op
    }
}

function syncBadge() {
    const hotelId = getCurrentHotelId();
    const host = document.querySelector('[class*="PhotoGalleryMainCarousel_mainCarousel"]');

    if (!SECRET_HOTEL_IDS.has(hotelId) || !host) {
        removeBadge();
        return;
    }

    ensureStyles();

    const currentHost = document.querySelector(`.${HOST_CLASS}`);
    if (currentHost && currentHost !== host) {
        currentHost.classList.remove(HOST_CLASS);
    }

    host.classList.add(HOST_CLASS);

    let badge = host.querySelector(`#${BADGE_ID}`);

    if (!badge) {
        badge = createBadge();
        badge.addEventListener('click', () => {
            copyPromoCode(host);
        });
        host.appendChild(badge);
    }
}

function init() {
    let rafId = 0;

    const scheduleSync = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(syncBadge);
    };

    new MutationObserver(scheduleSync).observe(document.documentElement, {
        childList: true,
        subtree: true,
    });

    scheduleSync();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
    init();
}
