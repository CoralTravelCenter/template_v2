(function registerBonusABBlock() {
    const TARGET_SELECTOR = '#bonus-ab';
    const BLOCK_NAME = 'bonus';
    const STYLE_ELEMENT_ID = 'mini-page-bonus-ab-styles';

    function ensureBonusStyles() {
        let styleElement = document.getElementById(STYLE_ELEMENT_ID);

        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = STYLE_ELEMENT_ID;
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = `
            .bonus-ab .wrapper.wrapper--wide {
                padding-inline: 0;
            }

            .bonus-ab .bonus {
                display: flex;
                gap: 32px;
            }

            .bonus-ab .bonus__slide {
                background-position: 50%;
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 24px;
                display: flex;
                flex: 1;
                flex-direction: column;
                min-height: 244px;
                padding: 20px;
                position: relative;
            }

            .bonus-ab .bonus__slide--white .bonus__text,
            .bonus-ab .bonus__slide--white .bonus__title {
                color: #fff;
            }

            .bonus-ab .bonus__label {
                -webkit-backdrop-filter: blur(1px);
                align-items: center;
                backdrop-filter: blur(1px);
                background-color: rgba(255, 255, 255, .5);
                border-radius: 16px;
                display: flex;
                font-size: 12px;
                height: 32px;
                padding-left: 14px;
                padding-right: 14px;
                position: absolute;
                right: 16px;
                top: 16px;
            }

            .bonus-ab .bonus__title {
                font-size: 32px;
                font-weight: 600;
                line-height: 36px;
                margin: 0 0 8px;
            }

            .bonus-ab .bonus__text {
                font-size: 16px;
                line-height: 20px;
            }

            .bonus-ab .bonus__link {
                align-items: center;
                background-color: #fff;
                border: 1px solid #fff;
                border-radius: 50px;
                color: inherit !important;
                display: flex;
                font-size: 16px;
                height: 48px;
                margin-top: auto;
                padding-left: 24px;
                padding-right: 24px;
                text-decoration: none !important;
                width: fit-content;
            }

            .bonus-ab .bonus__link:hover {
                border-color: #077dad !important;
                color: #077dad !important;
            }

            .bonus-ab [data-tippy-root] {
                bottom: -80px !important;
            }

            .bonus-ab-tooltip-content .copy-button {
                background: transparent;
                border: none;
                cursor: pointer;
            }

            @media screen and (max-width: 992px) {
                .bonus-ab .bonus {
                    flex-direction: column;
                }
            }
        `;
    }

    function copyToClipboard(element) {
        if (!element?.textContent || !navigator.clipboard) {
            return;
        }

        navigator.clipboard.writeText(element.textContent).catch(error => {
            console.error('Ошибка при копировании текста: ', error);
        });
    }

    function initBonusLabelsTooltip(root) {
        if (typeof window.tippy !== 'function') {
            return;
        }

        const eridList = [
            '2W5zFGwQon1',
            '2W5zFJvhN4q',
        ];

        root.querySelectorAll('.bonus__label').forEach((element, index) => {
            const erid = eridList[index];

            if (!erid || element.dataset.tooltipInitialized === 'true') {
                return;
            }

            element.dataset.tooltipInitialized = 'true';

            window.tippy(element, {
                allowHTML: true,
                animation: 'custom-scale',
                content: `
                    <div class="bonus-ab-tooltip-content">
                        <p>ООО «МирТурСервис»&nbsp;erid: <span class="erid-value">${erid}</span></p>
                        <button class="copy-button" type="button" aria-label="Скопировать erid">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 1H4.625C4.55625 1 4.5 1.05625 4.5 1.125V2C4.5 2.06875 4.55625 2.125 4.625 2.125H12.375V12.875C12.375 12.9438 12.4312 13 12.5 13H13.375C13.4438 13 13.5 12.9438 13.5 12.875V1.5C13.5 1.22344 13.2766 1 13 1ZM11 3H3C2.72344 3 2.5 3.22344 2.5 3.5V11.7922C2.5 11.925 2.55312 12.0516 2.64687 12.1453L5.35469 14.8531C5.38906 14.8875 5.42813 14.9156 5.47031 14.9391V14.9688H5.53594C5.59062 14.9891 5.64844 15 5.70781 15H11C11.2766 15 11.5 14.7766 11.5 14.5V3.5C11.5 3.22344 11.2766 3 11 3ZM5.46875 13.3781L4.12344 12.0312H5.46875V13.3781ZM10.375 13.875H6.46875V11.6562C6.46875 11.3109 6.18906 11.0312 5.84375 11.0312H3.625V4.125H10.375V13.875Z" fill="#535353"></path>
                            </svg>
                        </button>
                    </div>
                `,
                interactive: true,
                onMount(instance) {
                    instance.popper.querySelector('.copy-button')?.addEventListener('click', () => {
                        copyToClipboard(instance.popper.querySelector('.erid-value'));
                        instance.hide();
                    });
                },
                placement: 'top-end',
            });
        });
    }

    function renderBonusBlock(target) {
        if (!target || target.querySelector(`[data-mini-page-block="${BLOCK_NAME}"]`)) {
            return false;
        }

        ensureBonusStyles();
        target.innerHTML = `
            <section class="coral bonus-ab to-hide-ab" data-mini-page-block="${BLOCK_NAME}">
                <article>
                    <div class="wrapper wrapper--wide">
                        <div class="bonus">
                            <div class="bonus__slide bonus__slide--white" style="background-image: url('https://b2ccdn.sunmar.ru/content/main-page/bonus_1.webp')">
                                <div class="bonus__label">Реклама</div>
                                <h4 class="bonus__title">SunmarBonus</h4>
                                <p class="bonus__text">
                                    Активируйте бонусную карту <br>
                                    1 000 приветственных бонусов на счет <br>
                                    1 бонус + 1 рубль
                                </p>
                                <a href="https://www.sunmar.ru/info-actions/programma-loyalynosti-sunmarbonus/?banner_on_site=sb" target="_blank" class="bonus__link">Оформить карту</a>
                            </div>

                            <div class="bonus__slide bonus__slide--white" style="background-image: url('https://b2ccdn.sunmar.ru/content/main-page/bonus_2.webp')">
                                <div class="bonus__label">Реклама</div>
                                <h4 class="bonus__title">Горящие <br> предложения</h4>
                                <p class="bonus__text">Для туристов, которые хотят улететь <br>&nbsp; в ближайшее время</p>
                                <a href="https://www.sunmar.ru/directclient-rassrochka/?banner_on_site=square-kredit-smr" target="_blank" class="bonus__link">Узнать больше</a>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        `;

        initBonusLabelsTooltip(target);
        return true;
    }

    window.MiniPageBlocks = window.MiniPageBlocks || {};
    window.MiniPageBlocks.renderBonus = renderBonusBlock;
    window.renderMiniPageBlocks?.();
    document.dispatchEvent(new CustomEvent('miniPageBlockRegistered', {
        detail: {
            name: BLOCK_NAME,
            targetSelector: TARGET_SELECTOR,
        },
    }));
})();
