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

async function waitForElement(selector, { timeout = 20000, interval = 200 } = {}) {
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
        } catch (e) {}
    };

    const COUNTRY_LINKS = {
        "ОАЭ": "https://www.coral.ru/packagetours/moskva-to-oae-tours/?qp=gEIDPqjHDS6F9wLPRxSMEpc%2FLGE74v114Z0MhDqCu45eHQbGjOLk9e3kNkskWiJrCL9k0Hz5hotC6h2tbV4K9joPxRStXj%2FzIJJIF5UmBmq%2FY1xdwYC9rrTvVI00rHS3rwv9z0VNcO%2BE5UFzxlqfDhCbTunaDIcGZ6336fzd6flEhAxidQmad9E%2FO%2BPMJakcQzhU2yEKHM%2BJx5FvN%2BJrM63X6Uk6cBJbYfIzcl8BHg0u5g%2BOdyEh7Ek%2BTvyyaNdsllw2525gY28T8jlIu31Bt%2FdliHPQrp0F5fy5Xhd25yGGgmkA%2Fc4%2F0NwCQJi6P3YUJKe6H9d6tvWRbobvD9hU48jbYJ5B4sJ%2FhngTMsqbzw%2Bi5R%2BU%2FA1RECmwQHTGgRwPr04v8kZ%2FmKMpRt4SezAgiJhYZMcKDWCfBA2H3sFQIDc6wjKSU0AyqLPipFsX7jZS4advxNVczPc0fVmnlBUJmJfsMI9N78SIO7czCB0U9EU%3D&p=1&w=0&s=2&ws=10",
        "Турция": "https://www.coral.ru/packagetours/moskva-to-turtsiya-tours/?qp=gEIDPqjHDS6F9wLPRxSMEpc%2FLGE74v114Z0MhDqCu45eHQbGjOLk9e3kNkskWiJrCL9k0Hz5hotC6h2tbV4K9joPxRStXj%2FzIJJIF5UmBmq%2FY1xdwYC9rrTvVI00rHS3PK49DtapIB5tUZwlh%2Fh9BLWaaHs7TXp9CVUCjva%2Bvasu4%2BHlu1Klm%2FHuiYKj61CWohMr11Gi9%2BjAHphwicgdAvtPTVF8BELu4PKS2nvxMEq93cxUdrRXpEV%2BfY7%2Ffx3K%2BN0jhHNLg9xLNeuwdzzwpx1fHDnNJdmakV8gvRArUKarhu5yPMjGi8XVeMun3V69Vklrf4981ZYoqUhFDX1Nwu0KLvO2vDdbQ03iIohUOBKcWn3NPhHWSvVCxDP5ar%2B3b7TkbGSuzhRgYDW43LLmqoJ2YLFISwZM8013bBrs%2Bi4MzfxGyiujWXkLGwe87u%2F9&p=1&w=0&s=2&ws=10",
        "Египет": "https://www.coral.ru/packagetours/moskva-to-egipet-tours/?qp=gEIDPqjHDS6F9wLPRxSMEpc%2FLGE74v114Z0MhDqCu45eHQbGjOLk9e3kNkskWiJrCL9k0Hz5hotC6h2tbV4K9joPxRStXj%2FzIJJIF5UmBmq%2FY1xdwYC9rrTvVI00rHS34lm4MCQ6UrbRUWJ4%2B7vkB%2BExTmgvftgVhItXscy79mFWidKdvZRsHQebdOXmpMV0xbgzll6o9urtWVAJiycp8DCGJ%2BwHn1mZlxSwwTSO4NRKZRQeF86Rj%2B2dWwAQaCzoQdsfUrHFQqY1wLbhoM1I3vfLEKx6fSiwpxmt537Pm3gFDS3NuPmATGOaaFaKmmvc0%2BuW402DdorY821%2BGJBWpqxUIAfQcbTkD9yodYA4nxS5%2BDERQya4Wrt9TdUJMkabC%2F3nQMI24%2F6IcfmrMy563X%2BT685rpfCEWg7jL2FMOZvRL1%2FBkLPFc%2BohxJH1t9vwju4owAoGcOsEArYARGBpkeo2TXsfW7ji0DIommCYqSE%3D&p=1&w=0&s=2&ws=10",
        "Таиланд": "https://www.coral.ru/packagetours/moskva-to-tailand-tours/?qp=gEIDPqjHDS6F9wLPRxSMEpc%2FLGE74v114Z0MhDqCu45eHQbGjOLk9e3kNkskWiJrCL9k0Hz5hotC6h2tbV4K9joPxRStXj%2FzIJJIF5UmBmq%2FY1xdwYC9rrTvVI00rHS3C6EBeqqGtSUED84SYkkoQCO0d91JQ26a4NUisFymtRFcQ8ytupdbivnhcItb9wuRHD3sps0fEYB%2FCWrQhBRNN9tfHZNMNNVgJyFiBGAfD4rSn6idVfZiMk5ba4B%2BZUEEkBl670zsF5ZoTpuQYuQibjYEb87q56nm5dX6A0JnGSnB4wP20veRXRK%2BbOxr625cBmucs0mBK1jefSHsAbSQcYkO1f002dDWsEYHW9rEvf%2BKLJlm59iXeqlqtinFXu5%2BfND%2FjJxmz2XYoPfZ6AVGb08iUPpvp5vSKuhbHajsQjczRA8Ry0vN0Pg1IrVOCzOeZEsOL7W6XcHVzZFL3HGn8v6IOU5XvPrZ03HEXI2ib%2BU%3D&p=1&w=0&s=2&ws=10",
        "Мальдивы": "https://www.coral.ru/packagetours/moskva-to-malydivy-tours/?qp=gEIDPqjHDS6F9wLPRxSMEpc%2FLGE74v114Z0MhDqCu45eHQbGjOLk9e3kNkskWiJrCL9k0Hz5hotC6h2tbV4K9joPxRStXj%2FzIJJIF5UmBmq%2FY1xdwYC9rrTvVI00rHS3qi9iDOwUjMw5NFeJvtvwaEcDJ6tGsAaiNFd25IC%2B3HIhtLAXcWZcIHYewKYXUrfVQiWry4IaInKLaGSmTUZQC0WoTQXBietK9jgtiXHu0hKy3Cv7vGletrBodKRBwQTnyjc%2FlHy8cSbfrxf64ww7TF4FcUH9WbKGI20xc0ctyJ3pY3VO8NUUm00TapjLiG66U57ubG%2FgZW8DJ6O%2BUZR9b1HF%2BJl1ULtTlXM8E2g3c7UdLDd0AWwn95KMq6l%2F6rv4pT6E0krUqDa0zPMifO1h1%2Bvk3Ap%2FRKdxvm4FppO6TRe%2FJEBzYE6g0QoM8g%2FEj56XmrspgAykNkaUFAYy78%2FzepRwb%2Fm%2B47qmm2I8M3CRl0o%3D&p=1&w=0&s=2&ws=10",
        "Шри-Ланка": "https://www.coral.ru/packagetours/moskva-to-shrilanka-tours/?qp=gEIDPqjHDS6F9wLPRxSMEpc%2FLGE74v114Z0MhDqCu45eHQbGjOLk9e3kNkskWiJrCL9k0Hz5hotC6h2tbV4K9joPxRStXj%2FzIJJIF5UmBmq%2FY1xdwYC9rrTvVI00rHS3cABaQOQiN82sO%2FwD%2FlZebba1y6MyZXs2JOdkAgHr78AlUR%2B8beJuD9q7%2Fn1E5LtIuyAUJZHB9fvK8qe0wQrCsBu8Hv3zSkJcNWhN1FefanKWwiQ%2BAHNRYmY3z7a7o1WRsumi7nl%2FXR5ku%2BImkIBVrqTkPLIo57kOij6a%2Frb0B16PRVnBLD912mlBI%2B%2FXZ9GTyH%2Banhp%2BO1SL9nhNnX2kRAzQDYFwYQfZcafNay24RX0PXq1KSGv2en2s78WqLOXWpDR4AOBkd%2F4xNfI5C0j1nrUlhfjATVjKb9lp6rJLk5HlWFFNy0EuSFa2Yxn8WBKffpWt3NtLVaVamdu8bc8GeCymHiy7o2IQ9Hb8GB2gv5o%3D&p=1&w=0&s=2&ws=10",
    };

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
        background-image: url(https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/elite_popup.png);
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
      
      .elite-dd.elite-dd--up .elite-dd__panel{
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

    function openElitePopup() {
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
              Выберите куда хотите отправиться, и смотрите специальную подборку премиальных отелей
            </p>

            <div class="elite-dd" data-elite-dd>
              <button type="button" class="elite-dd__btn" data-elite-dd-btn aria-haspopup="listbox" aria-expanded="false">
                <span class="elite-dd__value" data-elite-dd-value>Выберите страну</span>
                <span class="elite-dd__chevron" aria-hidden="true"></span>
              </button>

              <div class="elite-dd__panel" data-elite-dd-panel hidden>
                <ul class="elite-dd__list" data-elite-dd-list role="listbox" tabindex="-1">
                  <li class="elite-dd__item" role="option" data-value="ОАЭ" aria-selected="false">ОАЭ</li>
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
            el.scrollIntoView({ block: 'nearest' });
        };

        const updateDdDirection = () => {
            // высота панели: либо текущая (если уже была), либо оценка по кол-ву пунктов
            const estimatedPanelHeight = Math.min(220, items.length * 44 + 12); // ~44px item + padding
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

            reachGoal('personalization_elite_pop_up_click', {
                button: 'view_hotels',
                country: countryForMetric,
            });
        });

        backBtn?.addEventListener('click', (e) => {
            e.preventDefault();

            reachGoal('personalization_elite_pop_up_click', {
                button: 'no',
                country: selectedValue ? selectedValue : 'not selected',
            });

            closePopup();
        });

        closeBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            closePopup();
        });

        closeBtn?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closePopup();
            }
        });

        root.addEventListener('click', (e) => {
            if (e.target === root) closePopup();
        });

        const onDocMouseDown = (e) => {
            if (!dd.contains(e.target)) closeDd();
        };

        const onDocKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                closePopup();
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

    function bindShield(shieldEl) {
        if (!shieldEl) return;
        if (shieldEl.dataset.eliteBound === '1') return;
        shieldEl.dataset.eliteBound = '1';

        shieldEl.addEventListener('click', (e) => {
            e.preventDefault();

            reachGoal('personalization_elite_pop_up_show');

            openElitePopup();
        });

        shieldEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();

                reachGoal('personalization_elite_pop_up_show');

                openElitePopup();
            }
        });
    }

    function ensureShields() {
        const desktopContainer = document.querySelector(DESKTOP_CONTAINER_SELECTOR);
        if (desktopContainer && !desktopContainer.querySelector('.elite-shield[data-elite-shield="desktop"]')) {
            desktopContainer.insertAdjacentHTML('beforeend', `
        <div class="elite-shield elite-shield--desktop" data-elite-shield="desktop" role="button" tabindex="0" aria-label="Открыть Elite подборку">
          <div class="elite-shield__icon">${SHIELD_SVG}</div>
          <div class="elite-shield__name">
            <span>Добро пожаловать,</span>
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

        if (!eliteSegmentGoalSent && (desktopShield || mobileShield)) {
            eliteSegmentGoalSent = true;
            reachGoal('personalization_elite_segment');
        }
    }

    await Promise.all([
        waitForElement(DESKTOP_CONTAINER_SELECTOR, { timeout: 20000, interval: 200 }),
        waitForElement(MOBILE_CONTAINER_SELECTOR, { timeout: 20000, interval: 200 }),
    ]);

    ensureShields();

    const obs = new MutationObserver(() => ensureShields());
    obs.observe(document.body, { childList: true, subtree: true });

    mindbox("sync", {
        operation: "getUserName",
        onSuccess: function (response) {
            window.PopMechanic.$('#elite_user_name').text(response.customer.firstName ? response.customer.firstName : "");
        },
        onValidationError: function (messages) {},
        onError: function (error) {}
    });
});