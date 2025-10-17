async function hostReactAppReady(selector = '#__next > div', timeout = 500) {
    return new Promise(resolve => {
        const waiter = () => {
            const host_el = document.querySelector(selector);
            if (host_el?.getBoundingClientRect().height) {
                resolve();
            } else {
                setTimeout(waiter, timeout);
            }
        };
        waiter();
    });
}

hostReactAppReady().then(() => {
    const style = document.createElement('style');

    style.textContent = `
                .seo-banner {
                    display: flex;
                    gap: 24px;
                    margin-block: 24px;
                    min-height: 400px;
                    
                    @media screen and (max-width: 1023px) {
                        flex-direction: column;
                        min-height: unset;
                    }
                }
                
                .seo-banner.seo-banner--with-menu {
                    flex-direction: column;
                }
                
                .seo-banner.seo-banner--with-menu .seo-banner__col-left {
                    background-image: url('https://b2ccdn.coral.ru/content/seo-banner/banner_768.webp');
                    min-height: 326px;
                    padding: 24px;
                    
                    @media screen and (max-width: 767px) {
                        background-image: url('https://b2ccdn.coral.ru/content/seo-banner/banner_m.webp');
                    }
                }
                
                .seo-banner.seo-banner--with-menu .seo-banner__col-right {
                    max-width: unset;
                    min-height: 326px;
                    padding: 24px;
                }
                
                .seo-banner p {
                    margin: 0
                }
                
                .seo-banner__col-left {
                    background-image: url('https://b2ccdn.coral.ru/content/seo-banner/banner_1440.webp');
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center left;
                    border-radius: 20px;
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    
                    @media screen and (max-width: 1439px) {
                        background-image: url('https://b2ccdn.coral.ru/content/seo-banner/banner_1280.webp');
                    }
                    
                    @media screen and (max-width: 1279px) {
                        background-image: url('https://b2ccdn.coral.ru/content/seo-banner/banner_1024.webp');
                        padding: 20px;
                    }
                    
                    @media screen and (max-width: 1023px) {
                        background-image: url('https://b2ccdn.coral.ru/content/seo-banner/banner_768.webp');
                        min-height: 326px;
                    }
                    
                    @media screen and (max-width: 767px) {
                        background-image: url('https://b2ccdn.coral.ru/content/seo-banner/banner_m.webp');
                        min-height: 392px;
                    }
                }
                
                .seo-banner__label {
                    padding-inline: 12px;
                    padding-block: 6px;
                    border-radius: 8px;
                    background-color: rgba(0, 146, 208, 0.80);
                    color: white;
                    font-size: 16px;
                    width: fit-content;
                    margin-bottom: 12px;
                }
                
                p.seo-banner__title {
                    font-size: 36px;
                    font-weight: 600;
                    line-height: 44px;
                    color: white;
                    margin-bottom: 12px;
                    
                    @media screen and (max-width: 1439px) {
                        font-size: 32px;
                        line-height: 40px;
                    }
                }
                
                p.seo-banner__subtitle {
                    font-size: 18px;
                    color: white;
                    line-height: 24px;
                }
                
                .seo-banner__button {
                    display: flex;
                    align-items: center;
                    padding-inline: 32px;
                    border-radius: 48px;
                    color: black!important;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none!important;
                    background-color: white;
                    height: 48px;
                    width: fit-content;
                    margin-top: auto;
                    border: 1px solid transparent;
                    
                    @media screen and (max-width: 1279px) {
                        margin-top: 16px;
                    }
                    
                    @media screen and (max-width: 1023px) {
                        margin-top: auto;
                    }
                    
                    @media screen and (max-width: 767px) {
                        margin-top: 16px;
                    }
                }
                
                .seo-banner__button:hover {
                    border-color: rgba(0, 146, 208, 0.80);
                }
                
                .seo-banner__col-right {
                    border-radius: 20px;
                    background: linear-gradient(95deg, rgba(186, 224, 255, 0.00) -14.04%, rgba(186, 224, 255, 0.50) 42.38%, rgba(147, 200, 243, 0.50) 141.68%);
                    backdrop-filter: blur(26.19344711303711px);
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    max-width: 556px;
                    
                    @media screen and (max-width: 1279px) {
                        padding: 20px;
                    }
                    
                    @media screen and (max-width: 1023px) {
                        max-width: unset;
                        min-height: 326px;
                    }
                    
                    @media screen and (max-width: 767px) {
                        min-height: 392px;
                    }
                }
                
                .seo-banner__col-right .seo-banner__title {
                    color: black;
                }
                
                .seo-banner__list {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }
                
                .seo-banner__list p {
                    font-size: 16px;
                }
                
                .seo-banner__list + .seo-banner__list {
                    margin-top: 16px;
                }
                
                p.seo-banner__text {
                    font-size: 16px;
                    margin-top: auto;
                }
            `;

    document.body.appendChild(style);

    const obs = new MutationObserver(() => {
        const hotelsBlock = document.querySelector('div[data-v-app]');
        const hotDealsBlock = document.querySelector('.hot-deals-block');


        obs.disconnect();

        const siblingMenu = document.querySelectorAll('.sibling-menu');

        const bannerBlock = document.createElement('div');

        bannerBlock.classList.add('seo-banner');

        if (siblingMenu.length > 0) {
            bannerBlock.classList.add('seo-banner--with-menu');
        }

        bannerBlock.innerHTML = `
                <div class="seo-banner__col-left">
                    <div class="seo-banner__label">
                        Акция «Раннее бронирование ЛЕТО 2026»
                    </div>
                    <p class="seo-banner__title">
                        Бронируйте лето 2026 <br> со скидкой до 50%
                    </p>
                    <p class="seo-banner__subtitle">
                        Все путешествия исполнятся!
                    </p>
                    <a href="https://www.coral.ru/hot-offers/rannee-bronirovanie-leto/" class="seo-banner__button">
                        Узнать больше
                    </a>
                </div> 
                <div class="seo-banner__col-right">
                    <p class="seo-banner__title">
                        Условия акции
                    </p>
                    <div class="seo-banner__list">
                        <img src="https://b2ccdn.coral.ru/content/seo-banner/icon_1.webp" alt="">
                        <div>
                            <p>
                                <strong>Даты&nbsp;бронирования</strong> с&nbsp;01.09.2025&nbsp;по&nbsp;31.12.2025&nbsp;г.
                            </p>
                        </div>
                    </div>
                    <div class="seo-banner__list">
                        <img src="https://b2ccdn.coral.ru/content/seo-banner/icon_2.webp" alt="">
                        <div>
                            <p>
                                <strong>Даты&nbsp;начала&nbsp;отдыха</strong> с&nbsp;01.04.2026&nbsp;по&nbsp;31.10.2026&nbsp;г.  
                            </p>
                        </div>
                    </div>
                    <div class="seo-banner__list">
                        <img src="https://b2ccdn.coral.ru/content/seo-banner/icon_3.webp" alt="">
                        <div>
                            <p>
                                <strong>Направления</strong> Турция&nbsp;и&nbsp;Египет  
                            </p>
                        </div>
                    </div>
                    <p class="seo-banner__text">
                        <strong>Предоплата 10%</strong> в течение 3-х рабочих дней с момента подтверждения, 100% за 11 
                        рабочих дней до начала тура (Турция, Египет)
                    </p>
                </div> 
            `;

        let inserted = false;

        if (hotelsBlock) {
            hotelsBlock.insertAdjacentElement('beforebegin', bannerBlock);
            inserted = true;
            obs.disconnect();
        } else if (hotDealsBlock) {
            hotDealsBlock.insertAdjacentElement('beforebegin', bannerBlock);
            inserted = true;
            obs.disconnect();
        }

    });

    obs.observe(document, {
        childList: true,
        subtree: true,
    });
});