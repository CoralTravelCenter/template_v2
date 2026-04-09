(function () {
    const badgeId = 'secret-hotel-lock-badge';
    const styleId = 'secret-hotel-lock-badge-style';
    const openGifUrl = 'https://b2ccdn.coral.ru/content/landing-pages/secret-hotel/open.gif';
    const closeGifUrl = 'https://b2ccdn.coral.ru/content/landing-pages/secret-hotel/close.gif';
    const offerUrl = 'https://www.coral.ru/hot-offers/secret-hotel/';
    const closeDelay = 350;

    function initSecretHotelBadge() {
        if (document.getElementById(badgeId)) {
            return;
        }

        addStyles();

        const badge = document.createElement('div');
        badge.className = 'secret-hotel-badge';
        badge.id = badgeId;

        const lockButton = document.createElement('button');
        lockButton.className = 'secret-hotel-badge__lock';
        lockButton.type = 'button';
        lockButton.setAttribute('aria-label', 'Открыть подсказку про секретный отель');
        lockButton.setAttribute('aria-expanded', 'false');

        const lockImage = document.createElement('img');
        lockImage.className = 'secret-hotel-badge__image';
        lockImage.src = closeGifUrl;
        lockImage.alt = 'Secret Hotel';
        lockImage.loading = 'lazy';

        const popup = document.createElement('div');
        popup.className = 'secret-hotel-badge__popup';

        const text = document.createElement('div');
        text.className = 'secret-hotel-badge__text';
        text.textContent = 'Открылся секретный отель';

        const link = document.createElement('a');
        link.className = 'secret-hotel-badge__link';
        link.href = offerUrl;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = 'Посмотреть';

        popup.append(text, link);
        lockButton.append(lockImage);
        badge.append(lockButton, popup);
        document.body.appendChild(badge);

        preloadLockAnimations();

        let closeTimer = null;

        const cancelDelayedClose = () => {
            clearTimeout(closeTimer);
            closeTimer = null;
        };

        const openBadge = () => {
            cancelDelayedClose();

            badge.classList.add('secret-hotel-badge--open');
            lockButton.setAttribute('aria-expanded', 'true');
            replayLockAnimation(lockImage, openGifUrl);
        };

        const closeBadge = () => {
            if (!badge.classList.contains('secret-hotel-badge--open')) {
                return;
            }

            badge.classList.remove('secret-hotel-badge--open');
            lockButton.setAttribute('aria-expanded', 'false');
            replayLockAnimation(lockImage, closeGifUrl);
        };

        const closeBadgeSoon = () => {
            cancelDelayedClose();

            closeTimer = setTimeout(() => {
                closeBadge();
                lockButton.blur();
            }, closeDelay);
        };

        badge.addEventListener('mouseenter', openBadge);
        badge.addEventListener('mouseleave', closeBadgeSoon);

        badge.addEventListener('focusin', openBadge);

        badge.addEventListener('focusout', event => {
            if (badge.contains(event.relatedTarget)) {
                return;
            }

            closeBadgeSoon();
        });

        lockButton.addEventListener('click', openBadge);

        link.addEventListener('click', sendButtonMetric);

        document.addEventListener('click', event => {
            if (badge.contains(event.target)) {
                return;
            }

            closeBadge();
            cancelDelayedClose();
            lockButton.blur();
        });
    }

    function sendButtonMetric() {
        if (typeof ym !== 'function') {
            return;
        }

        ym(96674199, 'reachGoal', 'secret_hotel_lock_button');
    }

    function preloadLockAnimations() {
        [openGifUrl, closeGifUrl].forEach(url => {
            const image = new Image();
            image.src = url;
        });
    }

    function replayLockAnimation(image, url) {
        if (image.dataset.lockAnimationUrl === url) {
            image.removeAttribute('src');
        }

        image.dataset.lockAnimationUrl = url;
        requestAnimationFrame(() => {
            image.src = url;
        });
    }

    function addStyles() {
        if (document.getElementById(styleId)) {
            return;
        }

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .secret-hotel-badge {
                --secret-hotel-lock-size: clamp(112px, 12vw, 178px);

                position: fixed;
                left: -16px;
                bottom: -16px;
                z-index: 2147483000;
                width: var(--secret-hotel-lock-size);
            }

            .secret-hotel-badge,
            .secret-hotel-badge * {
                box-sizing: border-box;
            }

            .secret-hotel-badge__lock {
                display: block;
                width: 100%;
                padding: 0;
                border: 0;
                background: transparent;
                cursor: pointer;
            }

            .secret-hotel-badge__image {
                display: block;
                width: 100%;
                height: auto;
                pointer-events: none;
                user-select: none;
            }

            .secret-hotel-badge__popup {
                position: absolute;
                left: min(72%, calc(100vw - 328px));
                bottom: 72%;
                width: max-content;
                max-width: min(380px, calc(100vw - 32px));
                padding: 10px;
                border-radius: 18px;
                background: #fff;
                box-shadow: 0 12px 28px rgba(35, 49, 59, 0.26);
                color: #2b2b2b;
                opacity: 0;
                transform: translateY(10px);
                visibility: hidden;
                pointer-events: none;
                transition: opacity 180ms ease, transform 180ms ease, visibility 180ms ease;
            }

            .secret-hotel-badge__popup::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 10px;
                width: 30px;
                height: 30px;
                background: inherit;
                transform: translate(8px, 12px) skewY(-35deg) rotate(6deg);
                border-bottom-left-radius: 5px;
            }

            .secret-hotel-badge:hover .secret-hotel-badge__popup,
            .secret-hotel-badge:focus-within .secret-hotel-badge__popup,
            .secret-hotel-badge--open .secret-hotel-badge__popup {
                opacity: 1;
                transform: translateY(0);
                visibility: visible;
                pointer-events: auto;
            }

            .secret-hotel-badge__text {
                position: relative;
                z-index: 1;
                margin: 0 0 14px;
                font-size: 13px;
                line-height: 1.2;
                white-space: nowrap;
            }

            .secret-hotel-badge__link {
                position: relative;
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 6px;
                border-radius: 8px;
                background: #0093d0;
                color: #fff;
                font-size: 11px;
                line-height: 1;
                text-align: center;
                text-decoration: none;
            }

            .secret-hotel-badge__link:hover {
                background: #007fb5;
                color: #fff;
                text-decoration: none;
            }

            @media (max-width: 768px) {
                .secret-hotel-badge {
                    --secret-hotel-lock-size: 112px;

                    left: -12px;
                    bottom: -12px;
                }

                .secret-hotel-badge__popup {
                    left: 58%;
                    bottom: 74%;
                    max-width: calc(100vw - 24px);
                    padding: 14px;
                    border-radius: 14px;
                }

                .secret-hotel-badge__text {
                    margin-bottom: 10px;
                    font-size: 18px;
                    white-space: normal;
                }

                .secret-hotel-badge__link {
                    min-height: 42px;
                    padding: 9px 16px;
                    font-size: 18px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    if (document.body) {
        initSecretHotelBadge();
    } else {
        document.addEventListener('DOMContentLoaded', initSecretHotelBadge, { once: true });
    }
})();
