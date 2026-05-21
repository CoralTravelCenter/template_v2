(() => {
  const BANNER_ROOT_SELECTOR = '[class*="BannerMainBanner_bannerMainBanner"]';
  const STYLE_ID = 'elite-main-page-banner-styles';
  const CUSTOM_SLIDES = [
    {
      id: 'elite-egypt',
      alt: 'Elite Service Egypt',
      href: 'https://www.coral.ru/',
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
    {
      id: 'elite-turkey',
      alt: 'Elite Service Turkey',
      href: 'https://www.coral.ru/',
      title: 'Премиальный уровень комфорта в Турции',
      description: 'Выбирайте отдых, продуманный до мелочей',
      buttonText: 'Выбрать тур',
      desktop:
        'https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/main-page/turkey_1440.webp',
      tablet:
        'https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/main-page/turkey_992.webp',
      mobile:
        'https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/main-page/turkey_768.webp',
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
        width: 100%;
        height: 100%;
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
        padding: 72px;
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
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-button:active {
        transform: translateY(0);
      }

      ${BANNER_ROOT_SELECTOR} .elite-main-banner-slide[data-elite-banner-slide="elite-turkey"] .elite-main-banner-button {
        background: #1296db;
        color: #fff !important;
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
          gap: 16px;
          padding: 40px 24px;
          justify-content: flex-end;
        }

        ${BANNER_ROOT_SELECTOR} .elite-main-banner-title {
          max-width: 100%;
          font-size: 42px;
        }

        ${BANNER_ROOT_SELECTOR} .elite-main-banner-description {
          max-width: 100%;
          font-size: 22px;
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

  function createSlideMarkup(slide) {
    const href = slide.href || 'javascript:void(0)';

    return `
      <div class="elite-main-banner-card">
        <picture class="elite-main-banner-picture">
          <source media="(max-width: 768px)" srcset="${escapeHtml(slide.mobile)}">
          <source media="(max-width: 992px)" srcset="${escapeHtml(slide.tablet)}">
          <img
            src="${escapeHtml(slide.desktop)}"
            alt="${escapeHtml(slide.alt)}"
            loading="eager"
            fetchpriority="high"
          >
        </picture>
        <div class="elite-main-banner-content">
          <h2 class="elite-main-banner-title">${escapeHtml(slide.title || '')}</h2>
          <p class="elite-main-banner-description">${escapeHtml(slide.description || '')}</p>
          <a class="elite-main-banner-link elite-main-banner-button" href="${escapeHtml(href)}" aria-label="${escapeHtml(slide.buttonText || slide.alt)}">
            ${escapeHtml(slide.buttonText || 'Подробнее')}
          </a>
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
    if (!root || hasCustomSlides(root)) {
      return false;
    }

    const swiperHost = getSwiperHost(root);
    const swiperInstance = getSwiperInstance(swiperHost);
    const slideCount = root.querySelectorAll('.swiper-slide').length;

    if (!swiperHost || !slideCount) {
      return false;
    }

    return replaceSlidesWithSwiperApi(swiperInstance) || replaceSlidesWithDom(root);
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
