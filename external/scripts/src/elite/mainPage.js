(() => {
  const BANNER_ROOT_SELECTOR = '[class*="BannerMainBanner_bannerMainBanner"]';
  const STYLE_ID = 'elite-main-page-banner-styles';
  const CUSTOM_SLIDES = [
    {
      id: 'turkey',
      alt: 'Elite Service Turkey',
      href: 'https://www.coral.ru/main/turkey/elite/',
      erid: '2W5zFGRaL6m',
      title: 'Премиальный уровень комфорта в Турции',
      description: 'Выбирайте отдых, продуманный до мелочей',
      buttonText: 'Выбрать тур',
      desktop:
        'https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/main-page/turkey_1440.webp',
      tablet:
        'https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/main-page/turkey_768.webp',
      mobile:
        'https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/main-page/turkey_992.webp',
    },
    {
      id: 'egypt',
      alt: 'Elite Service Egypt',
      href: 'https://www.coral.ru/main/egypt/elite/',
      erid: '2W5zFGYzGWV',
      title: 'Элитный отдых в Египте',
      description: 'Премиальное питание, виллы и консьерж-сервис',
      buttonText: 'Выбрать отель',
      desktop:
          'https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/main-page/egypt_1440.webp',
      tablet:
          'https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/main-page/egypt_992.webp',
      mobile:
          'https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/main-page/egypt_768.webp',
    },
  ];

  let scheduled = false;
  let lastBreakpoint = getBreakpoint();

  function getBreakpoint() {
    if (window.innerWidth <= 768) {
      return 'mobile';
    }

    if (window.innerWidth <= 992) {
      return 'tablet';
    }

    return 'desktop';
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      ${BANNER_ROOT_SELECTOR} .elite-main-banner-slide {
        height: 692px;
        overflow: hidden;
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-link,
      ${BANNER_ROOT_SELECTOR} .elite-main-banner-picture {
        display: block;
        width: 100%;
        height: 100%;
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-card {
        position: relative;
        overflow: hidden;
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-link {
        text-decoration: none;
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-picture {
        position: absolute;
        inset: 0;
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-picture img {
        display: block;
        margin: 0 auto;
        height: 100% !important;
        width: 100% !important;
        min-height: 100%;
        min-width: 100%;
        max-width: none;
        max-height: none;
        object-fit: cover;
        border-radius: 36px;
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;

        width: min(100%, 900px);
        height: 100%;
        padding: 42px;
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-title,
      ${BANNER_ROOT_SELECTOR} .elite-main-banner-description {
        margin: 0;
        color: #fff;
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-title {
        
        font-weight: 300;
        font-size: 56px;
        line-height: 64px;
        margin-bottom: 12px;
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-description {
        margin-bottom: 24px;
        font-size: 20px;
        line-height: 28px;
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
        width: fit-content;
        padding-inline: 20px;
        color: black;
        background-color: #fff;
        border-radius: 48px;
        font-weight: 600;
        text-decoration: none;
        position: relative;
        z-index: 2;
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-slide[data-elite-banner-slide="turkey"] .elite-main-banner-button {
        background: #1296db;
        color: #fff !important;
      }
      
      .elite-main-banner-adv-block {
          position: absolute;
        
        right: 65px;
        bottom: 50px;
        z-index: 15;
      }
      
      .elite-main-banner-adv-button {
        height: 32px;
        color: #535353;
        border: none;
        font-size: 10px;
        line-height: 10px;
        display: flex;
        align-items: center;
        background: white;
        padding: 0 8px;
        border-radius: 32px;
        cursor: pointer;
      }
      
      .elite-main-banner-adv-tooltip {
        position: absolute;
        align-items: center;
        gap: 4px;
        background: white;
        border-radius: 4px;
        padding: 5px 10px;
        min-width: 321px;
        right: 0;
        top: -37px;
        display: flex;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.18s ease, visibility 0.18s ease;
      }
      
      .elite-main-banner-adv-tooltip span {
        font-size: 12px;
      }

      .elite-main-banner-erid-value {
        white-space: nowrap;
      }

      .elite-main-banner-copy-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        background: transparent;
        border: none;
        cursor: pointer;
        color: #535353;
        flex-shrink: 0;
      }

      .elite-main-banner-copy-button svg {
        display: block;
      }

      .elite-main-banner-copy-button.is-copied {
        color: #1296db;
      }

      .elite-main-banner-copy-button.is-copied path {
        fill: #1296db;
      }
      
      .elite-main-banner-adv-tooltip::before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 2px;
        transform: rotate(45deg);
        right: 22px;
        bottom: -5px;
        background: white;
      }

      .elite-main-banner-adv-block.is-tooltip-visible .elite-main-banner-adv-tooltip {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }

      @media (max-width: 992px) {
        ${BANNER_ROOT_SELECTOR} .elite-main-banner-content {
          width: min(100%, 760px);
          padding: 56px 48px;
        }

        ${BANNER_ROOT_SELECTOR} .elite-main-banner-title {
          font-size: 52px;
        }

        ${BANNER_ROOT_SELECTOR} .elite-main-banner-description {
          font-size: 24px;
        }
      }

      @media (max-width: 768px) {
        ${BANNER_ROOT_SELECTOR} .elite-main-banner-slide {
          height: 520px;
        }

        ${BANNER_ROOT_SELECTOR} .elite-main-banner-content {
          width: 100%;
          padding: 40px 24px;
          justify-content: flex-start;
        }

        ${BANNER_ROOT_SELECTOR} .elite-main-banner-title {
          max-width: 100%;
          font-size: 32px;
          line-height: 40px;
        }

        ${BANNER_ROOT_SELECTOR} .elite-main-banner-description {
          max-width: 100%;
          font-size: 20px;
          line-height: 28px;
        }

        ${BANNER_ROOT_SELECTOR} .elite-main-banner-button {
          min-width: 160px;
          min-height: 52px;
          padding: 14px 24px;
          font-size: 17px;
        }

        ${BANNER_ROOT_SELECTOR} .elite-main-banner-picture img {
          border-radius: 0;
        }
        .elite-main-banner-adv-block {
            right: 25px;
          bottom: 20px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => {
      switch (char) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#39;';
        default:
          return char;
      }
    });
  }

  function getSlideImageByBreakpoint(slide, breakpoint = getBreakpoint()) {
    if (breakpoint === 'mobile') {
      return slide.mobile;
    }

    if (breakpoint === 'tablet') {
      return slide.tablet;
    }

    return slide.desktop;
  }

  function createSlideMarkup(slide) {
    const href = slide.href || 'javascript:void(0)';

    return `
      <a class="elite-main-banner-card" href="${escapeHtml(href)}" aria-label="${escapeHtml(slide.alt)}" target="_blank">
        <div class="elite-main-banner-picture">
          <img
            src="${escapeHtml(getSlideImageByBreakpoint(slide))}"
            alt="${escapeHtml(slide.alt)}"
            loading="eager"
            fetchpriority="high"
            data-desktop-src="${escapeHtml(slide.desktop)}"
            data-tablet-src="${escapeHtml(slide.tablet)}"
            data-mobile-src="${escapeHtml(slide.mobile)}"
          >
        </div>
        <div class="elite-main-banner-content">
        <img src="https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/main-page/shield_elite.svg" alt="">
          <h2 class="elite-main-banner-title">${escapeHtml(slide.title || '')}</h2>
          <p class="elite-main-banner-description">${escapeHtml(slide.description || '')}</p>
          <span class="elite-main-banner-button" aria-hidden="true">
            ${escapeHtml(slide.buttonText || 'Подробнее')}
          </span>
        </div>
      </a>
      <div class="elite-main-banner-adv-block">
        <button class="elite-main-banner-adv-button" type="button" aria-expanded="false" aria-label="Показать информацию о рекламе">
            Реклама
        </button>
      <div class="elite-main-banner-adv-tooltip">
        <span>
            Реклама. ООО «Центрбронь» erid: <span class="elite-main-banner-erid-value">${escapeHtml(slide.erid || '')}</span>
        </span>
        <button class="elite-main-banner-copy-button" type="button" aria-label="Скопировать erid" data-erid-copy="${escapeHtml(slide.erid || '')}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1H4.625C4.55625 1 4.5 1.05625 4.5 1.125V2C4.5 2.06875 4.55625 2.125 4.625 2.125H12.375V12.875C12.375 12.9438 12.4312 13 12.5 13H13.375C13.4438 13 13.5 12.9438 13.5 12.875V1.5C13.5 1.22344 13.2766 1 13 1ZM11 3H3C2.72344 3 2.5 3.22344 2.5 3.5V11.7922C2.5 11.925 2.55312 12.0516 2.64687 12.1453L5.35469 14.8531C5.38906 14.8875 5.42813 14.9156 5.47031 14.9391V14.9688H5.53594C5.59062 14.9891 5.64844 15 5.70781 15H11C11.2766 15 11.5 14.7766 11.5 14.5V3.5C11.5 3.22344 11.2766 3 11 3ZM5.46875 13.3781L4.12344 12.0312H5.46875V13.3781ZM10.375 13.875H6.46875V11.6562C6.46875 11.3109 6.18906 11.0312 5.84375 11.0312H3.625V4.125H10.375V13.875Z" fill="#535353"></path></svg>
        </button>
        </div>
        </div>
    `;
  }

  function createSlideElement(slide) {
    const element = document.createElement('div');
    element.className = 'swiper-slide elite-main-banner-slide';
    element.dataset.eliteBannerSlide = slide.id;
    element.setAttribute('data-elite-banner-slide', slide.id);
    element.innerHTML = createSlideMarkup(slide);
    return element;
  }

  function updateResponsiveImages(root) {
    const breakpoint = getBreakpoint();
    const images = root.querySelectorAll('.elite-main-banner-picture img');

    images.forEach((image) => {
      const nextSrc =
        breakpoint === 'mobile'
          ? image.dataset.mobileSrc
          : breakpoint === 'tablet'
            ? image.dataset.tabletSrc
            : image.dataset.desktopSrc;

      if (nextSrc && image.getAttribute('src') !== nextSrc) {
        image.setAttribute('src', nextSrc);
      }
    });
  }

  function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }

  async function copyEridValue(value) {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      fallbackCopyText(value);
    }
  }

  function initAdvControls(root) {
    const blocks = root.querySelectorAll('.elite-main-banner-adv-block');

    blocks.forEach((block) => {
      if (block.dataset.advInitialized === 'true') {
        return;
      }

      block.dataset.advInitialized = 'true';

      const triggerButton = block.querySelector('.elite-main-banner-adv-button');
      const copyButton = block.querySelector('.elite-main-banner-copy-button');
      let showTimeoutId = null;
      let hideTimeoutId = null;
      let copiedTimeoutId = null;

      const isMobileTooltipMode = () => window.innerWidth <= 768;

      const clearTimers = () => {
        if (showTimeoutId) {
          window.clearTimeout(showTimeoutId);
          showTimeoutId = null;
        }

        if (hideTimeoutId) {
          window.clearTimeout(hideTimeoutId);
          hideTimeoutId = null;
        }
      };

      const setExpandedState = (isOpen) => {
        if (triggerButton) {
          triggerButton.setAttribute('aria-expanded', String(isOpen));
        }
      };

      const openTooltip = () => {
        block.classList.add('is-tooltip-visible');
        setExpandedState(true);
      };

      const closeTooltip = () => {
        block.classList.remove('is-tooltip-visible');
        setExpandedState(false);
      };

      const showTooltip = () => {
        if (isMobileTooltipMode()) {
          return;
        }

        clearTimers();
        showTimeoutId = window.setTimeout(() => {
          openTooltip();
        }, 120);
      };

      const hideTooltip = () => {
        if (isMobileTooltipMode()) {
          return;
        }

        clearTimers();
        hideTimeoutId = window.setTimeout(() => {
          closeTooltip();
        }, 180);
      };

      block.addEventListener('mouseenter', showTooltip);
      block.addEventListener('mouseleave', hideTooltip);
      block.addEventListener('focusin', showTooltip);
      block.addEventListener('focusout', hideTooltip);

      if (triggerButton) {
        triggerButton.addEventListener('click', (event) => {
          if (!isMobileTooltipMode()) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();
          clearTimers();

          if (block.classList.contains('is-tooltip-visible')) {
            closeTooltip();
          } else {
            openTooltip();
          }
        });
      }

      document.addEventListener('click', (event) => {
        if (!isMobileTooltipMode()) {
          return;
        }

        if (!block.contains(event.target)) {
          clearTimers();
          closeTooltip();
        }
      });

      if (copyButton) {
        copyButton.addEventListener('click', async (event) => {
          event.preventDefault();
          event.stopPropagation();

          await copyEridValue(copyButton.dataset.eridCopy || '');

          copyButton.classList.add('is-copied');
          if (copiedTimeoutId) {
            window.clearTimeout(copiedTimeoutId);
          }

          copiedTimeoutId = window.setTimeout(() => {
            copyButton.classList.remove('is-copied');
          }, 1200);
        });
      }
    });
  }

  function getSwiperHost(root) {
    return (
      root.querySelector('swiper-container') ||
      root.querySelector('.swiper') ||
      root.querySelector('[class*="swiper"]')
    );
  }

  function getSwiperInstance(swiperHost) {
    if (!swiperHost) {
      return null;
    }

    return swiperHost.swiper || swiperHost.closest('.swiper')?.swiper || null;
  }

  function hasCustomSlides(root) {
    const slides = Array.from(root.querySelectorAll('.swiper-slide'));

    if (!slides.length) {
      return false;
    }

    const realSlides = slides.filter((slide) => !slide.classList.contains('swiper-slide-duplicate'));

    return (
      realSlides.length === CUSTOM_SLIDES.length &&
      realSlides.every((slide) => slide.dataset.eliteBannerSlide)
    );
  }

  function replaceSlidesWithSwiperApi(swiperInstance) {
    if (
      !swiperInstance ||
      typeof swiperInstance.removeAllSlides !== 'function' ||
      typeof swiperInstance.appendSlide !== 'function'
    ) {
      return false;
    }

    swiperInstance.removeAllSlides();
    swiperInstance.appendSlide(CUSTOM_SLIDES.map(createSlideElement));

    if (typeof swiperInstance.update === 'function') {
      swiperInstance.update();
    }

    if (typeof swiperInstance.slideToLoop === 'function') {
      swiperInstance.slideToLoop(0, 0);
    } else if (typeof swiperInstance.slideTo === 'function') {
      swiperInstance.slideTo(0, 0);
    }

    if (typeof swiperInstance.autoplay?.start === 'function') {
      swiperInstance.autoplay.start();
    }

    return true;
  }

  function replaceSlidesWithDom(root) {
    const wrapper = root.querySelector('.swiper-wrapper');

    if (!wrapper) {
      return false;
    }

    wrapper.replaceChildren(...CUSTOM_SLIDES.map(createSlideElement));

    const swiperInstance = getSwiperInstance(getSwiperHost(root));

    if (swiperInstance && typeof swiperInstance.update === 'function') {
      swiperInstance.update();
    }

    if (swiperInstance && typeof swiperInstance.slideToLoop === 'function') {
      swiperInstance.slideToLoop(0, 0);
    } else if (swiperInstance && typeof swiperInstance.slideTo === 'function') {
      swiperInstance.slideTo(0, 0);
    }

    return true;
  }

  function syncBanner(root) {
    if (!root) {
      return false;
    }

    if (hasCustomSlides(root)) {
      updateResponsiveImages(root);
      initAdvControls(root);
      return true;
    }

    const swiperHost = getSwiperHost(root);
    const swiperInstance = getSwiperInstance(swiperHost);
    const slideCount = root.querySelectorAll('.swiper-slide').length;

    if (!swiperHost || !slideCount) {
      return false;
    }

    const replaced = replaceSlidesWithSwiperApi(swiperInstance) || replaceSlidesWithDom(root);

    if (replaced) {
      updateResponsiveImages(root);
      initAdvControls(root);
    }

    return replaced;
  }

  function run() {
    scheduled = false;
    injectStyles();

    document.querySelectorAll(BANNER_ROOT_SELECTOR).forEach((root) => {
      syncBanner(root);
    });
  }

  function scheduleRun() {
    if (scheduled) {
      return;
    }

    scheduled = true;
    window.requestAnimationFrame(run);
  }

  function observePage() {
    const observer = new MutationObserver(() => {
      scheduleRun();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  function watchResize() {
    window.addEventListener('resize', () => {
      const nextBreakpoint = getBreakpoint();

      if (nextBreakpoint === lastBreakpoint) {
        return;
      }

      lastBreakpoint = nextBreakpoint;
      scheduleRun();
    });
  }

  function init() {
    if (!document.body) {
      return;
    }

    observePage();
    watchResize();
    scheduleRun();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
