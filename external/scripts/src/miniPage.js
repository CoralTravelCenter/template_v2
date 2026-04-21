const ROOT_SELECTOR = '[class*="BannerMainBanner_bannerMainBanner"]';
const SLIDE_SELECTOR = '.swiper-wrapper > .swiper-slide';
const REMOVABLE_BLOCK_SELECTORS = ['.js-timer-block', '.sunmar-bento', '.chain-hotels', '.ease-online'];
const HOT_DEALS_SELECTOR = '.hot-deals-block';
const HOT_DEALS_TITLE = 'Горящие предложения';
const DIRECT_REMOVABLE_SELECTORS = ['#section-row-16', '#holiday-guide-block', '#section-row-9'];
const HOTELS_OF_WEEK_SWIPER_SELECTOR = '.hotels-of-the-week .swiper';
const MAX_SLIDES = 5;
const STYLE_ELEMENT_ID = 'mini-page-overrides';

async function hostReactAppReady(selector = '#__next > div', timeout = 500) {
    return new Promise(resolve => {
        const waiter = () => {
            const hostEl = document.querySelector(selector);

            if (hostEl?.getBoundingClientRect().height) {
                resolve();
            } else {
                setTimeout(waiter, timeout);
            }
        };

        waiter();
    });
}

function trimMainBannerSlides(root) {
    const slides = Array.from(root.querySelectorAll(SLIDE_SELECTOR));

    if (slides.length <= MAX_SLIDES) {
        return false;
    }

    slides.slice(MAX_SLIDES).forEach(slide => slide.remove());
    return true;
}

function initMainBannerLimiter() {
    const root = document.querySelector(ROOT_SELECTOR);

    if (!root) {
        return false;
    }

    trimMainBannerSlides(root);

    if (root.dataset.bannerSlidesLimited === 'true') {
        return true;
    }

    const observer = new MutationObserver(() => {
        trimMainBannerSlides(root);
    });

    observer.observe(root, {
        childList: true,
        subtree: true,
    });

    root.dataset.bannerSlidesLimited = 'true';
    return true;
}

function findNearestDivInsideAntCol(element) {
    if (!element) {
        return null;
    }

    let current = element;

    while (current && current.parentElement) {
        const parent = current.parentElement;

        if (
            current.tagName.toLowerCase() === 'div' &&
            parent.tagName.toLowerCase() === 'div' &&
            parent.classList.contains('ant-col')
        ) {
            return current;
        }

        current = parent;
    }

    return null;
}

function removeBlocksInsideAntCol() {
    let removedAny = false;

    REMOVABLE_BLOCK_SELECTORS.forEach(selector => {
        document.querySelectorAll(selector).forEach(block => {
            const container = findNearestDivInsideAntCol(block);

            if (!container || container.dataset.removedByMiniPage === 'true') {
                return;
            }

            container.dataset.removedByMiniPage = 'true';
            container.remove();
            removedAny = true;
        });
    });

    return removedAny;
}

function removeHotDealsBlocks() {
    let removedAny = false;

    document.querySelectorAll(HOT_DEALS_SELECTOR).forEach(block => {
        const hasTargetTitle = Array.from(block.querySelectorAll('*')).some(node => {
            return node.textContent?.trim() === HOT_DEALS_TITLE;
        });

        if (!hasTargetTitle || block.dataset.removedByMiniPage === 'true') {
            return;
        }

        block.dataset.removedByMiniPage = 'true';
        block.remove();
        removedAny = true;
    });

    return removedAny;
}

function removeDirectBlocks() {
    let removedAny = false;

    DIRECT_REMOVABLE_SELECTORS.forEach(selector => {
        document.querySelectorAll(selector).forEach(block => {
            if (block.dataset.removedByMiniPage === 'true') {
                return;
            }

            block.dataset.removedByMiniPage = 'true';
            block.remove();
            removedAny = true;
        });
    });

    return removedAny;
}

function fixHotelsOfWeekSwiperHeight() {
    document.querySelectorAll(HOTELS_OF_WEEK_SWIPER_SELECTOR).forEach(swiper => {
        swiper.style.setProperty('height', '350px', 'important');
    });
}

function ensureStyleOverrides() {
    let styleElement = document.getElementById(STYLE_ELEMENT_ID);

    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = STYLE_ELEMENT_ID;
        document.head.appendChild(styleElement);
    }

    styleElement.textContent = `
        section.hero.hotels-of-the-week > article .contenu .swiper-slide {
            min-height: 350px !important;
            height: 350px;
        }
    `;
}

function runCleanup() {
    ensureStyleOverrides();
    initMainBannerLimiter();
    removeBlocksInsideAntCol();
    removeHotDealsBlocks();
    removeDirectBlocks();
    fixHotelsOfWeekSwiperHeight();
}

hostReactAppReady().then(() => {
    runCleanup();

    const bootstrapObserver = new MutationObserver(() => {
        runCleanup();
    });

    bootstrapObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
});
