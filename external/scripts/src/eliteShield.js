(function () {
    'use strict';

    const SHIELD_SVG = `<img src="https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/diamond.gif" alt="">`;
    const DESKTOP_CONTAINER_SELECTOR = '[class*=HeaderTopBar_iconContainer]';
    const MOBILE_CONTAINER_SELECTOR = '[class*=HeaderMobile_rightGroup]';

    function ensureShieldStyles() {
        if (document.querySelector('style[data-elite-shield-style]')) return;

        const shieldStyle = document.createElement('style');
        shieldStyle.setAttribute('data-elite-shield-style', '1');
        shieldStyle.textContent = `
      .elite-shield {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        user-select: none;
        background-color: #262626;
        height: 48px;
        padding: 6px;
        border-radius: 40px;
      }
      .elite-shield__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .elite-shield__icon img{
        display:block;
        height:35px;
        width:auto;
        border-radius: 50%;
      }

      .elite-shield__name {
        display: flex;
        flex-direction: column;
        font-size: 11px;
        font-weight: 600;
        color: white;
      }

      @media (max-width: 991.98px) {
        .elite-shield--desktop { display: none !important; }
      }
      @media (min-width: 992px) {
        .elite-shield--mobile { display: none !important; }
      }

      @media screen and (max-width: 992px) {
        .elite-shield {
          height: 36px;
          width: 36px;
          margin-right: 6px;
          padding: 0;
        }
      }

      @media screen and (max-width: 768px) {
        .elite-shield {
          margin-right: 0;
        }
      }
    `;
        document.head.appendChild(shieldStyle);
    }

    window.createEliteShieldController = function createEliteShieldController({state, analytics, openPopup, waitForElement}) {
        ensureShieldStyles();

        let eliteSegmentGoalSent = false;
        let isSyncingShields = false;
        let observer = null;

        function removeShields() {
            document.querySelectorAll('.elite-shield[data-elite-shield]').forEach((shield) => shield.remove());
        }

        function applyUserNameToShield() {
            const greetingEl = document.querySelector('#elite_greeting_text');
            const userNameEl = document.querySelector('#elite_user_name');
            if (!greetingEl || !userNameEl) return;

            const eliteUserName = state.getEliteUserName();
            if (eliteUserName) {
                greetingEl.textContent = 'Добро пожаловать,';
                userNameEl.textContent = eliteUserName;
            } else {
                greetingEl.textContent = 'Добро пожаловать';
                userNameEl.textContent = '';
            }
        }

        function bindShield(shieldEl) {
            if (!shieldEl || shieldEl.dataset.eliteBound === '1') return;
            shieldEl.dataset.eliteBound = '1';

            const handleOpen = (e) => {
                e.preventDefault();
                analytics.reachGoal('personalization_elite_pop_up_click_to_show');
                openPopup();
            };

            shieldEl.addEventListener('click', handleOpen);
            shieldEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOpen(e);
            });
        }

        function ensureShields() {
            if (isSyncingShields) return;
            isSyncingShields = true;

            try {
                if (state.isEliteDismissedPermanently()) {
                    removeShields();
                    return;
                }

                if (!state.isShieldVisible()) {
                    removeShields();
                    return;
                }

                const desktopContainer = document.querySelector(DESKTOP_CONTAINER_SELECTOR);
                if (desktopContainer && !desktopContainer.querySelector('.elite-shield[data-elite-shield="desktop"]')) {
                    desktopContainer.insertAdjacentHTML('beforeend', `
        <div class="elite-shield elite-shield--desktop" data-elite-shield="desktop" role="button" tabindex="0" aria-label="Открыть Elite подборку">
          <div class="elite-shield__icon">${SHIELD_SVG}</div>
          <div class="elite-shield__name">
            <span id="elite_greeting_text">Добро пожаловать</span>
            <span id="elite_user_name"></span>
          </div>
        </div>
      `);
                }

                const mobileContainer = document.querySelector(MOBILE_CONTAINER_SELECTOR);
                if (mobileContainer && !mobileContainer.querySelector('.elite-shield[data-elite-shield="mobile"]')) {
                    mobileContainer.insertAdjacentHTML('beforeend', `
        <div class="elite-shield elite-shield--mobile" data-elite-shield="mobile" role="button" tabindex="0" aria-label="Открыть Elite подборку">
          <div class="elite-shield__icon">${SHIELD_SVG}</div>
        </div>
      `);
                }

                const desktopShield = document.querySelector('.elite-shield[data-elite-shield="desktop"]');
                const mobileShield = document.querySelector('.elite-shield[data-elite-shield="mobile"]');

                bindShield(desktopShield);
                bindShield(mobileShield);
                applyUserNameToShield();

                if (!eliteSegmentGoalSent && (desktopShield || mobileShield)) {
                    eliteSegmentGoalSent = true;
                    analytics.reachGoal('personalization_elite_segment');
                }
            } finally {
                isSyncingShields = false;
            }
        }

        function startObserver() {
            if (observer) return;
            observer = new MutationObserver((mutations) => {
                if (isSyncingShields) return;

                const hasExternalChanges = mutations.some((mutation) => {
                    const nodes = [...mutation.addedNodes, ...mutation.removedNodes];
                    return nodes.some((node) => {
                        if (!(node instanceof Element)) return false;
                        return !node.closest('.elite-shield') && !node.closest('[data-elite-popup]');
                    });
                });

                if (hasExternalChanges) ensureShields();
            });

            observer.observe(document.body, {childList: true, subtree: true});
        }

        state.subscribe(ensureShields);

        return {
            async init() {
                await Promise.all([
                    waitForElement(DESKTOP_CONTAINER_SELECTOR, {timeout: 20000, interval: 200}),
                    waitForElement(MOBILE_CONTAINER_SELECTOR, {timeout: 20000, interval: 200}),
                ]);

                ensureShields();
                startObserver();
            },
            ensureShields,
            removeShields,
        };
    };
})();
