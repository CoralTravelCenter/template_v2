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
                    
                    @media screen and (max-width: 767px) {
                        padding-inline: 16px;
                    }
                }
                
                .seo-banner.seo-banner--with-menu {
                    flex-direction: column;
                }
                
                .seo-banner.seo-banner--with-menu .seo-banner__col-left {
                    background-image: url('https://b2ccdn.sunmar.ru/content/banner/rb/banner_768.webp');
                    min-height: 326px;
                    padding: 24px;
                    
                    @media screen and (max-width: 767px) {
                        background-image: url('https://b2ccdn.sunmar.ru/content/banner/rb/banner_m.webp');
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
                    background-image: url('https://b2ccdn.sunmar.ru/content/banner/rb/banner_1440.webp');
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center left;
                    border-radius: 20px;
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    
                    @media screen and (max-width: 1439px) {
                        background-image: url('https://b2ccdn.sunmar.ru/content/banner/rb/banner_1280.webp');
                    }
                    
                    @media screen and (max-width: 1279px) {
                        background-image: url('https://b2ccdn.sunmar.ru/content/banner/rb/banner_1024.webp');
                        padding: 20px;
                    }
                    
                    @media screen and (max-width: 1023px) {
                        background-image: url('https://b2ccdn.sunmar.ru/content/banner/rb/banner_768.webp');
                        min-height: 326px;
                    }
                    
                    @media screen and (max-width: 767px) {
                        background-image: url('https://b2ccdn.sunmar.ru/content/banner/rb/banner_m.webp');
                        min-height: 392px;
                    }
                }
                
                .seo-banner__label {
                    padding-inline: 24px;
                    padding-block: 6px;
                    border-radius: 80px;
                    background: linear-gradient(245deg, var(--Gradient-color_Gradient_Primary_First, rgba(231, 49, 125, 0.88)) 15.84%, var(--Gradient-color_Gradinet_Primary_Second, rgba(216, 36, 42, 0.88)) 84.16%);
                    color: white;
                    font-size: 16px;
                    width: fit-content;
                    margin-bottom: 12px;
                }
                
                p.seo-banner__title {
                    font-size: 40px;
                    font-weight: 600;
                    line-height: 44px;
                    color: #0E2855;
                    margin-bottom: 12px;
                    
                    @media screen and (max-width: 1439px) {
                        font-size: 32px;
                        line-height: 40px;
                    }
                    
                    @media screen and (max-width: 1279px) {
                        font-size: 28px;
                        line-height: 32px;
                        color: white;
                    }
                    
                    @media screen and (max-width: 1023px) {
                        font-size: 32px;
                        line-height: 36px;
                        color: #0E2855;
                    }
                    
                    @media screen and (max-width: 767px) {
                        color: white;
                    }
                }
                
                p.seo-banner__subtitle {
                    font-size: 16px;
                    color: #0E2855;
                    line-height: 24px;
                    
                    @media screen and (max-width: 1279px) {
                        color: white;
                    }
                    
                    @media screen and (max-width: 1023px) {
                        color: #0E2855;
                    }
                    
                    @media screen and (max-width: 767px) {
                        color: white;
                    }
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
                    margin-top: 24px;
                    border: 1px solid transparent;
                }
                
                .seo-banner__button:hover {
                    border-color: rgba(231, 49, 125, 0.88);
                }
                
                .seo-banner__col-right {
                    border-radius: 20px;
                    background-image: url(https://b2ccdn.sunmar.ru/content/banner/rb/banner_2.webp);
                    background-repeat: no-repeat;
                    background-size: cover;
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
                
                .seo-banner__list svg {
                    flex-shrink: 0;
                }
                
                .seo-banner__list p {
                    font-size: 16px;
                    color: white;
                }
                
                .seo-banner__list + .seo-banner__list {
                    margin-top: 16px;
                }
                
                p.seo-banner__text {
                    font-size: 16px;
                    margin-top: auto;
                }
                
                .seo-banner__title.seo-banner__title--sunmar {
                    font-size: 32px;
                    line-height: 36px;
                    color: white;
                }
            `;

    document.body.appendChild(style);

    const obs = new MutationObserver(() => {
        const hotelsBlock = document.querySelector('div[data-v-app]');
        const hotDealsBlock = document.querySelector('.hot-deals-block');

        console.log(hotelsBlock);

        const siblingMenu = document.querySelectorAll('.sibling-menu');

        const bannerBlock = document.createElement('div');

        bannerBlock.classList.add('seo-banner');

        if (siblingMenu.length > 0) {
            bannerBlock.classList.add('seo-banner--with-menu');
        }

        bannerBlock.innerHTML = `
                <div class="seo-banner__col-left">
                    <div class="seo-banner__label">
                        Турция и Египет
                    </div>
                    <p class="seo-banner__title">
                        Раннее бронирование <br> на лето 2026
                    </p>
                    <p class="seo-banner__subtitle">
                        Предоплата 10% и лучшие цены на отдых
                    </p>
                    <a href="https://www.coral.ru/hot-offers/rannee-bronirovanie-leto/" class="seo-banner__button">
                        Узнать больше
                    </a>
                </div> 
                <div class="seo-banner__col-right">
                    <p class="seo-banner__title seo-banner__title--sunmar">
                        Условия акции
                    </p>
                    <div class="seo-banner__list">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M5 13.5L9 17.5L19 7.5" stroke="url(#paint0_linear_66_25461)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <defs>
    <linearGradient id="paint0_linear_66_25461" x1="19" y1="7.5" x2="9.54054" y2="20.7432" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E7317D"/>
      <stop offset="1" stop-color="#D8242A"/>
    </linearGradient>
  </defs>
</svg>
                        <div>
                            <p>
                                Скидки до 50%
                            </p>
                        </div>
                    </div>
                    <div class="seo-banner__list">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M5 13.5L9 17.5L19 7.5" stroke="url(#paint0_linear_66_25461)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <defs>
    <linearGradient id="paint0_linear_66_25461" x1="19" y1="7.5" x2="9.54054" y2="20.7432" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E7317D"/>
      <stop offset="1" stop-color="#D8242A"/>
    </linearGradient>
  </defs>
</svg>
                        <div>
                            <p>
                                <strong>Даты бронирования:</strong> с 01.09.2025 до 31.12.2025 г.   
                            </p>
                        </div>
                    </div>
                    <div class="seo-banner__list">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M5 13.5L9 17.5L19 7.5" stroke="url(#paint0_linear_66_25461)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <defs>
    <linearGradient id="paint0_linear_66_25461" x1="19" y1="7.5" x2="9.54054" y2="20.7432" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E7317D"/>
      <stop offset="1" stop-color="#D8242A"/>
    </linearGradient>
  </defs>
</svg>
                        <div>
                            <p>
                                <strong>Даты проживания:</strong> с 01.04.2026 по 31.10.2026 г.   
                            </p>
                        </div>
                    </div>
                    
                    <div class="seo-banner__list">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M5 13.5L9 17.5L19 7.5" stroke="url(#paint0_linear_66_25461)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <defs>
    <linearGradient id="paint0_linear_66_25461" x1="19" y1="7.5" x2="9.54054" y2="20.7432" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E7317D"/>
      <stop offset="1" stop-color="#D8242A"/>
    </linearGradient>
  </defs>
</svg>
                        <div>
                            <p>
                                <strong>Направления, участвующие в акции:</strong> Турция&nbsp;и&nbsp;Египет  
                            </p>
                        </div>
                    </div>
                    
                    <div class="seo-banner__list">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M5 13.5L9 17.5L19 7.5" stroke="url(#paint0_linear_66_25461)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <defs>
    <linearGradient id="paint0_linear_66_25461" x1="19" y1="7.5" x2="9.54054" y2="20.7432" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E7317D"/>
      <stop offset="1" stop-color="#D8242A"/>
    </linearGradient>
  </defs>
</svg>
                        <div>
                            <p>
                                <strong>Предоплата:</strong>  10% в течение 3-х рабочих дней с момента подтверждения тура, 100% за 11 рабочих дней до начала тура (Турция, Египет)  
                                
                            </p>
                        </div>
                    </div>

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