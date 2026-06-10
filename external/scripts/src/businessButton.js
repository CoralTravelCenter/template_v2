const initBusinessButton = () => {
    const styleId = 'business-button-popup-styles';
    const businessClassStorageKey = 'wantsBusinessClass';
    const bookingNoteSelector = '[data-testid="reservationNote_text"]';
    const businessClassNote = 'ХОЧУ БИЗНЕС КЛАСС';
    let closeModalTimeout = null;
    let lastHandledUrl = window.location.href;

    const ensureStyles = () => {
        if (document.getElementById(styleId)) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = styleId;
        styles.textContent = `
            .business-button-popup {
                display: flex;
                align-items: center;
                padding-inline: 12px;
                border-radius: 8px;
                color: white;
                cursor: pointer;
                background-image: url(https://b2ccdn.coral.ru/content/cms/russia/busines-class-block/bbutton.webp);
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
                gap: 8px;
                min-height: 40px;
            }
            
            .business-button-popup span {
                font-size: 14px;
                line-height: 22px;
                font-weight: bold;
            }

            .business-button-modal {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 20px;
                background: rgba(0, 0, 0, 0.45);
            }

            .business-button-modal.business-button-modal-open {
                display: flex;
            }

            .business-button-modal__content {
                position: relative;
                width: 100%;
                max-width: 490px;
                border-radius: 16px;
                background-image: url(https://b2ccdn.coral.ru/content/cms/russia/busines-class-block/full_bg.webp);
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
                color: black;
            }

            .business-button-modal__title {
                
                font-size: 30px;
               margin: 0;
                font-family: "Trajan Pro 3";
            }

            .business-button-modal__list {
                margin: 0;
                padding-left: 20px;
            }

            .business-button-modal__item + .business-button-modal__item {
                margin-top: 12px;
            }

            .business-button-modal-close {
                position: absolute;
                top: 12px;
                right: 12px;
                width: 32px;
                height: 32px;
                border: 0;
                border-radius: 4px;
                background: white;
                font-size: 24px;
                line-height: 1;
                cursor: pointer;
            }

            .business-button-modal-action {
                position: relative;
                margin-top: 24px;
                padding: 14px 18px;
                border: 0;
                border-radius: 10px;
                background: white;
                color: black;
                font: inherit;
                cursor: pointer;
                min-height: 40px;
            }

            .business-button-modal-notice {
                position: absolute;
                bottom: calc(100% + 12px);
                left: 50%;
                transform: translateX(-50%);
                display: none;
                padding: 12px 14px;
                border-radius: 10px;
                background: #f2f6ff;
                color: #1f3f7a;
                font-size: 14px;
                line-height: 1.4;
                white-space: nowrap;
                box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
            }
            
            .business-button-modal__header {
                background-image: url(https://b2ccdn.coral.ru/content/cms/russia/busines-class-block/bc_image.webp);
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
                min-height: 260px;
                width: 100%;
                padding: 40px;
                display: flex;
                flex-direction: column;
                border-radius: 16px;
            }
            
            .business-button-modal__icon {
                margin-top: auto;
            }

            .business-button-modal-notice::after {
                content: '';
                position: absolute;
                top: 90%;
                left: 50%;
                width: 10px;
                height: 10px;
                background: #f2f6ff;
                transform: translateX(-50%) rotate(45deg);
            }

            .business-button-modal-notice[data-visible="true"] {
                display: block;
            }
            
            .business-button-modal__text {
                color: white;
                text-align: center;
            }
            
            .mb-24 {
                margin-bottom: 24px;
            }
            
            .business-button-modal__info {
                padding: 16px;
                text-align: center;
                padding-bottom: 24px;
            }
        `;

        document.head.appendChild(styles);
    };

    const hasBusinessClassPreference = () => sessionStorage.getItem(businessClassStorageKey) === 'true';

    const setBusinessClassPreference = () => {
        sessionStorage.setItem(businessClassStorageKey, 'true');
    };

    const closeModal = (modal) => {
        modal.classList.remove('business-button-modal-open');
        if (closeModalTimeout) {
            clearTimeout(closeModalTimeout);
            closeModalTimeout = null;
        }
    };

    const updateActionButtonState = (button) => {
        const isSelected = hasBusinessClassPreference();
        button.dataset.selected = String(isSelected);
    };

    const reachGoal = (...args) => {
        if (typeof window.ym === 'function') {
            window.ym(...args);
        }
    };

    const isBookingStep = () => {
        const {pathname, search} = window.location;
        return pathname.includes('/booking/add-passenger') && new URLSearchParams(search).get('step') === '2';
    };

    const updateReactTextareaValue = (field, value) => {
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
        nativeSetter?.call(field, value);
        field.dispatchEvent(new Event('input', {bubbles: true}));
        field.dispatchEvent(new Event('change', {bubbles: true}));
    };

    const syncBusinessClassNote = () => {
        if (!hasBusinessClassPreference() || !isBookingStep()) {
            return;
        }

        const noteField = document.querySelector(bookingNoteSelector);
        if (!(noteField instanceof HTMLTextAreaElement)) {
            return;
        }

        const currentValue = noteField.value.trim();
        if (currentValue.includes(businessClassNote)) {
            return;
        }

        const nextValue = currentValue ? `${currentValue}\n${businessClassNote}` : businessClassNote;
        updateReactTextareaValue(noteField, nextValue);
    };

    const watchBookingStep = () => {
        const handleRouteChange = () => {
            if (window.location.href === lastHandledUrl) {
                return;
            }

            lastHandledUrl = window.location.href;
            requestAnimationFrame(syncBusinessClassNote);
        };

        const wrapHistoryMethod = (methodName) => {
            const originalMethod = window.history[methodName];
            window.history[methodName] = function wrapHistoryState(...args) {
                const result = originalMethod.apply(this, args);
                handleRouteChange();
                return result;
            };
        };

        wrapHistoryMethod('pushState');
        wrapHistoryMethod('replaceState');
        window.addEventListener('popstate', handleRouteChange);

        const bookingObserver = new MutationObserver(() => {
            syncBusinessClassNote();
            handleRouteChange();
        });

        bookingObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        syncBusinessClassNote();
    };

    const ensureModal = () => {
        let modal = document.querySelector('.business-button-modal');
        if (modal) {
            const actionButton = modal.querySelector('.business-button-modal-action');
            const notice = modal.querySelector('.business-button-modal-notice');
            if (actionButton) {
                updateActionButtonState(actionButton);
            }
            if (notice) {
                notice.dataset.visible = 'false';
            }
            return modal;
        }

        document.body.insertAdjacentHTML('beforeend', `
            <div class="business-button-modal">
                <div class="business-button-modal__content">
                    <div class="business-button-modal__header">
                        <h3 class="business-button-modal__title">
                            Хотите <br>
                            бизнес-класс?
                        </h3>
                        <div class="business-button-modal__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="36" viewBox="0 0 40 36" fill="none">
  <path d="M8.36415 3.59691C9.55185 2.68257 10.1457 2.22541 10.8312 1.93098C11.142 1.79747 11.4651 1.68962 11.7968 1.60864C12.5283 1.43005 13.304 1.43005 14.8554 1.43005H24.6714C26.2228 1.43005 26.9985 1.43005 27.73 1.60864C28.0616 1.68962 28.3848 1.79747 28.6956 1.93098C29.3811 2.22541 29.9749 2.68257 31.1627 3.59691C35.0981 6.6266 37.066 8.14147 37.7405 10.1032C38.0406 10.9757 38.1526 11.8934 38.0707 12.8052C37.8863 14.855 36.3329 16.7311 33.2261 20.483L25.9047 29.3248C23.0865 32.7284 21.6774 34.4301 19.7634 34.4301C17.8494 34.4301 16.4403 32.7284 13.6221 29.3248L6.30069 20.483C3.19387 16.7311 1.64045 14.855 1.45609 12.8052C1.37409 11.8934 1.48623 10.9757 1.78627 10.1032C2.46083 8.14147 4.4286 6.6266 8.36415 3.59691Z" stroke="black" stroke-width="2.86"/>
  <path d="M16.0968 11.5133H23.4301" stroke="black" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                        </div>    
                    </div>
                    <button class="business-button-modal-close" type="button" aria-label="Закрыть">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6616 0.000120744C14.6621 0.000120744 14.6625 0.000583523 14.6634 0.00150919L15.9985 1.33679C15.9994 1.33748 15.9996 1.33795 15.9999 1.33864C16 1.3391 16 1.33957 15.9999 1.34003C15.9999 1.34072 15.9994 1.34119 15.9985 1.34211L9.3406 8L15.9985 14.6579C15.9994 14.6588 15.9996 14.6593 15.9999 14.66C16 14.6605 16 14.6611 15.9999 14.6616C15.9999 14.6621 15.9994 14.6625 15.9985 14.6634L14.6632 15.9985C14.6625 15.9994 14.6621 15.9996 14.6616 15.9999C14.6611 16 14.6605 16 14.66 15.9999C14.6593 15.9999 14.6588 15.9994 14.6579 15.9985L8 9.3406L1.34211 15.9985C1.34119 15.9994 1.34072 15.9996 1.34003 15.9999C1.3395 16 1.33894 16 1.33841 15.9999C1.33795 15.9999 1.33748 15.9994 1.33656 15.9985L0.00150919 14.6632C0.000583523 14.6625 0.000352162 14.6621 0.000120744 14.6616C-4.02482e-05 14.6611 -4.02482e-05 14.6605 0.000120744 14.66C0.000120744 14.6593 0.000583523 14.6588 0.00150919 14.6579L6.6594 8L0.00150919 1.34211C0.000583523 1.34119 0.000352162 1.34072 0.000120744 1.34003C-4.02482e-05 1.3395 -4.02482e-05 1.33894 0.000120744 1.33841C0.000120744 1.33795 0.000583523 1.33748 0.00150919 1.33656L1.33679 0.00150919C1.33748 0.000583523 1.33795 0.000352162 1.33841 0.000120744C1.33894 -4.02482e-05 1.3395 -4.02482e-05 1.34003 0.000120744C1.34072 0.000120744 1.34119 0.000583523 1.34211 0.00150919L8 6.6594L14.6579 0.00150919C14.6588 0.000583523 14.6593 0.000352162 14.66 0.000120744C14.6605 -4.02482e-05 14.6611 -4.02482e-05 14.6616 0.000120744Z" fill="#535353"/>
                        </svg>
                    </button>
                    <div class="business-button-modal__info">
                        <p class="business-button-modal__text mb-24">
                            <strong>Мы вам поможем</strong>, даже если вы не смогли найти на сайте перелёт на этом тарифe.
                        </p>
                        <p class="business-button-modal__text">
                            – Просто нажмите на кнопку «Хочу бизнес-класс»
                        </p>
                        <p class="business-button-modal__text">
                            – Забронируйте тур с любым перелётом
                        </p>
                        <p class="business-button-modal__text">
                            – Мы скорректируем тариф на бизнесс-класс и пересчитаем стоимость тура
                        </p>
                        <button class="business-button-modal-action" type="button">
                            <span class="business-button-modal-notice" data-visible="false">Мы применим промокод на этапе бронирования.</span>
                            Хочу бизнес-класс
                        </button>
                    </div>
                    
                </div>
            </div>
        `);

        modal = document.querySelector('.business-button-modal');
        const actionButton = modal.querySelector('.business-button-modal-action');
        const notice = modal.querySelector('.business-button-modal-notice');

        updateActionButtonState(actionButton);

        modal.addEventListener('click', (event) => {
            if (
                event.target === modal ||
                event.target.closest('.business-button-modal-close')
            ) {
                reachGoal(96674199, 'reachGoal', 'flight_pop_up', {click: 'close'});
                closeModal(modal);
            }
        });

        actionButton.addEventListener('click', () => {
            reachGoal(96674199, 'reachGoal', 'flight_pop_up', {click: 'yes'});
            setBusinessClassPreference();
            updateActionButtonState(actionButton);
            notice.dataset.visible = 'true';
            if (closeModalTimeout) {
                clearTimeout(closeModalTimeout);
            }
            closeModalTimeout = setTimeout(() => {
                closeModal(modal);
            }, 3000);
        });

        return modal;
    };

    const init = () => {
        const header = document.querySelector('[class*="PackageTourFlightFilter_packageTourFlightFilter"]');
        if (!header) {
            return false;
        }

        if (header.querySelector('[name="business-filter"]')) {
            return true;
        }

        const group = header.querySelector('[class*="PackageTourFlightFilter_packageTourFlightFilterButtons"]');
        if (!group || group.querySelector('.business-button-popup')) {
            return Boolean(group);
        }

        ensureStyles();
        const insertPosition = window.innerWidth < 768 ? 'afterend' : 'beforeend';
        group.insertAdjacentHTML(insertPosition, `
            <div class="business-button-popup" role="button" tabindex="0">
                <svg style="flex-shrink: 0;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M4.81855 3.48493C5.35841 3.06933 5.62836 2.86153 5.93992 2.72769C6.0812 2.66701 6.22808 2.61798 6.37885 2.58117C6.71136 2.5 7.06394 2.5 7.7691 2.5H12.2309C12.9361 2.5 13.2887 2.5 13.6212 2.58117C13.7719 2.61798 13.9189 2.66701 14.0601 2.72769C14.3717 2.86153 14.6416 3.06933 15.1815 3.48493C16.9704 4.86207 17.8649 5.55064 18.1714 6.44232C18.3079 6.83894 18.3588 7.25607 18.3215 7.67051C18.2377 8.60225 17.5316 9.455 16.1194 11.1604L12.7915 15.1794C11.5105 16.7265 10.87 17.5 10 17.5C9.13002 17.5 8.48952 16.7265 7.20851 15.1794L3.88061 11.1604C2.46842 9.455 1.76232 8.60225 1.67852 7.67051C1.64125 7.25607 1.69222 6.83894 1.82861 6.44232C2.13522 5.55064 3.02966 4.86207 4.81855 3.48493Z" stroke="white" stroke-width="1.3"/>
  <path d="M8.33331 7.08334H11.6666" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<span>Бизнес-класс</span>
            </div>
        `);

        const button = header.querySelector('.business-button-popup');
        const modal = ensureModal();
        const notice = modal.querySelector('.business-button-modal-notice');
        const openModal = () => {
            reachGoal(96674199, 'reachGoal', 'flight_pop_up_click_to_show');
            notice.dataset.visible = 'false';
            if (closeModalTimeout) {
                clearTimeout(closeModalTimeout);
                closeModalTimeout = null;
            }
            modal.classList.add('business-button-modal-open');
        };

        button.addEventListener('click', openModal);
        button.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal();
            }
        });

        return true;
    };

    const obs = new MutationObserver(() => {
        if (init()) {
            obs.disconnect();
        }
    });

    obs.observe(document.body, {
        childList: true,
        subtree: true
    });

    init();
    watchBookingStep();
};

initBusinessButton();
