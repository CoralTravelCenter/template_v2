(() => {
  const DESKTOP_BREAKPOINT = 992;
  const DESKTOP_CONTAINER_SELECTOR =
    '[class*="HeaderMenuNonProductSearch_nonProductSearchContainer"]';
  const DESKTOP_SEARCH_PANEL_SELECTOR =
    '[class*="HeaderMenuNonProductSearchContent_nonProductSearchContainer"]';
  const MOBILE_CONTAINER_SELECTOR = '[class*="HeaderMobile_rightGroup"]';
  const DESKTOP_BLOCK_ATTRIBUTE = 'data-flamingo-desktop-block';
  const DESKTOP_BLOCK_CLASS_NAME = 'flamingo-block';
  const MOBILE_BLOCK_ATTRIBUTE = 'data-flamingo-mobile-block';
  const LANDING_URL = 'https://www.sunmar.ru/directclient/info-actions/na-more-letom/';
  const DESKTOP_BACKGROUND_URL = 'https://b2ccdn.sunmar.ru/content/landing-pages/june/fl_desktop.gif';
  const MOBILE_BACKGROUND_URL = 'https://b2ccdn.sunmar.ru/content/landing-pages/june/fl_mobile.gif';
  const METRIKA_COUNTER_ID = 215233;
  const ENTRY_POINT_GOAL_NAME = 'entry_point';
  let resizeObserver = null;

  function ensureStyles() {
    if (document.getElementById('flamingo-block-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'flamingo-block-styles';
    style.textContent = `
      .${DESKTOP_BLOCK_CLASS_NAME} {
        margin-left: auto;
        margin-right: 16px;
        width: 171px;
        height: 40px;
        padding-left: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        background-image: url('${DESKTOP_BACKGROUND_URL}');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        color: #ffffff;
        text-decoration: none;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        border-radius: 16px;
        overflow: hidden;
        transition: margin-right 0.2s ease;
      }
    `;

    document.head.appendChild(style);
  }

  function insertDesktopBlock(target) {
    if (!target) {
      return false;
    }

    if (
      target.previousElementSibling?.hasAttribute(DESKTOP_BLOCK_ATTRIBUTE) ||
      document.querySelector(`[${DESKTOP_BLOCK_ATTRIBUTE}]`)
    ) {
      return true;
    }

    target.insertAdjacentHTML(
      'beforebegin',
      `<a
        ${DESKTOP_BLOCK_ATTRIBUTE}
        href="${LANDING_URL}"
        target="_blank"
        class="${DESKTOP_BLOCK_CLASS_NAME}"
      >Хочу на море!</a>`
    );

    return true;
  }

  function insertMobileBlock(target) {
    if (!target) {
      return false;
    }

    if (
      target.previousElementSibling?.hasAttribute(MOBILE_BLOCK_ATTRIBUTE) ||
      document.querySelector(`[${MOBILE_BLOCK_ATTRIBUTE}]`)
    ) {
      return true;
    }

    target.insertAdjacentHTML(
      'afterbegin',
      `<a
        ${MOBILE_BLOCK_ATTRIBUTE}
        href="${LANDING_URL}"
        target="_blank"
        style="
          width: 40px;
          height: 40px;
          display: block;
          background-image: url('${MOBILE_BACKGROUND_URL}');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          text-decoration: none;
          flex-shrink: 0;
        "
      ></a>`
    );

    return true;
  }

  function updateDesktopBlockOffset() {
    const desktopContainer = document.querySelector(DESKTOP_CONTAINER_SELECTOR);
    const desktopBlock = document.querySelector(`[${DESKTOP_BLOCK_ATTRIBUTE}]`);

    if (!desktopContainer || !desktopBlock) {
      return;
    }

    const searchPanel = desktopContainer.querySelector(DESKTOP_SEARCH_PANEL_SELECTOR);
    if (!searchPanel) {
      desktopBlock.style.marginRight = '';
      return;
    }

    const offset = Math.max(searchPanel.getBoundingClientRect().width - 40, 0);
    desktopBlock.style.marginRight = `${offset + 16}px`;
  }

  function observeDesktopSearchPanelSize() {
    const desktopContainer = document.querySelector(DESKTOP_CONTAINER_SELECTOR);
    const searchPanel = desktopContainer?.querySelector(DESKTOP_SEARCH_PANEL_SELECTOR);

    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }

    if (!searchPanel || typeof ResizeObserver === 'undefined') {
      return;
    }

    resizeObserver = new ResizeObserver(() => {
      updateDesktopBlockOffset();
    });

    resizeObserver.observe(searchPanel);
  }

  function reachGoal(namePoint) {
    if (typeof window.ym !== 'function') {
      return;
    }

    window.ym(METRIKA_COUNTER_ID, 'reachGoal', ENTRY_POINT_GOAL_NAME, {
      name_stock: {
        june_26: {
          name_point: namePoint,
        },
      },
    });
  }

  function bindDesktopClickGoal() {
    const desktopLink = document.querySelector(`[${DESKTOP_BLOCK_ATTRIBUTE}]`);

    if (!desktopLink || desktopLink.dataset.goalBound === 'true') {
      return;
    }

    desktopLink.dataset.goalBound = 'true';
    desktopLink.addEventListener('click', () => {
      reachGoal('PC');
    });
  }

  function bindMobileClickGoal() {
    const mobileLink = document.querySelector(`[${MOBILE_BLOCK_ATTRIBUTE}]`);

    if (!mobileLink || mobileLink.dataset.goalBound === 'true') {
      return;
    }

    mobileLink.dataset.goalBound = 'true';
    mobileLink.addEventListener('click', () => {
      reachGoal('mobile');
    });
  }

  function syncDesktopUi() {
    ensureStyles();

    const desktopContainer = document.querySelector(DESKTOP_CONTAINER_SELECTOR);
    if (!insertDesktopBlock(desktopContainer)) {
      return false;
    }

    updateDesktopBlockOffset();
    observeDesktopSearchPanelSize();
    bindDesktopClickGoal();
    return true;
  }

  function initDesktop() {
    if (syncDesktopUi()) {
      const desktopObserver = new MutationObserver(() => {
        syncDesktopUi();
      });

      desktopObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
      });

      return;
    }

    const desktopBootstrapObserver = new MutationObserver(() => {
      if (!syncDesktopUi()) {
        return;
      }

      desktopBootstrapObserver.disconnect();

      const desktopObserver = new MutationObserver(() => {
        syncDesktopUi();
      });

      desktopObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    });

    desktopBootstrapObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  function initMobile() {
    const mobileContainer = document.querySelector(MOBILE_CONTAINER_SELECTOR);
    if (insertMobileBlock(mobileContainer)) {
      bindMobileClickGoal();
      return;
    }

    const mobileObserver = new MutationObserver(() => {
      const nextMobileContainer = document.querySelector(MOBILE_CONTAINER_SELECTOR);
      if (!insertMobileBlock(nextMobileContainer)) {
        return;
      }

      bindMobileClickGoal();
      mobileObserver.disconnect();
    });

    mobileObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  if (window.innerWidth > DESKTOP_BREAKPOINT) {
    initDesktop();
    return;
  }

  initMobile();
})();
