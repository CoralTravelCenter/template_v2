const TARGET_PATH = '/hot-offers/secret-hotel/';
const TARGET_BANNER_ID = 'main-secret-hotel';
const TIMER_CLASS = 'external-main-banner-timer';
const TIMER_STYLE_ID = 'external-main-banner-timer-style';
const IMAGE_POSITION_CLASS = 'external-main-banner-image-position';

function normalizeUrl(value) {
    try {
        const url = new URL(value, window.location.origin);
        url.hash = '';
        return url;
    } catch {
        return null;
    }
}

function isTargetBannerLink(link) {
    if (!link?.matches('[class*="BannerLinkWrapper_bannerLinkWrapper"]')) {
        return false;
    }

    const url = normalizeUrl(link.href);
    if (!url) {
        return false;
    }

    return (
        url.pathname === TARGET_PATH &&
        url.searchParams.get('banner_on_site') === TARGET_BANNER_ID
    );
}

function ensureStyles() {
    if (document.getElementById(TIMER_STYLE_ID)) {
        return;
    }

    const style = document.createElement('style');
    style.id = TIMER_STYLE_ID;
    style.textContent = `
        [class*="BannerLinkWrapper_bannerLinkWrapper"] {
            position: relative;
        }

        .${TIMER_CLASS} {
            position: absolute;
            right: 59px;
            bottom: 115px;
            z-index: 4;
            color: #0092D0;
            text-align: right;
            font-size: 39px;
            font-weight: 600;
            line-height: 46px;
            font-family: Arial, sans-serif;
            pointer-events: none;
            font-variant-numeric: tabular-nums;
            white-space: nowrap;
        }

        @media screen and (max-width: 768px) {
            .${TIMER_CLASS} {
                right: 38px;
                bottom: 88px;
                font-size: 27px;
                line-height: 34px;
            }
        }
        
        @media screen and (max-width: 515px) {
            .${TIMER_CLASS} {
                right: 28px;
                bottom: 128px;
                font-size: 27px;
                line-height: 34px;
            }
        }

        [class*="BannerLinkWrapper_bannerLinkWrapper"].${IMAGE_POSITION_CLASS} img {
            object-position: 95% !important;
        }
    `;

    document.head.appendChild(style);
}

function getNextMidnightTimestamp() {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    return nextMidnight.getTime();
}

function formatTimeLeft(distanceMs) {
    const safeDistance = Math.max(0, distanceMs);
    const totalSeconds = Math.floor(safeDistance / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
        .map(value => String(value).padStart(2, '0'))
        .join(':');
}

function updateTimer(timerNode) {
    timerNode.textContent = formatTimeLeft(getNextMidnightTimestamp() - Date.now());
}

function createTimer() {
    const timerNode = document.createElement('div');
    timerNode.className = TIMER_CLASS;
    updateTimer(timerNode);
    return timerNode;
}

function findTargetBannerLink() {
    return [...document.querySelectorAll('a[href]')].find(isTargetBannerLink) || null;
}

function updateBannerImagePosition(link) {
    if (!link) {
        return;
    }

    link.classList.add(IMAGE_POSITION_CLASS);

    const image = link.querySelector('img');
    if (image) {
        image.style.objectPosition = '95%';
    }
}

function mountTimer() {
    const link = findTargetBannerLink();
    if (!link || link.querySelector(`.${TIMER_CLASS}`)) {
        return null;
    }

    updateBannerImagePosition(link);

    const timerNode = createTimer();
    link.appendChild(timerNode);

    window.setInterval(() => {
        updateTimer(timerNode);
    }, 1000);

    return timerNode;
}

function init() {
    ensureStyles();

    const observer = new MutationObserver(() => {
        const link = findTargetBannerLink();
        if (link) {
            updateBannerImagePosition(link);
        }

        mountTimer();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });

    const existingLink = findTargetBannerLink();
    if (existingLink) {
        updateBannerImagePosition(existingLink);
    }

    mountTimer();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
    init();
}
