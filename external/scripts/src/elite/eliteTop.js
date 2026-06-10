(() => {
    const eliteTooltip = document.querySelector('.elite-service-icon-and-tooltip');
    if (!eliteTooltip) return;

    const eliteParentNode = eliteTooltip.parentNode;
    if (!eliteParentNode) return;

    eliteParentNode.insertAdjacentHTML(
        'afterend',
        `
    <div class="elite-diamond" id="elite_diamond">
      <img src="https://b2ccdn.coral.ru/content/landing-pages/elite-service/mini-banner/diamond2x.png" style="max-width: 149px;" alt="">
      <div class="elite-diamond__tooltip" id="elite_diamond_tooltip" style="display:none;" role="tooltip" aria-hidden="true">
        <p class="elite-diamond__title">Концепция Elite Diamond</p>

        <div class="elite-diamond__adv">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M8 0.5H4.25L2.75 2H0.5V7.25H3.5L5.75 9.5H11L12.5 8L8 3.5" stroke="white" stroke-linejoin="round"/>
            <path d="M9.125 2.375L7.625 3.875C7.21079 4.28921 6.53921 4.28921 6.125 3.875C5.71079 3.46079 5.71079 2.78921 6.125 2.375L8 0.5H10.25L11.75 2H15.5V7.25H11.75" stroke="white" stroke-linejoin="round"/>
          </svg>
          <p>Персональная встреча в аэропорту</p>
        </div>

        <div class="elite-diamond__adv">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="8" viewBox="0 0 16 8" fill="none">
            <path d="M5 5.75H11M2 5.75H0.5V3.68302C0.5 3.35182 0.717251 3.05982 1.03449 2.96465L4.25 2L7.25 0.5H10.25L15.5 2.375V5.75H14" stroke="white" stroke-linejoin="round"/>
            <circle cx="3.5" cy="5.75" r="1.5" stroke="white" stroke-linejoin="round"/>
            <circle cx="12.5" cy="5.75" r="1.5" stroke="white" stroke-linejoin="round"/>
          </svg>
          <p>Индивидуальный трансфер</p>
        </div>

        <div class="elite-diamond__adv">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 10.25V15.5" stroke="white" stroke-linejoin="round"/>
            <path d="M7.625 15.5001H2.375" stroke="white" stroke-linejoin="round"/>
            <path d="M0.5 5H9.5V6.5C9.5 8.57107 7.82107 10.25 5.75 10.25H4.25C2.17893 10.25 0.5 8.57107 0.5 6.5V5Z" stroke="white" stroke-linejoin="round"/>
            <path d="M12.5 0.886039C13.0147 0.37132 13.8492 0.37132 14.364 0.886039C14.8787 1.40076 14.8787 2.23528 14.364 2.75L12.5 4.61396L10.636 2.75C10.1213 2.23528 10.1213 1.40076 10.636 0.886039C11.1508 0.37132 11.9853 0.37132 12.5 0.886039Z" stroke="white" stroke-linejoin="round"/>
          </svg>
          <p>Приветственный напиток по прилете</p>
        </div>

        <div class="elite-diamond__adv">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1.10742 5.36V4.145C1.10742 2.13192 2.73934 0.5 4.75242 0.5H8.39742C10.4105 0.5 12.0424 2.13192 12.0424 4.145V5.36" stroke="white" stroke-linejoin="round"/>
            <rect x="0.5" y="5.36002" width="3.645" height="5.4675" rx="1.215" stroke="white" stroke-linejoin="round"/>
            <rect x="9.00513" y="5.36002" width="3.645" height="5.4675" rx="1.215" stroke="white" stroke-linejoin="round"/>
            <path d="M5.36011 12.65H10.8276C11.1631 12.65 11.4351 12.378 11.4351 12.0425V10.8275" stroke="white" stroke-linejoin="round"/>
          </svg>
          <p>Консьерж-сервис 24/7</p>
        </div>
        
        <a href="/" class="elite-diamond__button">
            Подробнее о привилегиях
        </a>
      </div>
    </div>
  `
    );

    const diamond = document.getElementById('elite_diamond');
    const tooltip = document.getElementById('elite_diamond_tooltip');
    if (!diamond || !tooltip) return;

    const isTouchDevice = () =>
        window.matchMedia?.('(hover: none), (pointer: coarse)')?.matches ||
        'ontouchstart' in window;

    const setVisible = (v) => {
        tooltip.style.display = v ? 'flex' : 'none';
        tooltip.setAttribute('aria-hidden', v ? 'false' : 'true');
        diamond.classList.toggle('is-open', v);
        if (v) positionTooltip();
    };

    const positionTooltip = () => {
        const prev = tooltip.style.display;
        tooltip.style.display = 'flex';

        diamond.classList.remove('pos-left', 'pos-right', 'pos-center');

        const vw = document.documentElement.clientWidth;
        const vh = document.documentElement.clientHeight;

        const dRect = diamond.getBoundingClientRect();
        const tRect = tooltip.getBoundingClientRect();

        const margin = 8;

        const spaceLeft = dRect.left;
        const spaceRight = vw - dRect.right;

        let place = 'center';
        if (tRect.width / 2 > spaceLeft - margin) place = 'right';
        if (tRect.width / 2 > spaceRight - margin) place = 'left';

        if (place === 'left') diamond.classList.add('pos-left');
        else if (place === 'right') diamond.classList.add('pos-right');
        else diamond.classList.add('pos-center');

        const spaceBottom = vh - dRect.bottom;
        const spaceTop = dRect.top;
        const needHeight = tRect.height + 10;
        const openUp = spaceBottom < needHeight && spaceTop > needHeight;

        diamond.classList.toggle('pos-top', openUp);
        diamond.classList.toggle('pos-bottom', !openUp);

        if (diamond.classList.contains('pos-center')) {
            const desiredLeftInViewport = dRect.left + dRect.width / 2 - tRect.width / 2;
            const clampedLeftInViewport = Math.min(
                Math.max(desiredLeftInViewport, margin),
                vw - tRect.width - margin
            );
            const leftWithinDiamond = clampedLeftInViewport - dRect.left;
            tooltip.style.left = `${leftWithinDiamond}px`;
            tooltip.style.right = 'auto';
            tooltip.style.transform = 'translateX(0)';
        } else {
            tooltip.style.left = '';
            tooltip.style.right = '';
            tooltip.style.transform = '';
        }

        tooltip.style.display = prev;
    };

    let closeTimer = null;
    const scheduleClose = () => {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => setVisible(false), 120);
    };
    const cancelClose = () => {
        clearTimeout(closeTimer);
        closeTimer = null;
    };

    const onResize = () => {
        if (tooltip.style.display !== 'none') positionTooltip();
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);

    if (isTouchDevice()) {
        diamond.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = tooltip.style.display !== 'none';
            setVisible(!open);
        });

        document.addEventListener('click', (e) => {
            if (!diamond.contains(e.target)) setVisible(false);
        });

        tooltip.addEventListener('click', (e) => e.stopPropagation());
    } else {
        diamond.addEventListener('mouseenter', () => {
            cancelClose();
            setVisible(true);
        });

        diamond.addEventListener('mouseleave', () => {
            scheduleClose();
        });

        tooltip.addEventListener('mouseenter', () => {
            cancelClose();
            setVisible(true);
        });

        tooltip.addEventListener('mouseleave', () => {
            scheduleClose();
        });

        diamond.tabIndex = 0;
        diamond.addEventListener('focus', () => setVisible(true));
        diamond.addEventListener('blur', () => scheduleClose());
    }

    const style = document.createElement('style');
    style.textContent = `
    .elite-diamond {
      display: inline-flex;
      position: relative;
      align-items: flex-start;
    }

    .elite-diamond__tooltip {
      flex-direction: column;
      position: absolute;
      z-index: 2;
      padding-inline: 8px;
      padding-block: 12px;
      width: 364px;
      border-radius: 4px;
      background: linear-gradient(180deg, #354450 0%, #5E7B90 190%), #9A9A9A;
      top: 35px;
      left: 50%;
      transform: translateX(-50%);
    }

    .elite-diamond.pos-top .elite-diamond__tooltip {
      top: auto;
      bottom: 35px;
    }
    
    .elite-diamond.pos-bottom .elite-diamond__tooltip {
      bottom: auto;
    }

    .elite-diamond.pos-left .elite-diamond__tooltip {
      left: auto;
      right: 0;
      transform: translateX(0);
    }
    
    .elite-diamond.pos-right .elite-diamond__tooltip {
      left: 0;
      transform: translateX(0);
    }

    .elite-diamond__tooltip:before {
      content: '';
      position: absolute;
      width: 14px;
      height: 14px;
      transform: rotate(45deg);
      background-color: #354551;
      left: 50%;
      top: -7px;
      margin-left: -7px;
    }
    
    .elite-diamond.pos-top .elite-diamond__tooltip:before {
      top: auto;
      bottom: -7px;
      background-color: #4A6172;
    }
    
    .elite-diamond.pos-left .elite-diamond__tooltip:before {
      left: auto;
      right: 18px;
      margin-left: 0;
    }
    
    .elite-diamond.pos-right .elite-diamond__tooltip:before {
      left: 18px;
      margin-left: 0;
    }

    .elite-diamond__adv {
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .elite-diamond__title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 8px 0;
    }

    .elite-diamond__adv + .elite-diamond__adv {
      margin-top: 6px;
    }

    .elite-diamond__adv p {
      font-weight: 500;
      color: #fff;
      font-size: 14px;
      margin: 0;
    }
    
    .elite-diamond__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-inline: 16px;
        background-color: #fff;
        height: 32px;
        border-radius: 48px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        margin-top: 8px;
        width: fit-content;
        color: black;
        font-size: 12px;
        line-height: 16px;
        font-weight: 600;
    }
    
    .ant-collapse-header-text > div {
                display: flex;
                align-items: center;
            }
            
            .ant-collapse-header-text > div > .tag-container {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .information-tags.visible-on-desktop:has(.elite-diamond) { display:flex; align-items:center; gap:12px; }
  `;
    document.body.appendChild(style);
})();