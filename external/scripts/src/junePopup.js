(() => {
  const POPUP_ATTRIBUTE = 'data-june-popup';
  const POPUP_CLASS_NAME = 'june-popup';
  const POPUP_MOBILE_ACTIVE_CLASS_NAME = 'june-popup-mobile-active';
  const POPUP_INNER_CLASS_NAME = 'june-popup-inner';
  const POPUP_HOVER_ACTIVE_CLASS_NAME = 'june-popup-inner-hover-active';
  const BADGE_CLASS_NAME = 'june-popup-badge';
  const POPUP_STYLE_ID = 'june-popup-styles';
  const MOBILE_BREAKPOINT = 768;
  const HINT_ATTRIBUTE = 'data-june-popup-hint';
  const HINT_BUBBLE_CLASS_NAME = 'june-popup-hint-bubble';
  const HINT_CLOSE_BUTTON_CLASS_NAME = 'june-popup-hint-close';
  const HOVER_CARD_CLASS_NAME = 'june-popup-hover-card';
  const HOVER_CARD_TITLE_CLASS_NAME = 'june-popup-hover-card-title';
  const HOVER_CARD_BUTTON_CLASS_NAME = 'june-popup-hover-card-button';
  const HOVER_CARD_CLOSE_BUTTON_CLASS_NAME = 'june-popup-hover-card-close';
  const BADGE_BACKGROUND_URL =
    'https://b2ccdn.sunmar.ru/content/landing-pages/june/fl_popup.gif';
  const HINT_TEXT = 'Море - это кататься <br> на крутых горках <br> в аквапарке!';
  const HOVER_CARD_BACKGROUND_URL =
    'https://b2ccdn.sunmar.ru/content/landing-pages/june/ideas_popup_big.webp';
  const LANDING_URL =
    'https://www.sunmar.ru/directclient/info-actions/na-more-letom/';
  const BADGE_WIDTH = '160px';
  const METRIKA_COUNTER_ID = 215233;
  const HOVER_SHOW_GOAL_NAME = 'june_pop_up_show';
  const ENTRY_POINT_GOAL_NAME = 'entry_point';
  const HOVER_HIDE_DELAY_MS = 120;

  function ensureStyles() {
    if (document.getElementById(POPUP_STYLE_ID)) {
      return;
    }

    const style = document.createElement('style');
    style.id = POPUP_STYLE_ID;
    style.textContent = `
      .${POPUP_CLASS_NAME} {
        position: fixed;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        z-index: 1000;
      }

      .${POPUP_INNER_CLASS_NAME} {
        position: relative;
        display: flex;
        align-items: center;
        gap: 30px;
      }

      .${BADGE_CLASS_NAME} {
        position: relative;
        width: 88px;
        height: 88px;
        flex: 0 0 auto;
        background-image: url('${BADGE_BACKGROUND_URL}');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        z-index: 2;
        cursor: pointer;
        transition:
          opacity 0.2s ease,
          visibility 0.2s ease;
      }

      .${HINT_BUBBLE_CLASS_NAME} {
        position: absolute;
        top: -50px;
        left: 20px;
        transform: translateY(-50%);
        width: ${BADGE_WIDTH};        
        padding: 8px;
        border-radius: 14px;
        background: linear-gradient(189deg, #ffffff 28.04%, #edf2ff 64.95%);
        filter: drop-shadow(0 16px 40px rgba(20, 20, 22, 0.10));
        color: #000;
        font-size: 14px;
        line-height: 1.2;
        font-weight: 400;
        transition:
          opacity 0.2s ease,
          visibility 0.2s ease;
      }

      .${HINT_BUBBLE_CLASS_NAME}::after {
        content: '';
        position: absolute;
        left: 40px;
        bottom: -8px;
        width: 0;
        height: 0;
        border-top: 12px solid #edf3ff;
        border-right: 12px solid transparent;
      }

      .${HINT_CLOSE_BUTTON_CLASS_NAME} {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 32px;
        height: 32px;
        border: 0;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 8px 22px rgba(23, 33, 61, 0.12);
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .${HOVER_CARD_CLASS_NAME} {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-100%, -50%);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition:
          transform 0.28s ease,
          opacity 0.28s ease,
          visibility 0.28s ease;
        z-index: 1;
        width: 164px;
        height: 288px;
        padding: 150px 10px 10px;
        box-sizing: border-box;
        border-radius: 12px;
        background-image: url('${HOVER_CARD_BACKGROUND_URL}');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 10px;
      }

      .${POPUP_INNER_CLASS_NAME}.${POPUP_HOVER_ACTIVE_CLASS_NAME} .${HOVER_CARD_CLASS_NAME} {
        transform: translate(0, -50%);
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }

      .${POPUP_INNER_CLASS_NAME}.${POPUP_HOVER_ACTIVE_CLASS_NAME} .${BADGE_CLASS_NAME},
      .${POPUP_INNER_CLASS_NAME}.${POPUP_HOVER_ACTIVE_CLASS_NAME} .${HINT_BUBBLE_CLASS_NAME} {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      .${HOVER_CARD_TITLE_CLASS_NAME} {
        color: #000000;
        font-size: 20px;
        line-height: 22px;
        font-weight: 700;
        text-align: center;
      }

      .${HOVER_CARD_CLOSE_BUTTON_CLASS_NAME} {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 32px;
        height: 32px;
        border: 0;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 8px 22px rgba(23, 33, 61, 0.12);
        cursor: pointer;
        padding: 0;
        display: none;
        align-items: center;
        justify-content: center;
      }

      .${HOVER_CARD_BUTTON_CLASS_NAME} {
        min-height: 40px;
        border-radius: 999px;
        background: linear-gradient(90deg, #ee2a7b 0%, #ef2b2d 100%);
        color: #ffffff;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 12px;
        line-height: 16px;
        font-weight: 600;
        padding: 14px 24px;
        
      }

      @media (max-width: ${MOBILE_BREAKPOINT - 1}px) {
        .${POPUP_CLASS_NAME}.${POPUP_MOBILE_ACTIVE_CLASS_NAME} {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #00000070;
          transform: none;
        }

        .${POPUP_INNER_CLASS_NAME} {
          position: static;
          display: block;
        }

        .${HOVER_CARD_CLASS_NAME} {
          position: relative;
          top: auto;
          right: auto;
          bottom: auto;
          left: auto;
          width: 300px;
          height: 488px;
          transform: none;
          margin: 0;
          transition:
            opacity 0.28s ease,
            visibility 0.28s ease;
        }

        .${POPUP_INNER_CLASS_NAME}.${POPUP_HOVER_ACTIVE_CLASS_NAME} .${HOVER_CARD_CLASS_NAME} {
          transform: none;
        }

        .${HOVER_CARD_CLOSE_BUTTON_CLASS_NAME} {
          display: flex;
        }
        
        .${BADGE_CLASS_NAME} {
          width: 75px;
          height: 75px;
        }
        
        .${POPUP_CLASS_NAME} {
          top: 117%;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function insertPopup() {
    if (document.querySelector(`[${POPUP_ATTRIBUTE}]`)) {
      return;
    }

    document.body.insertAdjacentHTML(
      'beforeend',
      `<div ${POPUP_ATTRIBUTE} class="${POPUP_CLASS_NAME}">
        <div class="${POPUP_INNER_CLASS_NAME}">
          <div class="${BADGE_CLASS_NAME}"></div>
          <div ${HINT_ATTRIBUTE} class="${HINT_BUBBLE_CLASS_NAME}">
            ${HINT_TEXT}
            <button
              type="button"
              class="${HINT_CLOSE_BUTTON_CLASS_NAME}"
              aria-label="Закрыть подсказку"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.9797 4.98172C5.21402 4.74741 5.59392 4.74741 5.82823 4.98172L9.59808 8.75157L13.3679 4.98172C13.6022 4.74741 13.9821 4.74741 14.2165 4.98172C14.4508 5.21604 14.4508 5.59593 14.2165 5.83025L10.4466 9.6001L14.2165 13.3699C14.4508 13.6043 14.4508 13.9842 14.2165 14.2185C13.9821 14.4528 13.6022 14.4528 13.3679 14.2185L9.59808 10.4486L5.82823 14.2185C5.59392 14.4528 5.21402 14.4528 4.9797 14.2185C4.74539 13.9842 4.74539 13.6043 4.9797 13.3699L8.74955 9.6001L4.9797 5.83025C4.74539 5.59593 4.74539 5.21604 4.9797 4.98172Z" fill="#535353"/>
              </svg>
            </button>
          </div>
          <div class="${HOVER_CARD_CLASS_NAME}">
            <button
              type="button"
              class="${HOVER_CARD_CLOSE_BUTTON_CLASS_NAME}"
              aria-label="Закрыть попап"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.9797 4.98172C5.21402 4.74741 5.59392 4.74741 5.82823 4.98172L9.59808 8.75157L13.3679 4.98172C13.6022 4.74741 13.9821 4.74741 14.2165 4.98172C14.4508 5.21604 14.4508 5.59593 14.2165 5.83025L10.4466 9.6001L14.2165 13.3699C14.4508 13.6043 14.4508 13.9842 14.2165 14.2185C13.9821 14.4528 13.6022 14.4528 13.3679 14.2185L9.59808 10.4486L5.82823 14.2185C5.59392 14.4528 5.21402 14.4528 4.9797 14.2185C4.74539 13.9842 4.74539 13.6043 4.9797 13.3699L8.74955 9.6001L4.9797 5.83025C4.74539 5.59593 4.74539 5.21604 4.9797 4.98172Z" fill="#535353"/>
              </svg>
            </button>
            <span class="${HOVER_CARD_TITLE_CLASS_NAME}">Хочу на море!</span>
            <a
              class="${HOVER_CARD_BUTTON_CLASS_NAME}"
              href="${LANDING_URL}"
              target="_blank"
              rel="noopener noreferrer"
            >Узнать больше</a>
          </div>
        </div>
      </div>`
    );
  }

  function bindHintClose() {
    const popup = document.querySelector(`[${POPUP_ATTRIBUTE}]`);
    const hint = popup?.querySelector(`[${HINT_ATTRIBUTE}]`);
    const closeButton = popup?.querySelector(`.${HINT_CLOSE_BUTTON_CLASS_NAME}`);

    if (!popup || !hint || !closeButton || closeButton.dataset.bound === 'true') {
      return;
    }

    closeButton.dataset.bound = 'true';
    closeButton.addEventListener('click', () => {
      hint.remove();
    });
  }

  function reachGoal(goalName, params) {
    if (typeof window.ym !== 'function') {
      return;
    }

    if (params) {
      window.ym(METRIKA_COUNTER_ID, 'reachGoal', goalName, params);
      return;
    }

    window.ym(METRIKA_COUNTER_ID, 'reachGoal', goalName);
  }

  function bindHoverState() {
    const popupInner = document.querySelector(`.${POPUP_INNER_CLASS_NAME}`);
    const badge = popupInner?.querySelector(`.${BADGE_CLASS_NAME}`);
    const hoverCard = popupInner?.querySelector(`.${HOVER_CARD_CLASS_NAME}`);

    if (
      !popupInner ||
      !badge ||
      !hoverCard ||
      popupInner.dataset.hoverBound === 'true'
    ) {
      return;
    }

    const isMobileViewport = () => window.innerWidth < MOBILE_BREAKPOINT;
    let hideTimeoutId = null;

    const clearHideTimeout = () => {
      if (hideTimeoutId === null) {
        return;
      }

      window.clearTimeout(hideTimeoutId);
      hideTimeoutId = null;
    };

    const activateHover = () => {
      if (isMobileViewport()) {
        return;
      }

      clearHideTimeout();

      if (!popupInner.classList.contains(POPUP_HOVER_ACTIVE_CLASS_NAME)) {
        reachGoal(HOVER_SHOW_GOAL_NAME);
      }

      popupInner.classList.add(POPUP_HOVER_ACTIVE_CLASS_NAME);
    };

    const deactivateHover = () => {
      if (isMobileViewport()) {
        return;
      }

      clearHideTimeout();
      hideTimeoutId = window.setTimeout(() => {
        popupInner.classList.remove(POPUP_HOVER_ACTIVE_CLASS_NAME);
        hideTimeoutId = null;
      }, HOVER_HIDE_DELAY_MS);
    };

    popupInner.dataset.hoverBound = 'true';
    badge.addEventListener('mouseenter', activateHover);
    badge.addEventListener('mouseleave', deactivateHover);
    hoverCard.addEventListener('mouseenter', activateHover);
    hoverCard.addEventListener('mouseleave', deactivateHover);
    popupInner.addEventListener('mouseleave', deactivateHover);
  }

  function bindMobilePopupState() {
    const popup = document.querySelector(`[${POPUP_ATTRIBUTE}]`);
    const popupInner = document.querySelector(`.${POPUP_INNER_CLASS_NAME}`);
    const badge = popupInner?.querySelector(`.${BADGE_CLASS_NAME}`);
    const hoverCard = popupInner?.querySelector(`.${HOVER_CARD_CLASS_NAME}`);
    const hoverCardCloseButton = popupInner?.querySelector(
      `.${HOVER_CARD_CLOSE_BUTTON_CLASS_NAME}`
    );

    if (
      !popup ||
      !popupInner ||
      !badge ||
      !hoverCard ||
      !hoverCardCloseButton ||
      popupInner.dataset.mobileBound === 'true'
    ) {
      return;
    }

    const isMobileViewport = () => window.innerWidth < MOBILE_BREAKPOINT;

    const openPopup = () => {
      if (!isMobileViewport()) {
        return;
      }

      if (!popupInner.classList.contains(POPUP_HOVER_ACTIVE_CLASS_NAME)) {
        reachGoal(HOVER_SHOW_GOAL_NAME);
      }

      popup.classList.add(POPUP_MOBILE_ACTIVE_CLASS_NAME);
      popupInner.classList.add(POPUP_HOVER_ACTIVE_CLASS_NAME);
    };

    const closePopup = () => {
      if (!isMobileViewport()) {
        return;
      }

      popup.classList.remove(POPUP_MOBILE_ACTIVE_CLASS_NAME);
      popupInner.classList.remove(POPUP_HOVER_ACTIVE_CLASS_NAME);
    };

    popupInner.dataset.mobileBound = 'true';
    badge.addEventListener('click', openPopup);
    hoverCardCloseButton.addEventListener('click', closePopup);
  }

  function bindHoverCardClickGoal() {
    const hoverButton = document.querySelector(`.${HOVER_CARD_BUTTON_CLASS_NAME}`);

    if (!hoverButton || hoverButton.dataset.goalBound === 'true') {
      return;
    }

    hoverButton.dataset.goalBound = 'true';
    hoverButton.addEventListener('click', () => {
      reachGoal(ENTRY_POINT_GOAL_NAME, {
        name_stock: {
          june_26: {
            name_point: 'pop_up',
          },
        },
      });
    });
  }

  function init() {
    if (!document.body) {
      return false;
    }

    ensureStyles();
    insertPopup();
    bindHintClose();
    bindHoverState();
    bindMobilePopupState();
    bindHoverCardClickGoal();
    return true;
  }

  if (init()) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (!init()) {
      return;
    }

    observer.disconnect();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
