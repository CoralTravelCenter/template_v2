async function hostReactAppReady(selector = '#__next > div', timeout = 500) {
    return new Promise(resolve => {
        const waiter = () => {
            const host_el = document.querySelector(selector);
            if (host_el?.getBoundingClientRect().height) resolve();
            else setTimeout(waiter, timeout);
        };
        waiter();
    });
}

async function waitForElement(selector, {timeout = 20000, interval = 200} = {}) {
    const start = Date.now();
    return new Promise(resolve => {
        const tick = () => {
            const el = document.querySelector(selector);
            if (el) return resolve(el);
            if (Date.now() - start > timeout) return resolve(null);
            setTimeout(tick, interval);
        };
        tick();
    });
}

hostReactAppReady().then(async () => {

    const YM_ID = 96674199;
    const reachGoal = (goal, params) => {
        try {
            if (typeof window.ym === 'function') {
                if (params !== undefined) window.ym(YM_ID, 'reachGoal', goal, params);
                else window.ym(YM_ID, 'reachGoal', goal);
            }
        } catch (e) {
        }
    };

    const COUNTRY_LINKS = {
        "Турция": "https://www.coral.ru/packagetours/moskva-to-turtsiya-tours/?qp=gEIDPqjHDS6F9wLPRxSMEtxurK3VFCGMIYsGyp2MNYTRDYlBi21%2Fb57tQ%2BvuwDi%2Ft2ruEqnO15O8DFur6%2Bz0BVzU1t2%2B3LyYxSnMY%2BYOOFCd2dR4TK54vUrNBrkcwxS%2FZsHvBt4%2BJgrLDcg4eG8nckPCctgZe3%2Fj8SY6XXbZKQHjLPwL7Mfx%2FiZXijvq6%2FP5zbiGf41u%2B16mxo0t10ksq5ChFmHwYikBW8laXTM27fN0E%2BOAbUN7sCH8Le%2Fac3nNzlrVLAQLaw6TCdzsWanGrPHvrYeg%2BAvNYFve%2FUnCKQfubCHkERXibAP2YGu6Q5svC6HXZJGVJ5IPdXrHJLTHmaidgoV0%2B7%2FrKabBaU2Ci4huVUr8zYcXneuPBA%2FUv6pf9NmuWOHWXSjp6rhi4eFzI2ESlP%2B8s4bFzx88UmnRzzUK6FPyhOvC5TwScbqjZSDXQJvuig3q5jdumZdKwanKWA%3D%3D&p=1&w=0&s=2&ws=10",
        "Египет": "https://www.coral.ru/packagetours/moskva-to-egipet-tours/?qp=gEIDPqjHDS6F9wLPRxSMEowXsR9NW5t3%2Fu3XS%2FWuwsbk14xOq3hiNgxmzdWzQZUa9Ke1vvlgBltHcASPGPm%2FnN7RqYFhJQJWDCqO9VfuRfwal9n%2FtH3HJpR5YcAW9nBMQU6WXAS4Lvs9XlDSeaCCgCPwBlOLz3pvBsKlNXlkscpReAow1Ljy%2FsAdJyjBNs8oL5IPWSBe%2FgiLJg1JhGSBi0qFOfH1Al6dzND7eP6pfxXH1SYE0qQyvMP8GtZR0dzfW3WBpUUwdg%2Fsv4iXCo6bJT3AFX63bDifY6q5iH7LRHvTCuf402hDzlj4UYtIZmgxL6Eh8ca1vPeLW7Y7%2Fwtkp3QWX1spaPGWqvRm4Weu4pUU5j0zPU%2BH2Urs6cSzg4Nj8JUt9udR%2BNotEoKujns5zr5nTmLUiA%2B6woNsZrMPlqHsQOKrAeGdIaBq%2BwSTOm5bb5Cr9%2BOfdquOvce%2FthTX%2FXmKEYqXnmgo9QDjva5GX1U%3D&p=1&w=0&s=2&ws=10",
        "Таиланд": "https://www.coral.ru/packagetours/moskva-to-tailand-tours/?qp=gEIDPqjHDS6F9wLPRxSMEowXsR9NW5t3%2Fu3XS%2FWuwsbk14xOq3hiNgxmzdWzQZUa9Ke1vvlgBltHcASPGPm%2FnN7RqYFhJQJWDCqO9VfuRfwal9n%2FtH3HJpR5YcAW9nBMgxAt8HMRgJ2C0wUFv6r%2FRQMT8ImBwYr7wxmsWUfNbe6A7F89nZd5aSTj%2BO9PqY3lAdXasihU3pABaXETd6oQxRFrWNSVuwury1ztr5BuzHQrp5AbDybpsPyXsy34ZH0iuYdM0%2FHfuyYYLn3A4NS0npLs4rtBYETuLJRVnpwEGbINdryHbb693eF4gofd%2BFd89qbw%2F%2FHArQ1ZKJAkD84mib5uvewADIDdIV21Ry0bE7952vCUtwRQ7EZH77q6KC%2FpEpKQiO%2B%2BeNW7KWlstKKp7wzymJYhN3rr1NylhRidaK57x2qsh7DdnsYvHkhrMug969QIaG1vpP8QJfHlY27g5dBr54LGJsmp5tOE5cUZW0A%3D&p=1&w=0&s=2&ws=10",
        "Мальдивы": "https://www.coral.ru/packagetours/moskva-to-malydivy-tours/?qp=gEIDPqjHDS6F9wLPRxSMEowXsR9NW5t3%2Fu3XS%2FWuwsbk14xOq3hiNgxmzdWzQZUa9Ke1vvlgBltHcASPGPm%2FnN7RqYFhJQJWDCqO9VfuRfwal9n%2FtH3HJpR5YcAW9nBMBqmDSOQmmBTu%2Ff1r%2FGAQQeSalu%2Bqa3CdGgJLKLuCYQVZoz6rjI5VJtXos3kN8ZLed465n60ky1L4ytnzqIMisV8zSPEedJtGMs405wmXjPcwLG28bR%2FGl3jD83H5uJHKpef3c7Vq5rkoxcUWlcxTqOP7AjEtZ6FDgF25XD%2Bm90He5ONjXGBPda6hBXjch20WUvE9TD9JpwBy1UtnFSQxhT5TEsdEQJ5fwVxKERuRZBqdHw81v2oi3VNhaYS8WbV3ri7Teht%2BSbUBO%2BXUJfEgSpbprBa9mCwu9n2YzHHiUghSVLf1N1pgmYQ%2Fsq9JtdDtaD7WlBqwfA77vIN9pZzAIghQgpCN7pkRUTu4s%2BTOiIQ%3D&p=1&w=0&s=2&ws=10",
        "Шри-Ланка": "https://www.coral.ru/packagetours/moskva-to-shrilanka-tours/?qp=gEIDPqjHDS6F9wLPRxSMEowXsR9NW5t3%2Fu3XS%2FWuwsbk14xOq3hiNgxmzdWzQZUa9Ke1vvlgBltHcASPGPm%2FnN7RqYFhJQJWDCqO9VfuRfwal9n%2FtH3HJpR5YcAW9nBMBmOMDjA%2BQtg7yld%2F%2F5mx4Gv%2FZEHZzOb8tiv7%2FhTBxjA4n9Rie%2F8IsLlLrRsTgdAn0Q0MUz0LbYIB%2Ff%2BYQ%2Bac0brTNUIEM1B%2BTf3sZqcyz6bcxbhwPkjcG%2F1fpJnn%2FO30rE9cL%2FCuGZv1wP2nuycQVyd6EVGtX%2FywkY2qFbd4M9rh2%2Bk8PZd%2BVFvY9rfNxrQNS0H1G8X%2BYMI%2Bc3xlID7uH3JMxT3MFJ76ydmlwmj%2Bcr%2BvBMLxnVCl17Io1ihghkOpDwpNurJhqzRAtRikigIHRq4iOEOLGXJO24MYNWyw3VqAn7MURd5Yk%2FedvyyPTps80SujOeiQQZFMeebytUnHgDlujfQ0zuMXW0NjmSxqgOA%3D&p=1&w=0&s=2&ws=10",
    };
    const ELITE_POPUP_LAST_SHOWN_KEY = 'elitePopupLastShownAt';
    const ELITE_POPUP_COOLDOWN_MS = 5 * 60 * 1000;
    const ELITE_SHIELD_VISIBLE_KEY = 'eliteShieldVisible';
    const ELITE_DISMISSED_KEY = 'eliteDismissedPermanently';

    function readStoredBoolean(key) {
        try {
            return localStorage.getItem(key) === '1' || sessionStorage.getItem(key) === '1';
        } catch (e) {
            try {
                return sessionStorage.getItem(key) === '1';
            } catch (e2) {
                return false;
            }
        }
    }

    function writeStoredBoolean(key, value) {
        try {
            if (value) {
                localStorage.setItem(key, '1');
                sessionStorage.setItem(key, '1');
            } else {
                localStorage.removeItem(key);
                sessionStorage.removeItem(key);
            }
        } catch (e) {
            try {
                if (value) {
                    sessionStorage.setItem(key, '1');
                } else {
                    sessionStorage.removeItem(key);
                }
            } catch (e2) {
            }
        }
    }

    function canAutoOpenElitePopup() {
        try {
            const lastShownAt = Number(localStorage.getItem(ELITE_POPUP_LAST_SHOWN_KEY) || 0);
            return !lastShownAt || Date.now() - lastShownAt >= ELITE_POPUP_COOLDOWN_MS;
        } catch (e) {
            return true;
        }
    }

    function markElitePopupAutoOpened() {
        try {
            localStorage.setItem(ELITE_POPUP_LAST_SHOWN_KEY, String(Date.now()));
        } catch (e) {
        }
    }

    if (!document.querySelector('style[data-elite-shield-style]')) {
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
    `;
        document.head.appendChild(shieldStyle);
    }

    if (!document.querySelector('style[data-elite-popup-style]')) {
        const style = document.createElement('style');
        style.setAttribute('data-elite-popup-style', '1');
        style.textContent = `
      .elite-popup {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #00000070;
        z-index: 1000;
        padding-inline: 16px;
      }

      .elite-popup__wrapper {
        position: relative;
        background-image: url(https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/pop-new-elite.png);
        display: flex;
        width: 948px;
        height: 444px;
        background-repeat: no-repeat;
        background-position: right;
        border-radius: 20px;
      }

      .elite-popup__info {
        display: flex;
        flex-direction: column;
        padding-inline: 42px;
        padding-block: 32px;
        background-color: #262626;
        max-width: 425px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        gap: 16px;
      }

      .elite-popup__title {
        margin: 0;
        color: white;
        font-size: 32px;
        line-height: 40px;
      }

      .elite-popup__text {
        margin: 0;
        color: white;
        font-size: 16px;
        line-height: 24px;
      }

      .elite-popup__close {
        position: absolute;
        top: 24px;
        right: 24px;
        cursor: pointer;
      }

      .elite-popup__link {
        display: flex;
        align-items: center;
        height: 48px;
        justify-content: center;
        width: 100%;
        border-radius: 12px;
        background-color: #0092D0;
        color: white;
        text-decoration: none;
        pointer-events: none;
        opacity: .6;
      }

      .elite-popup__link.is-enabled {
        pointer-events: auto;
        opacity: 1;
      }

      .elite-popup__back {
        display: flex;
        align-items: center;
        height: 48px;
        justify-content: center;
        width: 100%;
        color: white;
        text-decoration: none;
        opacity: .9;
      }

      .elite-popup__back:hover { opacity: 1; }

      /* ===== custom dropdown ===== */
      .elite-dd { position: relative; }
      
      .elite-dd.elite-dd--up .elite-dd__panel {
          top: auto;
          bottom: calc(100% + 8px);
        }

      .elite-dd__btn{
        width: 100%;
        height: 48px;
        border-radius: 12px;
        border: 1px solid #444;
        background: #1f1f1f;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 14px 0 16px;
        cursor: pointer;
        outline: none;
      }

      .elite-dd__btn:focus{
        border-color: #0092D0;
        box-shadow: 0 0 0 3px rgba(0,146,208,.25);
      }

      .elite-dd__value{
        font-size: 16px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .elite-dd__chevron{
        width: 18px;
        height: 18px;
        flex: 0 0 18px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 14px;
        transition: transform .15s ease;
        background-image: url("data:image/svg+xml,%3Csvg width='14' height='9' viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7L13 1' stroke='white' stroke-width='2'/%3E%3C/svg%3E");
      }

      .elite-dd.is-open .elite-dd__chevron{ transform: rotate(180deg); }

      .elite-dd__panel{
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        right: 0;
        background: #1f1f1f;
        border: 1px solid #444;
        border-radius: 12px;
        overflow: hidden;
        z-index: 5;
        max-height: 220px;
      }

      .elite-dd__list{
        list-style: none;
        margin: 0;
        padding: 6px;
        outline: none;
        overflow: auto;
        max-height: 220px;
      }

      .elite-dd__item{
        padding: 10px 10px;
        border-radius: 10px;
        cursor: pointer;
        color: #fff;
      }

      .elite-dd__item:hover,
      .elite-dd__item.is-active{
        background: rgba(0,146,208,.18);
      }

      .elite-dd__item[aria-selected="true"]{
        background: rgba(0,146,208,.28);
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
        
        .elite-popup__wrapper {
          height: 673px;
          width: 100%;
          max-width: 396px;
          align-items: flex-end;
          background-position: -100px top;
          background-size: 500px;
        }

        .elite-popup__info {
          padding: 16px;
          border-top-left-radius: 0;
          border-bottom-right-radius: 20px;
        }

        .elite-popup__title,
        .elite-popup__text {
          text-align: center;
        }
      }
    `;
        document.head.appendChild(style);
    }

    function trackPopupClose() {
        reachGoal('personalization_elite_pop_up_click', {
            button: 'close',
            country: 'not selected',
        });
    }

    function openElitePopup({isAutoOpen = false} = {}) {
        if (document.querySelector('[data-elite-popup]')) return;

        document.body.insertAdjacentHTML('beforeend', `
      <div class="elite-popup" data-elite-popup>
        <div class="elite-popup__wrapper" role="dialog" aria-modal="true">
          <div class="elite-popup__close" data-elite-popup-close role="button" tabindex="0" aria-label="Закрыть">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M24.3535 0.353516L0.353516 24.3535" stroke="white"/>
              <path d="M0.353515 0.353516L24.3535 24.3535" stroke="white"/>
            </svg>
          </div>

          <div class="elite-popup__info">
            <h3 class="elite-popup__title">Ищите <br>что-то особенное?</h3>

            <p class="elite-popup__text">
              Выберите куда хотите отправиться, и&nbsp;смотрите специальную подборку премиальных отелей
            </p>

            <div class="elite-dd" data-elite-dd>
              <button type="button" class="elite-dd__btn" data-elite-dd-btn aria-haspopup="listbox" aria-expanded="false">
                <span class="elite-dd__value" data-elite-dd-value>Выберите страну</span>
                <span class="elite-dd__chevron" aria-hidden="true"></span>
              </button>

              <div class="elite-dd__panel" data-elite-dd-panel hidden>
                <ul class="elite-dd__list" data-elite-dd-list role="listbox" tabindex="-1">
                  <li class="elite-dd__item" role="option" data-value="Турция" aria-selected="false">Турция</li>
                  <li class="elite-dd__item" role="option" data-value="Египет" aria-selected="false">Египет</li>
                  <li class="elite-dd__item" role="option" data-value="Таиланд" aria-selected="false">Таиланд</li>
                  <li class="elite-dd__item" role="option" data-value="Мальдивы" aria-selected="false">Мальдивы</li>
                  <li class="elite-dd__item" role="option" data-value="Шри-Ланка" aria-selected="false">Шри-Ланка</li>
                </ul>
              </div>
            </div>

            <a href="#" class="elite-popup__link" data-elite-popup-link aria-disabled="true">
              Посмотреть подборку
            </a>

            <a href="#" class="elite-popup__back" data-elite-popup-back>
              Нет, спасибо
            </a>
          </div>
        </div>
      </div>
    `);

        if (isAutoOpen) {
            reachGoal('personalization_elite_pop_up_show');
        }

        const root = document.querySelector('[data-elite-popup]');
        const closeBtn = root?.querySelector('[data-elite-popup-close]');
        const backBtn = root?.querySelector('[data-elite-popup-back]');
        const link = root?.querySelector('[data-elite-popup-link]');

        const dd = root?.querySelector('[data-elite-dd]');
        const btn = dd?.querySelector('[data-elite-dd-btn]');
        const panel = dd?.querySelector('[data-elite-dd-panel]');
        const list = dd?.querySelector('[data-elite-dd-list]');
        const valueEl = dd?.querySelector('[data-elite-dd-value]');
        const items = Array.from(dd?.querySelectorAll('.elite-dd__item') || []);

        if (!root || !dd || !btn || !panel || !list || !valueEl || !link || items.length === 0) return;

        let selectedValue = "";
        let activeIndex = -1;

        const closePopup = () => {
            document.removeEventListener('mousedown', onDocMouseDown, true);
            document.removeEventListener('keydown', onDocKeyDown, true);
            root.remove();
        };

        const closePopupAndShowShield = () => {
            trackPopupClose();
            setEliteDismissedPermanently(false);
            setShouldShowShield(true);
            closePopup();
            ensureShields();
        };

        const dismissElitePermanently = () => {
            setEliteDismissedPermanently(true);
            setShouldShowShield(false);
            closePopup();
            removeShields();
        };

        const setLinkByCountry = (country) => {
            const href = COUNTRY_LINKS[country];
            if (href) {
                link.setAttribute('href', href);
                link.classList.add('is-enabled');
                link.setAttribute('aria-disabled', 'false');
            } else {
                link.setAttribute('href', '#');
                link.classList.remove('is-enabled');
                link.setAttribute('aria-disabled', 'true');
            }
        };

        const setSelected = (country) => {
            selectedValue = country || "";
            valueEl.textContent = country || "Выберите страну";

            items.forEach((el) => {
                const isSel = el.getAttribute('data-value') === country;
                el.setAttribute('aria-selected', String(isSel));
            });

            setLinkByCountry(country);
        };

        const setActive = (idx) => {
            items.forEach(i => i.classList.remove('is-active'));
            const el = items[idx];
            if (!el) return;
            el.classList.add('is-active');
            el.scrollIntoView({block: 'nearest'});
        };

        const updateDdDirection = () => {
            const estimatedPanelHeight = Math.min(220, items.length * 44 + 12);
            const rect = dd.getBoundingClientRect();

            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            const shouldOpenUp = spaceBelow < estimatedPanelHeight && spaceAbove > spaceBelow;

            dd.classList.toggle('elite-dd--up', shouldOpenUp);
        };

        const openDd = () => {
            updateDdDirection();
            dd.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
            panel.hidden = false;

            activeIndex = items.findIndex(i => i.getAttribute('data-value') === selectedValue);
            if (activeIndex < 0) activeIndex = 0;
            setActive(activeIndex);

            list.focus();
        };

        const closeDd = () => {
            dd.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
            panel.hidden = true;
            activeIndex = -1;
        };

        const toggleDd = () => (dd.classList.contains('is-open') ? closeDd() : openDd());

        setSelected("");

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDd();
        });

        items.forEach((el, idx) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                setSelected(el.getAttribute('data-value') || "");
                closeDd();
                btn.focus();
            });

            el.addEventListener('mousemove', () => {
                activeIndex = idx;
                setActive(activeIndex);
            });
        });

        link.addEventListener('click', (e) => {
            const countryForMetric = selectedValue ? selectedValue : 'not selected';

            if (!link.classList.contains('is-enabled')) {
                e.preventDefault();
                return;
            }

            try {
                const nextUrl = new URL(link.href, window.location.origin);
                nextUrl.searchParams.set('elite', '1');
                link.href = nextUrl.toString();
            } catch (error) {
            }

            setEliteDismissedPermanently(false);
            setShouldShowShield(true);

            reachGoal('personalization_elite_pop_up_click', {
                button: 'view_hotels',
                country: countryForMetric,
            });

            mindbox("async", {
                operation: "popupEliteCountry",
                data: {
                    customerAction: {
                        customFields: {
                            eliteDirection: selectedValue
                        }
                    }
                }
            });
        });

        backBtn?.addEventListener('click', (e) => {
            e.preventDefault();

            reachGoal('personalization_elite_pop_up_click', {
                button: 'no',
                country: selectedValue ? selectedValue : 'not selected',
            });

            backBtn.setAttribute('aria-disabled', 'true');
            backBtn.style.pointerEvents = 'none';
            backBtn.style.opacity = '0.6';

            mindbox("async", {
                operation: "eliteOutNotRegistered",
                onSuccess: function () {
                    dismissElitePermanently();
                },
                onError: function (error) {
                    try {
                        console.error("eliteOutNotRegistered error", error);
                    } catch (e) {
                    }
                    dismissElitePermanently();
                }
            });
        });

        closeBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            closePopupAndShowShield();
        });

        closeBtn?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closePopupAndShowShield();
            }
        });

        root.addEventListener('click', (e) => {
            if (e.target === root) closePopupAndShowShield();
        });

        const onDocMouseDown = (e) => {
            if (!dd.contains(e.target)) closeDd();
        };

        const onDocKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                closePopupAndShowShield();
                return;
            }

            const isOpen = dd.classList.contains('is-open');
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIndex = Math.min(items.length - 1, activeIndex + 1);
                setActive(activeIndex);
                return;
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIndex = Math.max(0, activeIndex - 1);
                setActive(activeIndex);
                return;
            }

            if (e.key === 'Enter') {
                e.preventDefault();
                const el = items[activeIndex];
                if (el) {
                    setSelected(el.getAttribute('data-value') || "");
                    closeDd();
                    btn.focus();
                }
                return;
            }

            if (e.key === 'Tab') closeDd();
        };

        document.addEventListener('mousedown', onDocMouseDown, true);
        document.addEventListener('keydown', onDocKeyDown, true);
    }

    const SHIELD_SVG = `<img src="https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/diamond.gif" alt="">`;

    const DESKTOP_CONTAINER_SELECTOR = '[class*=HeaderTopBar_iconContainer]';
    const MOBILE_CONTAINER_SELECTOR = '[class*=HeaderMobile_rightGroup]';

    let eliteSegmentGoalSent = false;
    let shouldShowShield = readStoredBoolean(ELITE_SHIELD_VISIBLE_KEY);
    let eliteDismissedPermanently = readStoredBoolean(ELITE_DISMISSED_KEY);
    let eliteUserName = "";
    let isSyncingShields = false;

    function syncShieldStateFromStorage() {
        shouldShowShield = readStoredBoolean(ELITE_SHIELD_VISIBLE_KEY);
        eliteDismissedPermanently = readStoredBoolean(ELITE_DISMISSED_KEY);
    }

    function setShouldShowShield(value) {
        shouldShowShield = value;
        writeStoredBoolean(ELITE_SHIELD_VISIBLE_KEY, value);
    }

    function setEliteDismissedPermanently(value) {
        eliteDismissedPermanently = value;
        writeStoredBoolean(ELITE_DISMISSED_KEY, value);
    }

    function subscribeToSpaUrlChanges(callback) {
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function (...args) {
            originalPushState.apply(this, args);
            callback(window.location.href);
        };

        history.replaceState = function (...args) {
            originalReplaceState.apply(this, args);
            callback(window.location.href);
        };

        window.addEventListener('popstate', () => callback(window.location.href));
    }

    function removeShields() {
        document.querySelectorAll('.elite-shield[data-elite-shield]').forEach((shield) => shield.remove());
    }

    function applyUserNameToShield() {
        const greetingEl = document.querySelector('#elite_greeting_text');
        const userNameEl = document.querySelector('#elite_user_name');

        if (!greetingEl || !userNameEl) return;

        if (eliteUserName) {
            if (greetingEl.textContent !== 'Добро пожаловать,') {
                greetingEl.textContent = 'Добро пожаловать,';
            }
            if (userNameEl.textContent !== eliteUserName) {
                userNameEl.textContent = eliteUserName;
            }
        } else {
            if (greetingEl.textContent !== 'Добро пожаловать') {
                greetingEl.textContent = 'Добро пожаловать';
            }
            if (userNameEl.textContent !== '') {
                userNameEl.textContent = '';
            }
        }
    }

    function bindShield(shieldEl) {
        if (!shieldEl) return;
        if (shieldEl.dataset.eliteBound === '1') return;
        shieldEl.dataset.eliteBound = '1';

        shieldEl.addEventListener('click', (e) => {
            e.preventDefault();
            reachGoal('personalization_elite_pop_up_click_to_show');
            openElitePopup();
        });

        shieldEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                reachGoal('personalization_elite_pop_up_click_to_show');
                openElitePopup();
            }
        });
    }

    function ensureShields() {
        if (isSyncingShields) return;
        isSyncingShields = true;

        try {
            syncShieldStateFromStorage();

            if (eliteDismissedPermanently) {
                removeShields();
                return;
            }

            if (!shouldShowShield) {
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
                reachGoal('personalization_elite_segment');
            }
        } finally {
            isSyncingShields = false;
        }
    }

    ensureShields();
    waitForElement(DESKTOP_CONTAINER_SELECTOR, {timeout: 20000, interval: 200}).then(() => ensureShields());
    waitForElement(MOBILE_CONTAINER_SELECTOR, {timeout: 20000, interval: 200}).then(() => ensureShields());

    if (!eliteDismissedPermanently && canAutoOpenElitePopup()) {
        markElitePopupAutoOpened();
        openElitePopup({isAutoOpen: true});
    }

    const obs = new MutationObserver((mutations) => {
        if (isSyncingShields) return;

        const hasExternalChanges = mutations.some((mutation) => {
            const nodes = [...mutation.addedNodes, ...mutation.removedNodes];

            return nodes.some((node) => {
                if (!(node instanceof Element)) return false;
                return !node.closest('.elite-shield') && !node.closest('[data-elite-popup]');
            });
        });

        if (!hasExternalChanges) return;
        ensureShields();
    });
    obs.observe(document.body, {childList: true, subtree: true});
    subscribeToSpaUrlChanges(() => {
        syncShieldStateFromStorage();
        ensureShields();
    });

    mindbox("sync", {
        operation: "getUserName",
        onSuccess: function (response) {
            eliteUserName = response.customer.firstName?.trim() || "";
            applyUserNameToShield();
        },
        onValidationError: function (messages) {
        },
        onError: function (error) {
        }
    });
});


(function () {
    'use strict';

    const SEARCH_ENCRYPT_PATHS = [
        "/endpoints/PackageTourHotelProduct/PriceSearchEncrypt",
        "/endpoints/OnlyHotelProduct/PriceSearchEncrypt",
    ];
    const ELITE_FILTER_TYPES = new Set([3, 21]);
    const ELITE_FILTERS = [
        {type: 3, values: [{id: "1", value: "1"}], providers: []},
        {type: 21, values: [{id: "2", value: "2"}], providers: []},
    ];
    const ELITE_CHAIN_KEY = 'eliteSearchActive';
    const ELITE_SHIELD_VISIBLE_KEY = 'eliteShieldVisible';
    const ELITE_DISMISSED_KEY = 'eliteDismissedPermanently';
    const ELITE_URL_PARAM = 'elite';

    const parseJson = (value) => {
        if (typeof value !== "string" || !value.trim()) return null;

        try {
            return JSON.parse(value);
        } catch {
            return null;
        }
    };

    const logPayloadRewrite = (before, after) => {
        console.group("[elite-search-magic] encrypt");
        console.log("Перехваченный payload:", before);
        console.log("Payload после подмены:", after);
        console.groupEnd();
    };

    const isSearchEncryptUrl = (url) => {
        try {
            return SEARCH_ENCRYPT_PATHS.includes(new URL(url, location.origin).pathname);
        } catch {
            return typeof url === "string" && SEARCH_ENCRYPT_PATHS.some((path) => url.includes(path));
        }
    };

    const isSearchPage = (url = window.location.href) => {
        try {
            const pathname = new URL(url, window.location.origin).pathname.toLowerCase();
            return pathname.startsWith('/packagetours/') || pathname.startsWith('/onlyhotel/');
        } catch {
            return false;
        }
    };

    const isEliteChainActive = () => {
        try {
            return sessionStorage.getItem(ELITE_CHAIN_KEY) === '1';
        } catch {
            return false;
        }
    };

    const setEliteChainActive = (value) => {
        try {
            if (value) {
                sessionStorage.setItem(ELITE_CHAIN_KEY, '1');
            } else {
                sessionStorage.removeItem(ELITE_CHAIN_KEY);
            }
        } catch {
        }
    };

    const activateEliteChainFromUrl = () => {
        let url;

        try {
            url = new URL(window.location.href);
        } catch {
            return;
        }

        if (!isSearchPage(url.toString())) return;
        if (url.searchParams.get(ELITE_URL_PARAM) !== '1') return;

        setEliteChainActive(true);
        try {
            localStorage.setItem(ELITE_SHIELD_VISIBLE_KEY, '1');
            sessionStorage.setItem(ELITE_SHIELD_VISIBLE_KEY, '1');
            localStorage.removeItem(ELITE_DISMISSED_KEY);
            sessionStorage.removeItem(ELITE_DISMISSED_KEY);
        } catch (e) {
        }
        url.searchParams.delete(ELITE_URL_PARAM);
        history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
    };

    const clearEliteChainIfOutsideSearch = (url = window.location.href) => {
        if (!isSearchPage(url)) {
            setEliteChainActive(false);
        }
    };

    const syncEliteChainState = (url = window.location.href) => {
        if (isSearchPage(url)) {
            activateEliteChainFromUrl();
            return;
        }

        clearEliteChainIfOutsideSearch(url);
    };

    const withEliteFilters = (payload) => {
        const parsedPayload = parseJson(payload);
        if (!parsedPayload) return payload;

        const existingFilters = Array.isArray(parsedPayload.additionalFilters) ? parsedPayload.additionalFilters : [];
        const nextFilters = existingFilters.filter((filter) => !ELITE_FILTER_TYPES.has(Number(filter?.type)));
        const nextPayload = {
            ...parsedPayload,
            additionalFilters: [...nextFilters, ...ELITE_FILTERS],
        };

        logPayloadRewrite(parsedPayload, nextPayload);

        return JSON.stringify(nextPayload);
    };

    const subscribeToUrlChanges = (callback) => {
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function (...args) {
            originalPushState.apply(this, args);
            callback(window.location.href);
        };

        history.replaceState = function (...args) {
            originalReplaceState.apply(this, args);
            callback(window.location.href);
        };

        window.addEventListener('popstate', () => callback(window.location.href));
    };

    const installEliteSearchInterceptor = () => {
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function (method, url, ...args) {
            this.__eliteSearchMagic = {
                matched: typeof url === "string" && isSearchEncryptUrl(url),
            };

            return originalOpen.call(this, method, url, ...args);
        };

        XMLHttpRequest.prototype.send = function (body) {
            const requestMeta = this.__eliteSearchMagic;
            const shouldRewrite = requestMeta?.matched && isEliteChainActive() && isSearchPage();

            if (shouldRewrite && typeof body === "string") {
                body = withEliteFilters(body);
            }

            return originalSend.call(this, body);
        };
    };

    syncEliteChainState();
    subscribeToUrlChanges(syncEliteChainState);
    installEliteSearchInterceptor();

})();
