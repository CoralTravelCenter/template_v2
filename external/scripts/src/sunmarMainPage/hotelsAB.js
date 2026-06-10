(function registerHotelsABBlock() {
    const TARGET_SELECTOR = '#living-hotel-ab';
    const BLOCK_NAME = 'living-hotel';
    const STYLE_ELEMENT_ID = 'mini-page-hotels-ab-styles';

    function ensureHotelsStyles() {
        let styleElement = document.getElementById(STYLE_ELEMENT_ID);

        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = STYLE_ELEMENT_ID;
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = `
            .sunmar-buy-hotel {
                background: #f5f5f8;
            }

            .sunmar-buy-hotel .wrapper {
                padding: 40px 80px;
            }

            .sunmar-buy-hotel .buy-hotel {
                align-items: center;
                display: flex;
                justify-content: space-between;
                position: relative;
            }

            .sunmar-buy-hotel .buy-hotel::after {
                background-image: url('https://b2ccdn.sunmar.ru/content/main-page/hotel.webp');
                background-repeat: no-repeat;
                background-size: cover;
                bottom: -40px;
                content: '';
                height: 290px;
                position: absolute;
                right: 0;
                width: 500px;
            }

            .sunmar-buy-hotel .buy-hotel__title {
                font-size: 40px;
                line-height: 44px;
                margin: 0 0 8px;
            }

            .sunmar-buy-hotel .buy-hotel__info {
                display: flex;
                flex-direction: column;
                gap: 24px;
                max-width: 65%;
            }

            .sunmar-buy-hotel .buy-hotel__text {
                font-size: 20px;
                margin: 0;
            }

            .sunmar-buy-hotel .buy-hotel__text span {
                color: #C20E1A;
            }

            @media screen and (max-width: 768px) {
                .sunmar-buy-hotel .wrapper {
                    padding: 32px 16px;
                }

                .sunmar-buy-hotel .buy-hotel {
                    padding-bottom: 260px;
                }

                .sunmar-buy-hotel .buy-hotel::after {
                    background-position: center;
                    background-size: contain;
                    bottom: -32px;
                    max-width: 100%;
                    width: 100%;
                }

                .sunmar-buy-hotel .buy-hotel__info {
                    max-width: 100%;
                }

                .sunmar-buy-hotel .buy-hotel__title {
                    font-size: 32px;
                    line-height: 36px;
                }
            }
        `;
    }

    function renderHotelsBlock(target) {
        if (!target || target.querySelector(`[data-mini-page-block="${BLOCK_NAME}"]`)) {
            return false;
        }

        ensureHotelsStyles();
        target.innerHTML = `
            <section class="sunmar-buy-hotel to-hide-ab" data-mini-page-block="${BLOCK_NAME}">
                <article style="max-width: 1530px; margin: 0 auto;">
                    <div class="wrapper">
                        <div class="buy-hotel">
                            <div class="buy-hotel__info">
                                <h3 class="buy-hotel__title">А еще у нас можно купить проживание в отеле</h3>
                                <p class="buy-hotel__text"><span>1</span> Выберите направление, даты отдыха и&nbsp;количество туристов</p>
                                <p class="buy-hotel__text"><span>2</span> Подберите подходящий тип&nbsp;номера и&nbsp;питания в&nbsp;понравившемся отеле</p>
                                <p class="buy-hotel__text"><span>3</span> Заполните данные, дождитесь подтверждения бронирования и оплатите</p>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        `;

        return true;
    }

    window.MiniPageBlocks = window.MiniPageBlocks || {};
    window.MiniPageBlocks.renderHotels = renderHotelsBlock;
    window.renderMiniPageBlocks?.();
    document.dispatchEvent(new CustomEvent('miniPageBlockRegistered', {
        detail: {
            name: BLOCK_NAME,
            targetSelector: TARGET_SELECTOR,
        },
    }));
})();
