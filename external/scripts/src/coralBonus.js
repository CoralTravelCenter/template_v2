(function coralBonusHotelsBadge() {
    const STYLE_ELEMENT_ID = 'coral-bonus-hotels-styles';
    const BADGE_ATTRIBUTE = 'data-coral-bonus-badge';
    const TOOLTIP_ATTRIBUTE = 'data-coral-bonus-tooltip';
    const PAGE_CARD_SELECTOR = '.hotel-showcase';
    const SEARCH_LIST_ITEM_SELECTOR = '.hotel-list-item';
    const SEARCH_CARD_SLIDER_SELECTOR = '.hotel-card-slider';
    const HOTEL_DETAIL_GALLERY_WRAPPER_SELECTOR = '[class*="HotelDetailBlock_hotelDetailGalleryWrapper"]';
    const HOTEL_BADGES_SELECTOR = '[class*="hotel-badges"], [class*="HotelBadges"], .hotel-badges';
    const TITLE_SELECTOR = '.B2CHeading';
    const DATE_RANGE_SELECTOR = '.custom-display-value';
    const MOBILE_DATE_INPUT_SELECTOR = '#QSCalendarContainer input';
    const VIRTUOSO_LIST_SELECTOR = '[data-testid="virtuoso-item-list"]';
    const MOBILE_MEDIA_QUERY = '(max-width: 991px)';
    const RECHECK_DELAY = 250;
    const TOOLTIP_HIDE_DELAY = 180;
    const RESCAN_BURST_DELAYS = [0, 150, 350, 700];
    const OBSERVER_CONFIG = {
        attributes: true,
        attributeFilter: ['class', 'style', 'aria-hidden'],
        childList: true,
        characterData: true,
        subtree: true,
    };
    const HOTELS = [
        {
            hotel: 'SHERWOOD EXCLUSIVE KEMER',
            bonus: '4000',
            dates: '10.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/sherwood-2026/?erid=2W5zFHKRs5s',
        },
        {
            hotel: 'SHERWOOD EXCLUSIVE LARA',
            bonus: '4000',
            dates: '10.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/sherwood-2026/?erid=2W5zFHKRs5s',
        },
        {
            hotel: 'SHERWOOD DREAMS RESORT',
            bonus: '4000',
            dates: '10.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/sherwood-2026/?erid=2W5zFHKRs5s',
        },
        {
            hotel: 'SHERWOOD BLUE BELEK',
            bonus: '4000',
            dates: '10.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/sherwood-2026/?erid=2W5zFHKRs5s',
        },
        {
            hotel: 'SHERWOOD PREMIO HOTEL',
            bonus: '4000',
            dates: '10.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/sherwood-2026/?erid=2W5zFHKRs5s',
        },
        {
            hotel: 'PAPILLON AYSCHA HOTEL',
            bonus: '8000',
            dates: '02.04.2026 – 09.11.2026',
            url: 'https://coralbonus.ru/promo/papillon-2026/?erid=2W5zFJRN5PF',
        },
        {
            hotel: 'PAPILLON ZEUGMA RELAXURY',
            bonus: '8000',
            dates: '02.04.2026 – 09.11.2026',
            url: 'https://coralbonus.ru/promo/papillon-2026/?erid=2W5zFJRN5PF',
        },
        {
            hotel: 'PAPILLON BELVIL HOTEL',
            bonus: '8000',
            dates: '02.04.2026 – 09.11.2026',
            url: 'https://coralbonus.ru/promo/papillon-2026/?erid=2W5zFJRN5PF',
        },
        {
            hotel: 'XANADU RESORT',
            bonus: '6000',
            dates: '01.04.2026 – 23.10.2026',
            url: 'https://coralbonus.ru/promo/xanadu-resort/?erid=2W5zFH6TaTS',
        },
        {
            hotel: 'THE LAND OF LEGENDS KINGDOM HOTEL',
            bonus: '12000',
            dates: '01.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/the-land-of-legends-kingdom-hotel/?erid=2W5zFGFKbUC',
        },
        {
            hotel: 'XANADU MAKADI BAY',
            bonus: '6000',
            dates: '01.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/xanadu-makadi-bay/?erid=2W5zFHaQvuW',
        },
        {
            hotel: 'THE LAND OF LEGENDS NICKELODEON HOTEL & RESORT',
            bonus: '10000',
            dates: '01.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/the-land-of-legends-nickelodeon-hotels-resorts-antalya/?erid=2W5zFGDZKQd',
        },
        {
            hotel: 'XANADU CLUB MAKADI BAY',
            bonus: '5000',
            dates: '01.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/xanadu-club-makadi-bay/?erid=2W5zFHSafqK',
        },
        {
            hotel: 'SEVEN SEAS HOTEL LIFE',
            bonus: '6000',
            dates: '01.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/seven-seas-hotel-life/?erid=2W5zFGExQEC',
        },
        {
            hotel: 'KAYA PALAZZO GOLF RESORT',
            bonus: '10000',
            dates: '01.04.2026 – 23.10.2026',
            url: 'https://coralbonus.ru/promo/kaya-palazzo-golf-resort/?erid=2W5zFJeWgqn',
        },
        {
            hotel: 'MARVIDA FAMILY ECO',
            bonus: '4000',
            dates: '01.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/marvida-family-eco/?erid=2W5zFGRLeun',
        },
        {
            hotel: 'ROX RESORT HOTEL',
            bonus: '3000',
            dates: '01.04.2026-23.11.2026',
            url: 'https://coralbonus.ru/promo/rox-2026/?erid=2W5zFGevWky',
        },
        {
            hotel: 'GREENWOOD KEMER RESORT 4*',
            bonus: '3000',
            dates: '01.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/greenwood/?erid=2W5zFHAMzde',
        },
        {
            hotel: 'GREENWOOD SUITES RESORT 5*',
            bonus: '3000',
            dates: '01.04.2026-23.10.2026',
            url: 'https://coralbonus.ru/promo/greenwood/?erid=2W5zFHAMzde',
        },
        {
            hotel: 'SEVEN SEAS JOLIE BAY',
            bonus: '3000',
            dates: '01.04.2026 – 23.10.2026',
            url: 'https://coralbonus.ru/promo/seven-seas-jolie-bay/?erid=2W5zFG1YVNQ',
        },
    ];
    const HOTELS_BY_NAME = new Map(HOTELS.map(item => [normalizeHotelName(item.hotel), item]));
    let scanTimer = 0;
    let burstTimers = [];
    let activeObserver = null;
    let observedRoot = null;

    function normalizeHotelName(value) {
        return String(value || '')
            .replace(/\u00a0/g, ' ')
            .replace(/['']/g, '')
            .replace(/\s+/g, ' ')
            .replace(/\b\d+\*\b/g, '')
            .replace(/[*]/g, '')
            .replace(/[.,:;"`]/g, ' ')
            .replace(/\s+-\s+/g, ' ')
            .trim()
            .toLowerCase();
    }

    function formatBonusValue(value) {
        const digits = String(value || '').replace(/\D/g, '');

        if (!digits) {
            return '';
        }

        return Number(digits).toLocaleString('ru-RU');
    }

    function createDate(year, month, day) {
        const date = new Date(year, month - 1, day);

        if (
            Number.isNaN(date.getTime())
            || date.getFullYear() !== year
            || date.getMonth() !== month - 1
            || date.getDate() !== day
        ) {
            return null;
        }

        return date;
    }

    function parseDateRangeText(value) {
        const normalizedValue = String(value || '')
            .replace(/\u00a0/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        const fullRangeMatch = normalizedValue.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})\s*[-–]\s*(\d{1,2})\.(\d{1,2})\.(\d{4})/);

        if (fullRangeMatch) {
            const [, startDay, startMonth, startYear, endDay, endMonth, endYear] = fullRangeMatch;
            const start = createDate(Number(startYear), Number(startMonth), Number(startDay));
            const end = createDate(Number(endYear), Number(endMonth), Number(endDay));

            if (start && end) {
                return { start, end };
            }
        }

        const shortStartMatch = normalizedValue.match(/(\d{1,2})\.(\d{1,2})\s*[-–]\s*(\d{1,2})\.(\d{1,2})\.(\d{4})/);

        if (shortStartMatch) {
            const [, startDay, startMonth, endDay, endMonth, endYear] = shortStartMatch;
            const inferredStartYear = Number(endYear);
            const start = createDate(inferredStartYear, Number(startMonth), Number(startDay));
            const end = createDate(Number(endYear), Number(endMonth), Number(endDay));

            if (start && end) {
                return { start, end };
            }
        }

        const singleDateMatch = normalizedValue.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);

        if (singleDateMatch) {
            const [, day, month, year] = singleDateMatch;
            const date = createDate(Number(year), Number(month), Number(day));

            if (date) {
                return { start: date, end: date };
            }
        }

        return null;
    }

    function getSelectedDateRange() {
        if (window.matchMedia(MOBILE_MEDIA_QUERY).matches) {
            const mobileDateInput = document.querySelector(MOBILE_DATE_INPUT_SELECTOR);
            const mobileRange = parseDateRangeText(mobileDateInput?.value || '');

            if (mobileRange) {
                return mobileRange;
            }
        }

        for (const element of document.querySelectorAll(DATE_RANGE_SELECTOR)) {
            const parsedRange = parseDateRangeText(element.textContent);

            if (parsedRange) {
                return parsedRange;
            }
        }

        return null;
    }

    function rangesIntersect(firstRange, secondRange) {
        if (!firstRange || !secondRange) {
            return false;
        }

        return firstRange.start <= secondRange.end && secondRange.start <= firstRange.end;
    }

    function ensureStyles() {
        let styleElement = document.getElementById(STYLE_ELEMENT_ID);

        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = STYLE_ELEMENT_ID;
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = `
            .coral-bonus-badge {
                align-items: center;
                background: linear-gradient(90deg, #0093D0 0%, #004B6A 100%), linear-gradient(0deg, #0093D0 0%, #0093D0 100%) !important;
                border-radius: 4px;
                color: #fff;
                display: inline-flex;
                font-family: inherit;
                flex-shrink: 0;
                gap: 4px;
                height: 24px;
                left: 12px;
                padding: 2px 4px;
                top: 12px;
                z-index: 5;
            }

            .coral-bonus-badge__coin {
                background: radial-gradient(circle at 30% 30%, #ffed98 0%, #ffcb3d 38%, #d88a00 100%);
                border: 1px solid rgba(255, 255, 255, 0.35);
                border-radius: 50%;
                color: #a25b00;
                flex: 0 0 12px;
                font-size: 8px;
                font-weight: 700;
                height: 12px;
                line-height: 1;
                place-items: center;
                display: grid;
                width: 12px;
            }

            .coral-bonus-badge__text {
                color: inherit !important;
                font-size: 12px;
                font-weight: 400;
                line-height: 12px;
                margin: 0;
                white-space: nowrap;
            }

            .coral-bonus-badge__info {
                align-items: center;
                appearance: none;
                background: transparent;
                border: none;
                color: inherit;
                cursor: pointer;
                display: inline-flex;
                flex: 0 0 auto;
                height: 12px;
                justify-content: center;
                margin: 0;
                padding: 0;
                width: 12px;
            }

            .coral-bonus-badge__info svg {
                display: block;
                height: 12px;
                width: 12px;
            }

            .coral-bonus-badge__tooltip {
                background: #fff;
                border-radius: 16px;
                box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
                display: flex;
                flex-direction: column;
                gap: 16px;
                left: 40%;
                max-width: min(320px, calc(100vw - 40px));
                min-width: 150px;
                opacity: 0;
                padding: 12px;
                pointer-events: none;
                position: absolute;
                top: 45px;
                transform: translateY(-50%) translateX(8px);
                transition: opacity 0.2s ease, transform 0.2s ease;
                visibility: hidden;
                align-items: flex-start;
                justify-content: center;
            }

            .coral-bonus-badge--detail-floating {
                position: absolute;
            }

            .coral-bonus-badge--detail-floating .coral-bonus-badge__tooltip {
                top: 45px;
                transform: translateX(8px);
            }

            .coral-bonus-badge--detail-floating.is-open .coral-bonus-badge__tooltip,
            .coral-bonus-badge--detail-floating.is-visible .coral-bonus-badge__tooltip {
                transform: translateX(0);
            }

            .coral-bonus-badge--search-floating {
                position: absolute;
            }

            .coral-bonus-badge--search-floating .coral-bonus-badge__tooltip {
                top: 45px;
                transform: translateX(8px);
            }

            .coral-bonus-badge--search-floating.is-open .coral-bonus-badge__tooltip,
            .coral-bonus-badge--search-floating.is-visible .coral-bonus-badge__tooltip {
                transform: translateX(0);
            }

            .coral-bonus-badge__tooltip::before {
                background: #fff;
                border-radius: 2px;
                bottom: 30px;
                content: '';
                height: 10px;
                left: 24px;
                position: absolute;
                transform: rotate(45deg);
                width: 10px;
            }

            .coral-bonus-badge__link {
                color: #0093d0 !important;
                font-size: 10px;
                font-weight: 400;
                line-height: 12px;
                text-decoration: underline;
            }

            .coral-bonus-badge.is-open .coral-bonus-badge__tooltip,
            .coral-bonus-badge.is-visible .coral-bonus-badge__tooltip {
                opacity: 1;
                pointer-events: auto;
                transform: translateY(-50%) translateX(0);
                visibility: visible;
            }

            .coral-bonus-badge.is-mobile {
                cursor: pointer;
                max-width: unset;
            }

            .coral-bonus-badge.is-mobile .coral-bonus-badge__text {
                flex: 1 1 0;
            }

            .coral-bonus-badge.is-mobile .coral-bonus-badge__tooltip {
                max-width: unset;
                min-width: unset;
            }

            .coral-bonus-badge.is-mobile .coral-bonus-badge__tooltip::before {
                bottom: auto;
                left: 28px;
                top: -10px;
                transform: rotate(135deg);
            }

            @media screen and (max-width: 991px) {
                .coral-bonus-badge {
                    left: 10px;
                    top: 10px;
                    max-width: calc(100% - 20px);
                }

                .coral-bonus-badge__text {
                    font-size: 10px;
                }

                .coral-bonus-badge__tooltip {
                    padding: 12px;
                }
            }
        `;
    }

    function isVisible(element) {
        if (!element || !element.isConnected) {
            return false;
        }

        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);

        return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
    }

    function getDetailRenderContainer() {
        const detailGalleryWrapper = document.querySelector(HOTEL_DETAIL_GALLERY_WRAPPER_SELECTOR);

        if (!detailGalleryWrapper) {
            return null;
        }

        const hotelBadges = detailGalleryWrapper.querySelector(HOTEL_BADGES_SELECTOR);

        return {
            container: hotelBadges || detailGalleryWrapper,
            hasHotelBadges: Boolean(hotelBadges),
        };
    }

    function updateDetailRenovationPosition() {
        const detailGalleryWrapper = document.querySelector(HOTEL_DETAIL_GALLERY_WRAPPER_SELECTOR);
        const renovationBlock = detailGalleryWrapper?.querySelector('.renovation');

        if (!renovationBlock) {
            return;
        }

        renovationBlock.style.top = '46px';
        renovationBlock.style.left = '12px';
    }

    function findExistingBadge(container) {
        return container?.querySelector(`.${'coral-bonus-badge'}`) || null;
    }

    function buildBadge(item, options = {}) {
        const badge = document.createElement('div');
        const tooltipId = `coral-bonus-tooltip-${Math.random().toString(36).slice(2, 10)}`;
        const bonusLabel = formatBonusValue(item.bonus);

        badge.className = 'coral-bonus-badge';

        if (options.isDetailFloating) {
            badge.classList.add('coral-bonus-badge--detail-floating');
        }

        if (options.isSearchFloating) {
            badge.classList.add('coral-bonus-badge--search-floating');
        }

        badge.setAttribute(BADGE_ATTRIBUTE, normalizeHotelName(item.hotel));
        badge.dataset.hotelName = item.hotel;
        badge.innerHTML = `
            <span class="coral-bonus-badge__coin" aria-hidden="true">₽</span>
            <p class="coral-bonus-badge__text">Дешевле на ${bonusLabel} ₽ с CoralBonus</p>
            <button class="coral-bonus-badge__info" type="button" aria-expanded="false" aria-controls="${tooltipId}" aria-label="Подробнее об акции CoralBonus">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.5"></circle>
                    <path d="M9 8V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                    <circle cx="9" cy="5.5" r="1" fill="currentColor"></circle>
                </svg>
            </button>
            <div class="coral-bonus-badge__tooltip" id="${tooltipId}" ${TOOLTIP_ATTRIBUTE}>
                <a class="coral-bonus-badge__link" href="${item.url}" target="_blank" rel="noopener noreferrer">Подробные условия акции</a>
            </div>
        `;

        initBadgeInteractions(badge);
        syncBadgeMode(badge);
        return badge;
    }

    function trackMetric(goal, params) {
        if (typeof window.ym !== 'function') {
            return;
        }

        try {
            if (params) {
                window.ym(96674199, 'reachGoal', goal, params);
            } else {
                window.ym(96674199, 'reachGoal', goal);
            }
        } catch (error) {
            console.error('[coralBonus] Metric error:', error);
        }
    }

    function setBadgeOpenState(badge, isOpen) {
        const trigger = badge.querySelector('.coral-bonus-badge__info');
        const wasOpen = badge.classList.contains('is-open');

        badge.classList.toggle('is-open', isOpen);
        trigger?.setAttribute('aria-expanded', String(isOpen));

        if (isOpen && !wasOpen) {
            trackMetric('coral_bonus_tooltip', {
                hotel: badge.dataset.hotelName || '',
            });
        }
    }

    function setBadgeVisibleState(badge, isVisible) {
        const wasVisible = badge.classList.contains('is-visible');

        badge.classList.toggle('is-visible', isVisible);

        if (isVisible && !wasVisible) {
            trackMetric('coral_bonus_tooltip', {
                hotel: badge.dataset.hotelName || '',
            });
        }
    }

    function clearHideTimer(badge) {
        const timerId = Number(badge.dataset.hideTimerId || 0);

        if (timerId) {
            window.clearTimeout(timerId);
            delete badge.dataset.hideTimerId;
        }
    }

    function scheduleHide(badge) {
        clearHideTimer(badge);

        badge.dataset.hideTimerId = String(window.setTimeout(() => {
            setBadgeVisibleState(badge, false);
            delete badge.dataset.hideTimerId;
        }, TOOLTIP_HIDE_DELAY));
    }

    function syncBadgeMode(badge) {
        const isMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;

        badge.classList.toggle('is-mobile', isMobile);

        if (!isMobile) {
            setBadgeOpenState(badge, false);
        }
    }

    function closeOtherBadges(currentBadge) {
        document.querySelectorAll(`.${'coral-bonus-badge'}.is-open`).forEach(badge => {
            if (badge !== currentBadge) {
                setBadgeOpenState(badge, false);
            }
        });
    }

    function initBadgeInteractions(badge) {
        const trigger = badge.querySelector('.coral-bonus-badge__info');
        const tooltipLink = badge.querySelector('.coral-bonus-badge__link');

        badge.addEventListener('mouseenter', () => {
            if (badge.classList.contains('is-mobile')) {
                return;
            }

            clearHideTimer(badge);
            setBadgeVisibleState(badge, true);
        });

        badge.addEventListener('mouseleave', () => {
            if (badge.classList.contains('is-mobile')) {
                return;
            }

            scheduleHide(badge);
        });

        badge.addEventListener('focusin', () => {
            if (badge.classList.contains('is-mobile')) {
                return;
            }

            clearHideTimer(badge);
            setBadgeVisibleState(badge, true);
        });

        badge.addEventListener('focusout', () => {
            if (badge.classList.contains('is-mobile')) {
                return;
            }

            scheduleHide(badge);
        });

        trigger?.addEventListener('click', event => {
            if (!badge.classList.contains('is-mobile')) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            const nextState = !badge.classList.contains('is-open');
            closeOtherBadges(badge);
            setBadgeOpenState(badge, nextState);
        });

        badge.addEventListener('click', event => {
            if (!badge.classList.contains('is-mobile')) {
                return;
            }

            if (event.target.closest('a')) {
                return;
            }

            const nextState = !badge.classList.contains('is-open');
            closeOtherBadges(badge);
            setBadgeOpenState(badge, nextState);
        });

        tooltipLink?.addEventListener('click', event => {
            trackMetric('coral_bonus_tooltip_click');
            event.stopPropagation();
        });
    }

    function findMatchingHotel(titleText) {
        const normalizedTitle = normalizeHotelName(titleText);

        if (!normalizedTitle) {
            return null;
        }

        if (HOTELS_BY_NAME.has(normalizedTitle)) {
            return HOTELS_BY_NAME.get(normalizedTitle);
        }

        for (const [normalizedHotelName, item] of HOTELS_BY_NAME.entries()) {
            if (normalizedTitle.includes(normalizedHotelName) || normalizedHotelName.includes(normalizedTitle)) {
                return item;
            }
        }

        return null;
    }

    function reconcileBadge(container, expectedItem, options = {}) {
        const existingBadge = findExistingBadge(container);

        if (!expectedItem) {
            existingBadge?.remove();
            return false;
        }

        const normalizedHotelName = normalizeHotelName(expectedItem.hotel);

        if (existingBadge?.getAttribute(BADGE_ATTRIBUTE) === normalizedHotelName) {
            return false;
        }

        existingBadge?.remove();

        if (window.getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }

        const badge = buildBadge(expectedItem, options);
        container.prepend(badge);
        return true;
    }

    function scanDetailHotelPage() {
        const titleElement = [...document.querySelectorAll(TITLE_SELECTOR)].find(isVisible);
        const detailRenderTarget = getDetailRenderContainer();
        const container = detailRenderTarget?.container;
        const selectedDateRange = getSelectedDateRange();
        const detailOptions = {
            isDetailFloating: Boolean(detailRenderTarget && !detailRenderTarget.hasHotelBadges),
        };

        updateDetailRenovationPosition();

        if (!titleElement || !container || !isVisible(container)) {
            if (container) {
                reconcileBadge(container, null, detailOptions);
            }

            return false;
        }

        const item = findMatchingHotel(titleElement.textContent);

        if (!item) {
            reconcileBadge(container, null, detailOptions);
            return false;
        }

        const promoDateRange = parseDateRangeText(item.dates);

        if (!rangesIntersect(selectedDateRange, promoDateRange)) {
            reconcileBadge(container, null, detailOptions);
            return false;
        }

        return reconcileBadge(container, item, detailOptions);
    }

    function getPageCardRenderContainer(cardElement) {
        const imageWrapper = cardElement?.querySelector('[class*="HotelShowcase_hotelShowcaseImageWrapper"]');

        if (!imageWrapper) {
            return null;
        }

        return imageWrapper.querySelector(HOTEL_BADGES_SELECTOR) || imageWrapper;
    }

    function getSearchRenderTarget(cardElement) {
        const slider = cardElement?.querySelector(SEARCH_CARD_SLIDER_SELECTOR);

        if (!slider) {
            return null;
        }

        const hotelBadges = slider.querySelector(HOTEL_BADGES_SELECTOR);

        return {
            container: hotelBadges || slider,
            hasHotelBadges: Boolean(hotelBadges),
        };
    }

    function scanPageHotelCards() {
        let changed = false;

        document.querySelectorAll(PAGE_CARD_SELECTOR).forEach(cardElement => {
            const titleElement = cardElement.querySelector(TITLE_SELECTOR);
            const renderContainer = getPageCardRenderContainer(cardElement);
            const existingBadge = findExistingBadge(cardElement);

            if (!isVisible(cardElement) || !isVisible(titleElement) || !renderContainer) {
                existingBadge?.remove();
                return;
            }

            const item = findMatchingHotel(titleElement.textContent);

            if (!item) {
                existingBadge?.remove();
                return;
            }

            const normalizedHotelName = normalizeHotelName(item.hotel);

            if (existingBadge?.getAttribute(BADGE_ATTRIBUTE) === normalizedHotelName) {
                return;
            }

            existingBadge?.remove();

            if (window.getComputedStyle(renderContainer).position === 'static') {
                renderContainer.style.position = 'relative';
            }

            const badge = buildBadge(item);
            renderContainer.prepend(badge);
            changed = true;
        });

        return changed;
    }

    function scanSearchHotelCards() {
        const listRoot = document.querySelector(VIRTUOSO_LIST_SELECTOR);
        const selectedDateRange = getSelectedDateRange();
        let changed = false;

        if (!listRoot) {
            return false;
        }

        listRoot.querySelectorAll(SEARCH_LIST_ITEM_SELECTOR).forEach(cardElement => {
            const titleElement = cardElement.querySelector(TITLE_SELECTOR);
            const renderTarget = getSearchRenderTarget(cardElement);
            const renderContainer = renderTarget?.container;
            const existingBadge = findExistingBadge(cardElement);
            const searchOptions = {
                isDetailFloating: false,
                isSearchFloating: Boolean(renderTarget && !renderTarget.hasHotelBadges),
            };

            if (!isVisible(cardElement) || !isVisible(titleElement) || !renderContainer) {
                existingBadge?.remove();
                return;
            }

            const item = findMatchingHotel(titleElement.textContent);

            if (!item) {
                existingBadge?.remove();
                return;
            }

            const promoDateRange = parseDateRangeText(item.dates);

            if (!rangesIntersect(selectedDateRange, promoDateRange)) {
                existingBadge?.remove();
                return;
            }

            const normalizedHotelName = normalizeHotelName(item.hotel);

            if (existingBadge?.getAttribute(BADGE_ATTRIBUTE) === normalizedHotelName) {
                return;
            }

            existingBadge?.remove();

            if (window.getComputedStyle(renderContainer).position === 'static') {
                renderContainer.style.position = 'relative';
            }

            const badge = buildBadge(item, searchOptions);
            renderContainer.prepend(badge);
            changed = true;
        });

        return changed;
    }

    function scanAllContexts() {
        const detailChanged = scanDetailHotelPage();
        const pageCardsChanged = scanPageHotelCards();
        const searchChanged = scanSearchHotelCards();

        return detailChanged || pageCardsChanged || searchChanged;
    }

    function scheduleScan() {
        window.clearTimeout(scanTimer);
        scanTimer = window.setTimeout(() => {
            scanAllContexts();
        }, RECHECK_DELAY);
    }

    function scheduleScanBurst() {
        burstTimers.forEach(timerId => window.clearTimeout(timerId));
        burstTimers = RESCAN_BURST_DELAYS.map(delay => window.setTimeout(() => {
            scanAllContexts();
        }, delay));
    }

    function getObserverRoot() {
        return document.body;
    }

    function bindGlobalListeners() {
        document.addEventListener('click', event => {
            if (event.target.closest('.coral-bonus-badge.is-mobile')) {
                return;
            }

            closeOtherBadges(null);

            if (event.target.closest('[role="tab"], [class*="tab"], [class*="Tab"], .swiper-button-next, .swiper-button-prev, [class*="swiper-button"]')) {
                scheduleScanBurst();
            }
        });

        window.addEventListener('resize', () => {
            document.querySelectorAll('.coral-bonus-badge').forEach(syncBadgeMode);
        });

        document.addEventListener('transitionend', event => {
            if (
                event.target instanceof Element
                && (
                    event.target.closest(PAGE_CARD_SELECTOR)
                    || event.target.closest(VIRTUOSO_LIST_SELECTOR)
                    || event.target.closest(HOTEL_DETAIL_GALLERY_WRAPPER_SELECTOR)
                )
            ) {
                scheduleScanBurst();
            }
        });

        document.addEventListener('animationend', event => {
            if (
                event.target instanceof Element
                && (
                    event.target.closest(PAGE_CARD_SELECTOR)
                    || event.target.closest(VIRTUOSO_LIST_SELECTOR)
                    || event.target.closest(HOTEL_DETAIL_GALLERY_WRAPPER_SELECTOR)
                )
            ) {
                scheduleScanBurst();
            }
        });
    }

    function connectObserver(target) {
        if (!target || observedRoot === target) {
            return;
        }

        activeObserver?.disconnect();
        observedRoot = target;
        activeObserver = new MutationObserver(mutations => {
            scheduleScan();
        });

        activeObserver.observe(target, OBSERVER_CONFIG);
    }

    function startObserver() {
        connectObserver(getObserverRoot());

        const rootWatcher = new MutationObserver(() => {
            connectObserver(getObserverRoot());
        });

        rootWatcher.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    function init() {
        ensureStyles();
        bindGlobalListeners();
        scanAllContexts();
        startObserver();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
