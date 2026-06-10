(function registerActionsABBlock() {
    const TARGET_SELECTOR = '#actions-ab-test';
    const BLOCK_NAME = 'actions';
    const STYLE_ELEMENT_ID = 'mini-page-actions-ab-styles';

    function ensureActionsStyles() {
        let styleElement = document.getElementById(STYLE_ELEMENT_ID);

        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = STYLE_ELEMENT_ID;
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = `
            .actions-ab .wrapper {
                padding: 40px 80px;
            }

            .actions-ab .actions-title-group {
                text-align: center;
            }

            .actions-ab .actions__title-main {
                font-size: 40px;
                margin: 0 0 8px;
                text-align: center;
            }

            .actions-ab .actions__all {
                color: #21366A !important;
                display: inline-block;
                font-weight: 600;
                margin: 0 0 16px;
                text-align: center;
                text-decoration: none !important;
            }

            .actions-ab .actions {
                display: flex;
                gap: 32px;
                margin-top: 24px;
            }

            .actions-ab .actions__slide {
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

            .actions-ab .actions__slide--white .actions__text,
            .actions-ab .actions__slide--white .actions__title {
                color: #fff;
            }

            .actions-ab .actions__label {
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

            .actions-ab .actions__title {
                font-size: 20px;
                font-weight: 600;
                line-height: 28px;
                margin: 0 0 8px;
            }

            .actions-ab .actions__text {
                font-size: 16px;
                line-height: 20px;
            }

            .actions-ab .actions__link {
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

            .actions-ab .actions__link:hover {
                border-color: #077dad !important;
                color: #077dad !important;
            }

            .actions-ab .actions__slide [data-tippy-root] {
                bottom: -80px !important;
            }

            .actions-ab-tooltip-content .copy-button {
                background: transparent;
                border: none;
                cursor: pointer;
            }

            @media screen and (max-width: 992px) {
                .actions-ab .actions {
                    flex-direction: column;
                }
            }

            @media screen and (max-width: 768px) {
                .actions-ab .wrapper {
                    padding: 32px 16px;
                }

                .actions-ab .actions__title-main {
                    font-size: 32px;
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

    function initActionsLabelsTooltip(root) {
        if (typeof window.tippy !== 'function') {
            return;
        }

        const eridList = [
            '2W5zFGUPtQZ',
            '2W5zFJd6NVE',
            '2W5zFHbazy7',
        ];

        root.querySelectorAll('.actions__label').forEach((element, index) => {
            const erid = eridList[index];

            if (!erid || element.dataset.tooltipInitialized === 'true') {
                return;
            }

            element.dataset.tooltipInitialized = 'true';

            window.tippy(element, {
                allowHTML: true,
                animation: 'custom-scale',
                content: `
                    <div class="actions-ab-tooltip-content">
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

    function renderActionsBlock(target) {
        if (!target || target.querySelector(`[data-mini-page-block="${BLOCK_NAME}"]`)) {
            return false;
        }

        ensureActionsStyles();
        target.innerHTML = `
            <section class="actions-ab to-hide-ab" data-mini-page-block="${BLOCK_NAME}">
                <article style="max-width: 1530px; margin: 0 auto;">
                    <div class="wrapper">
                        <div class="actions-title-group">
                            <h2 class="actions__title-main">Наши акции</h2>
                            <a href="https://www.sunmar.ru/info-actions/" target="_blank" class="actions__all">Смотреть все</a>
                        </div>

                        <div class="actions">
                            <div class="actions__slide actions__slide--white" style="background-image: url('https://b2ccdn.sunmar.ru/content/main-page/act_1.webp')">
                                <div class="actions__label">Реклама</div>
                                <h4 class="actions__title">ОчеВИДНАЯ выгода <br> Раннего бронирования</h4>
                                <p class="actions__text">Туры на лето <br> со скидкой до 50%</p>
                                <a href="https://www.sunmar.ru/rb-summer/?banner_on_site=offers-rb-summer/" target="_blank" class="actions__link">Выбрать тур</a>
                            </div>

                            <div class="actions__slide actions__slide--white" style="background-image: url('https://b2ccdn.sunmar.ru/content/main-page/act_2.webp')">
                                <div class="actions__label">Реклама</div>
                                <h4 class="actions__title">Дети отдыхают <br> БЕСПЛАТНО</h4>
                                <p class="actions__text">Выберите <br> лучший семейный отель</p>
                                <a href="https://www.sunmar.ru/directclient/info-actions/besplatnyj-otdyh-dlya-detej/?banner_on_site=offers-besplatnyj-otdyh-dlya-detej" target="_blank" class="actions__link">Выбрать тур</a>
                            </div>

                            <div class="actions__slide actions__slide--white" style="background-image: url('https://b2ccdn.sunmar.ru/content/main-page/act_3.webp')">
                                <div class="actions__label">Реклама</div>
                                <h4 class="actions__title">Теплые планы <br> на холодный сезон</h4>
                                <p class="actions__text">Бронируйте путешествия <br> заранее с выгодой</p>
                                <a href="https://www.sunmar.ru/rb-winter/?banner_on_site=main-rb-winter/" target="_blank" class="actions__link">Выбрать тур</a>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        `;

        initActionsLabelsTooltip(target);
        return true;
    }

    window.MiniPageBlocks = window.MiniPageBlocks || {};
    window.MiniPageBlocks.renderActions = renderActionsBlock;
    window.renderMiniPageBlocks?.();
    document.dispatchEvent(new CustomEvent('miniPageBlockRegistered', {
        detail: {
            name: BLOCK_NAME,
            targetSelector: TARGET_SELECTOR,
        },
    }));
})();
