(() => {
    const TARGET_TEXT = 'Особые привилегии';
    const TAG_SELECTOR = 'span.ant-tag';

    const STYLE_ID = 'elite_diamond_styles_v2';
    const TOOLTIP_MARK = 'data-elite-diamond';
    const ENHANCED_MARK = 'data-elite-enhanced';

    const ALLOWED_HOTELS = new Set([
        'KEMPINSKI HOTEL BARBAROS BAY BODRUM',
        'MANDARIN ORIENTAL BODRUM',
        'BARBAROS RESERVE RESIDENCE MANAGED BY KEMPINSKI BODRUM',
        'CLUB PRIVE BY RIXOS BELEK',
        'ANANTARA MINA RAS AL KHAIMAH RESORT',
        'EMIRATES PALACE MANDARIN ORIENTAL ABU DHABI',
        'FOUR SEASONS RESORT DUBAI AT JUMEIRAH BEACH',
        'JUMEIRAH AL NASEEM DUBAI',
        'JUMEIRAH BEACH HOTEL DUBAI',
        'JUMEIRAH BURJ AL ARAB DUBAI',
        'JUMEIRAH MALAKIYA VILLAS',
        'ONE&ONLY ROYAL MIRAGE ARABIAN COURT',
        'ONE&ONLY ROYAL MIRAGE PALACE',
        'ONE&ONLY ROYAL MIRAGE THE RESIDENCE',
        'ONE&ONLY THE PALM',
        'PALAZZO VERSACE DUBAI',
        'AL ZORAH BEACH RESORT (EX. THE OBEROI AL ZORAH BEACH RESORT)',
        'THE PALACE DOWNTOWN DUBAI',
        'CLUB PRIVE BY RIXOS SAADIYAT ISLAND',
        'ATLANTIS THE ROYAL',
        'AHAMA',
        'ALLIUM BODRUM RESORT & SPA',
        'ANDA BARUT COLLECTION',
        'ANGELS MARMARIS HOTEL',
        'AVANTGARDE REFINED YALIKAVAK',
        'BAYOU VILLAS LARA ANTALYA',
        'BIBLOS RESORT ALACATI',
        'BIJAL',
        'CAJA BY MAXX ROYAL',
        'CALISTA LUXURY RESORT',
        'CAPE BODRUM LUXURY HOTEL & BEACH',
        'CARESSE A LUXURY COLLECTION RESORT & SPA',
        'CASA NONNA BODRUM',
        'CLUB MARVY',
        'CLUB PRIVE BY RIXOS GOCEK',
        'CORNELIA AZURE VILLAS',
        'CULLINAN BELEK',
        'D MARIS BAY',
        'D RESORT GOCEK',
        'ELA EXCELLENCE RESORT BELEK',
        'ETHNO BELEK',
        'GLORIA GOLF RESORT',
        'GLORIA SERENITY RESORT',
        'HILTON DALAMAN SARIGERME RESORT & SPA',
        'HYDE BODRUM',
        'KAYA PALAZZO GOLF RESORT',
        'KAYA PALAZZO RESORT & RESIDENCE',
        'LARA BARUT COLLECTION',
        'LE MERIDIEN BODRUM BEACH RESORT',
        'LUJO ART & JOY BODRUM',
        'MAXX ROYAL BODRUM',
        'MAXX ROYAL BELEK GOLF RESORT',
        'MAXX ROYAL KEMER RESORT',
        'METT HOTEL & BEACH RESORT BODRUM',
        'MGALLERY THE BODRUM HOTEL YALIKAVAK',
        'MIVARA LUXURY RESORT & SPA BODRUM',
        'NG PHASELIS BAY',
        'NG SIGN BODRUM',
        'RADISSON COLLECTION BODRUM',
        'RIXOS PREMIUM BELEK - THE LAND OF LEGENDS FREE ACCESS',
        'REGNUM CARYA',
        'REGNUM THE CROWN',
        'RIXOS PREMIUM BODRUM',
        'RIXOS PREMIUM GOCEK',
        'SIRENE LUXURY HOTEL BODRUM',
        'SIX SENSES KAPLANKAYA',
        'SUSONA BODRUM, LXR HOTELS & RESORTS',
        'VOYAGE BELEK GOLF & SPA',
        'VOYAGE KUNDU',
        'YAZZ COLLECTIVE',
    ]);

    const normalize = (s) =>
        String(s || '')
            .replace(/\s+/g, ' ')
            .trim()
            .toUpperCase();

    const isTouchDevice = () =>
        window.matchMedia?.('(hover: none), (pointer: coarse)')?.matches ||
        'ontouchstart' in window;

    const isAllowedHotelName = (nameRaw) => {
        const n = normalize(nameRaw);
        return n && ALLOWED_HOTELS.has(n);
    };

    const fireEliteDiamondMetric = (() => {
        let sent = false;
        return () => {
            if (sent) return;
            const ymFn = window.ym;
            if (typeof ymFn !== 'function') return;
            ymFn(96674199, 'reachGoal', 'personalization_elite_diamond_info');
            sent = true;
        };
    })();

    const getHotelPageName = () => normalize(document.querySelector('#HotelName h1')?.textContent);
    const shouldRunHotelPageFeatures = () => {
        const name = getHotelPageName();
        return !!name && ALLOWED_HOTELS.has(name);
    };

    const ensureStyles = () => {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
      .elite-diamond { display:inline-flex; position:relative; align-items:flex-start; }
      .elite-diamond__tooltip {
        flex-direction:column; position:absolute; z-index:2;
        padding-inline:8px; padding-block:12px; width:364px;
        border-radius:4px;
        background: linear-gradient(180deg, #354450 0%, #5E7B90 190%), #9A9A9A;
        top:35px; left:50%; transform:translateX(-50%);
        display:none;
      }
      .elite-diamond.pos-top .elite-diamond__tooltip { top:auto; bottom:35px; }
      .elite-diamond.pos-left .elite-diamond__tooltip { left:auto; right:0; transform:translateX(0); }
      .elite-diamond.pos-right .elite-diamond__tooltip { left:0; transform:translateX(0); }

      .elite-diamond__tooltip:before {
        content:''; position:absolute; width:14px; height:14px; transform:rotate(45deg);
        background-color:#354551; left:50%; top:-7px; margin-left:-7px;
      }
      .elite-diamond.pos-top .elite-diamond__tooltip:before { top:auto; bottom:-7px; background-color:#4A6172; }
      .elite-diamond.pos-left .elite-diamond__tooltip:before { left:auto; right:18px; margin-left:0; }
      .elite-diamond.pos-right .elite-diamond__tooltip:before { left:18px; margin-left:0; }

      .elite-diamond__adv { display:flex; gap:4px; align-items:center; }
      .elite-diamond__title { font-size:16px; font-weight:700; color:#fff; margin:0 0 8px 0; }
      .elite-diamond__adv + .elite-diamond__adv { margin-top:6px; }
      .elite-diamond__adv p { font-weight:500; color:#fff; font-size:14px; margin:0; }

      .elite-diamond__button {
        display:flex; align-items:center; justify-content:center;
        padding-inline:16px; background-color:#fff; height:32px;
        border-radius:48px; border:1px solid rgba(0,0,0,.15);
        margin-top:8px; width:fit-content; color:#000;
        font-size:12px; line-height:16px; font-weight:600;
      }

      .ant-collapse-header-text > div { display:flex; align-items:center; }
      .ant-collapse-header-text > div > .tag-container { display:flex; align-items:center; gap:10px; }
      .information-tags.visible-on-desktop:has(.elite-diamond) { display:flex; align-items:center; gap:12px; }
      
      .tooltip-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }

      @media screen and (max-width: 992px) {
        .information-tags.visible-on-desktop:has(.elite-diamond) { display:none; }
        .information-tags.visible-on-mobile:has(.elite-diamond) {
          display:flex; flex-direction:column; align-items:flex-end; gap:6px;
        }
      }
    `;
        document.head.appendChild(style);
    };

    const tooltipHTML = `
    <div class="elite-diamond" ${TOOLTIP_MARK}>
      <img src="https://b2ccdn.coral.ru/content/landing-pages/elite-service/mini-banner/diamond2x.png"
           style="max-width:149px;" alt="">
      <div class="elite-diamond__tooltip" style="display:none;" role="tooltip" aria-hidden="true">
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

        <a href="https://www.coral.ru/chain/diamond-hotels/" target="_blank"
           class="elite-diamond__button"
           onclick="ym(96674199,'reachGoal','personalization_elite_click_details_diamond');">
          Подробнее о привилегиях
        </a>
      </div>
    </div>
  `;

    // =========================
    // Тултип
    // =========================
    const state = { openDiamond: null };

    const setVisible = (diamond, v) => {
        const tooltip = diamond.querySelector('.elite-diamond__tooltip');
        if (!tooltip) return;

        tooltip.style.display = v ? 'flex' : 'none';
        tooltip.setAttribute('aria-hidden', v ? 'false' : 'true');
        diamond.classList.toggle('is-open', v);

        if (v) positionTooltip(diamond, tooltip);
    };

    const positionTooltip = (diamond, tooltip) => {
        const prev = tooltip.style.display;
        tooltip.style.display = 'flex';

        diamond.classList.remove('pos-left', 'pos-right', 'pos-center', 'pos-top', 'pos-bottom');

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

        diamond.classList.add(place === 'left' ? 'pos-left' : place === 'right' ? 'pos-right' : 'pos-center');

        const spaceBottom = vh - dRect.bottom;
        const spaceTop = dRect.top;
        const needHeight = tRect.height + 10;
        const openUp = spaceBottom < needHeight && spaceTop > needHeight;

        diamond.classList.add(openUp ? 'pos-top' : 'pos-bottom');

        if (diamond.classList.contains('pos-center')) {
            const desiredLeftInViewport = dRect.left + dRect.width / 2 - tRect.width / 2;
            const clampedLeftInViewport = Math.min(Math.max(desiredLeftInViewport, margin), vw - tRect.width - margin);
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

    const attachDelegatedEventsOnce = (() => {
        let attached = false;
        return () => {
            if (attached) return;
            attached = true;

            const onRelayout = () => {
                if (!state.openDiamond) return;
                const tooltip = state.openDiamond.querySelector('.elite-diamond__tooltip');
                if (tooltip && tooltip.style.display !== 'none') positionTooltip(state.openDiamond, tooltip);
            };
            window.addEventListener('resize', onRelayout);
            window.addEventListener('scroll', onRelayout, true);

            if (isTouchDevice()) {
                document.addEventListener('click', (e) => {
                    const diamond = e.target.closest?.(`.elite-diamond[${TOOLTIP_MARK}]`);
                    if (!diamond) {
                        if (state.openDiamond && !state.openDiamond.contains(e.target)) {
                            setVisible(state.openDiamond, false);
                            state.openDiamond = null;
                        }
                        return;
                    }

                    e.stopPropagation();
                    const tooltip = diamond.querySelector('.elite-diamond__tooltip');
                    const open = tooltip && tooltip.style.display !== 'none';

                    if (state.openDiamond && state.openDiamond !== diamond) setVisible(state.openDiamond, false);
                    setVisible(diamond, !open);
                    if (!open) fireEliteDiamondMetric();
                    state.openDiamond = !open ? null : diamond;
                });

                document.addEventListener(
                    'click',
                    (e) => {
                        const tooltip = e.target.closest?.('.elite-diamond__tooltip');
                        if (tooltip) e.stopPropagation();
                    },
                    true
                );
            } else {
                let closeTimer = null;
                const scheduleClose = () => {
                    clearTimeout(closeTimer);
                    closeTimer = setTimeout(() => {
                        if (state.openDiamond) setVisible(state.openDiamond, false);
                        state.openDiamond = null;
                    }, 120);
                };
                const cancelClose = () => {
                    clearTimeout(closeTimer);
                    closeTimer = null;
                };

                document.addEventListener(
                    'mouseenter',
                    (e) => {
                        const diamond = e.target.closest?.(`.elite-diamond[${TOOLTIP_MARK}]`);
                        if (!diamond) return;

                        cancelClose();
                        if (state.openDiamond && state.openDiamond !== diamond) setVisible(state.openDiamond, false);
                        setVisible(diamond, true);
                        fireEliteDiamondMetric();
                        state.openDiamond = diamond;
                    },
                    true
                );

                document.addEventListener(
                    'mouseleave',
                    (e) => {
                        const diamond = e.target.closest?.(`.elite-diamond[${TOOLTIP_MARK}]`);
                        if (!diamond) return;
                        scheduleClose();
                    },
                    true
                );

                document.addEventListener('focusin', (e) => {
                    const diamond = e.target.closest?.(`.elite-diamond[${TOOLTIP_MARK}]`);
                    if (!diamond) return;

                    cancelClose();
                    if (state.openDiamond && state.openDiamond !== diamond) setVisible(state.openDiamond, false);
                    setVisible(diamond, true);
                    fireEliteDiamondMetric();
                    state.openDiamond = diamond;
                });

                document.addEventListener('focusout', (e) => {
                    const diamond = e.target.closest?.(`.elite-diamond[${TOOLTIP_MARK}]`);
                    if (!diamond) return;
                    scheduleClose();
                });
            }
        };
    })();

    const insertAfterNode = (node, mark) => {
        if (!node) return false;

        const next = node.nextElementSibling;
        if (next?.matches?.(`.elite-diamond[${TOOLTIP_MARK}]`)) return true;

        node.insertAdjacentHTML('afterend', tooltipHTML);

        const diamond = node.nextElementSibling;
        if (diamond?.matches?.(`.elite-diamond[${TOOLTIP_MARK}]`)) {
            diamond.tabIndex = 0;
            if (mark) diamond.setAttribute(mark, '');
            return true;
        }
        return false;
    };

    // =========================
    // Карточка отеля - верхняя плашка
    // =========================
    const ensureTopTooltip = () => {
        const anchors = document.querySelectorAll('.elite-service-icon-and-tooltip');
        if (!anchors.length) return;

        anchors.forEach((anchor) => {
            insertAfterNode(anchor, 'data-elite-diamond-top');
        });
    };

    // =========================
    // Карточка отеля - номера
    // =========================
    const ensureRoomTooltips = (selectContainer) => {
        const tags = selectContainer.querySelectorAll(TAG_SELECTOR);

        tags.forEach((tag) => {
            if (!tag.textContent?.includes(TARGET_TEXT)) return;
            if (tag.getAttribute(ENHANCED_MARK) === '1') return;

            const next = tag.nextElementSibling;
            if (next?.matches?.(`.elite-diamond[${TOOLTIP_MARK}]`)) {
                tag.setAttribute(ENHANCED_MARK, '1');
                return;
            }

            tag.insertAdjacentHTML('afterend', tooltipHTML);
            tag.setAttribute(ENHANCED_MARK, '1');

            const diamond = tag.nextElementSibling;
            if (diamond?.matches?.(`.elite-diamond[${TOOLTIP_MARK}]`)) diamond.tabIndex = 0;
        });
    };

    const setupRoomObserver = (selectContainer) => {
        let raf = 0;
        const requestEnsure = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => ensureRoomTooltips(selectContainer));
        };

        const obs = new MutationObserver(requestEnsure);
        obs.observe(selectContainer, { childList: true, subtree: true });

        ensureRoomTooltips(selectContainer);

        selectContainer.addEventListener('click', (e) => {
            if (e.target.closest?.('button[name="showMore"]')) requestEnsure();
            if (e.target.closest?.('label')) requestEnsure();
        });
    };

    // =========================
    // Карточка отлея - табы
    // =========================
    const HOTEL_TABS_SELECTOR = '[class*="HotelInformationTabs_hotelInformationTabs"]';
    const ROOMS_TAB_SELECTOR = '[data-node-key="Номера"]';

    const ensurePrivilegesTooltipsIn = (root) => {
        const tags = root.querySelectorAll(TAG_SELECTOR);

        tags.forEach((tag) => {
            if (!tag.textContent?.includes(TARGET_TEXT)) return;
            if (tag.getAttribute(ENHANCED_MARK) === '1') return;

            const next = tag.nextElementSibling;
            if (next?.matches?.(`.elite-diamond[${TOOLTIP_MARK}]`)) {
                tag.setAttribute(ENHANCED_MARK, '1');
                return;
            }

            tag.insertAdjacentHTML('afterend', tooltipHTML);
            tag.setAttribute(ENHANCED_MARK, '1');

            const diamond = tag.nextElementSibling;
            if (diamond?.matches?.(`.elite-diamond[${TOOLTIP_MARK}]`)) diamond.tabIndex = 0;
        });
    };

    const setupHotelTabsObserver = () => {
        const host = document.querySelector(HOTEL_TABS_SELECTOR);
        if (!host) return null;

        let raf = 0;
        const requestEnsure = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => ensurePrivilegesTooltipsIn(host));
        };

        requestEnsure();

        const obs = new MutationObserver(requestEnsure);
        obs.observe(host, { childList: true, subtree: true });

        host.addEventListener(
            'click',
            (e) => {
                const roomsTab = e.target.closest?.(ROOMS_TAB_SELECTOR);
                if (!roomsTab) return;

                requestEnsure();
                setTimeout(requestEnsure, 50);
                setTimeout(requestEnsure, 150);
            },
            true
        );

        return obs;
    };

    const initHotelTabsLazy = () => {
        let hotelObs = null;

        const tryInit = () => {
            if (hotelObs) return;
            const host = document.querySelector(HOTEL_TABS_SELECTOR);
            if (!host) return;

            ensureStyles();
            attachDelegatedEventsOnce();
            hotelObs = setupHotelTabsObserver();
        };

        tryInit();

        const docObs = new MutationObserver(() => tryInit());
        docObs.observe(document.documentElement, { childList: true, subtree: true });
    };

    const wrapAnchorAndDiamond = (anchor, diamond, wrapperClass = 'tooltip-wrapper') => {
        if (!anchor || !diamond) return;

        if (anchor.parentElement?.classList?.contains(wrapperClass)) return;

        const parent = anchor.parentElement;
        if (!parent) return;

        const wrapper = document.createElement('div');
        wrapper.className = wrapperClass;

        parent.insertBefore(wrapper, anchor);
        wrapper.appendChild(anchor);
        wrapper.appendChild(diamond);
    };


    // =========================
    // Поисковая выдача
    // =========================
    const LISTING_MARK = 'data-elite-listing-enhanced';

    const ensureListingTooltips = (root = document) => {
        const nodes = root.querySelectorAll('.hotel-name');
        if (!nodes.length) return;

        nodes.forEach((hotelNameNode) => {
            if (hotelNameNode.getAttribute(LISTING_MARK) === '1') return;

            const titleEl = hotelNameNode.querySelector('h2');
            if (!isAllowedHotelName(titleEl?.textContent)) return;

            const cardRoot = hotelNameNode.closest('.hotel-card');
            cardRoot.style.overflow = 'visible';
            if (!cardRoot) return;

            const anchor = cardRoot.querySelector('.elite-service-icon-and-tooltip');

            if (!anchor) return;

            const anchorWrap = anchor;
            const ok = insertAfterNode(anchorWrap, 'data-elite-diamond-listing');

            if (ok) {
                const diamondEl = anchorWrap.nextElementSibling;
                if (diamondEl?.matches?.(`.elite-diamond[${TOOLTIP_MARK}]`)) {
                    wrapAnchorAndDiamond(anchorWrap, diamondEl, 'tooltip-wrapper');
                }
                hotelNameNode.setAttribute(LISTING_MARK, '1');
            }

        });
    };

    const setupListingObserver = () => {
        let raf = 0;
        const requestEnsure = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => ensureListingTooltips(document));
        };

        requestEnsure();

        const obs = new MutationObserver((mutations) => {
            const hasAddedNodes = mutations.some((m) => m.addedNodes && m.addedNodes.length);
            if (hasAddedNodes) requestEnsure();
        });

        obs.observe(document.documentElement, { childList: true, subtree: true });

        document.addEventListener('click', requestEnsure, true);
    };

    // =========================
    // Start
    // =========================
    ensureStyles();
    attachDelegatedEventsOnce();

    setupListingObserver();

    const startHotelPage = () => {
        if (!shouldRunHotelPageFeatures()) return;

        const selectContainer = document.getElementById('select-room-container');
        if (selectContainer) setupRoomObserver(selectContainer);

        let rafTop = 0;
        const requestTop = () => {
            cancelAnimationFrame(rafTop);
            rafTop = requestAnimationFrame(ensureTopTooltip);
        };
        requestTop();

        const topObserver = new MutationObserver(requestTop);
        topObserver.observe(document.documentElement, { childList: true, subtree: true });

        initHotelTabsLazy();
    };

    if (document.querySelector('#HotelName h1')) {
        startHotelPage();
    } else {
        const obs = new MutationObserver(() => {
            if (document.querySelector('#HotelName h1')) {
                obs.disconnect();
                startHotelPage();
            }
        });
        obs.observe(document.documentElement, { childList: true, subtree: true });
    }
})();