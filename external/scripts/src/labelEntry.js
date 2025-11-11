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
    const UTM_KEY = 'bf-utm';

    const urlParams = new URLSearchParams(window.location.search);
    const hasTargetUTM = urlParams.get('utm_term') === 'flesh_10000';

    if (hasTargetUTM) {
        localStorage.setItem(UTM_KEY, 'true');
    }

    const hasQuery = localStorage.getItem(UTM_KEY) === 'true';

    if (hasQuery) {
        if (document.querySelector('.bf-label')) {
            return;
        }

        const style = document.createElement('style');
        style.textContent = `
        .bf-label {
            position: fixed;
            left: 24px;

            bottom: 24px;
            display: flex;
           
            z-index: 999;
            
            @media screen and (max-width: 768px) {
                background-color: transparent;
                left: 12px;
                top: unset;
                bottom: 68px;
            }
        }
        
        .bf-label__popup {
            display: flex;
            flex-direction: column;
            
            border-radius: 12px;
            background-color: #24242C;
            position: absolute;
            bottom: 0;
            left: -10px;
            width: 380px;
            transform: translateX(-400px);
            
            @media screen and (max-width: 768px) {
                width: 340px;
                transform: translateX(0);
                
                display: none;
                align-items: center;
            }
        }
        
        .bf-label__info {
            display: flex;
            flex-direction: column;
            padding: 16px;
        }
        
        .bf-label__title {
            color: white;
            font-weight: bold;
            font-size: 16px;
            line-height: 20px;
            margin: 0;
            margin-bottom: 10px;
        }
        
        .bf-label__wrapper .bf-label__text {
            letter-spacing: 2.8px;
            margin-bottom: 6px;
        }
        
        .bf-label__text {
            color: white;
            font-size: 14px;
            line-height: 18px;
            margin: 0;
            
            @media screen and (max-width: 768px) {
                font-size: 12px;
                line-height: 16px;
                
            }
        }
        
        ul.bf-label__text {
            padding-left: 16px;
        }
        
        .bf-label__button {
            display: flex;
            align-items: center;
            background-color: white;
            border-radius: 8px;
            padding-inline: 8px;
            justify-content: center;
            margin-top: 10px;
            color: black;
            text-decoration: none;
            height: 32px;
            
            @media screen and (max-width: 768px) {
                margin-top: 32px;
            }
        }
        
        .bf-label__quote {
            font-size: 6px;
            opacity: 0.5;
            color: white;
            position: absolute;
            top: 8px;
            right: 8px;
            text-align: right;
            
            @media screen and (max-width: 768px) {
                top: 130px;
                width: 100%;
                right: 0;
                text-align: center;
            }
        }
        
        .bf-label__close {
            display: none;
            
            @media screen and (max-width: 768px) {
                display: flex;
                position: absolute;
                width: 42px;
                height: 42px;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                background-color: white;
                right: 10px;
                top: 10px;
                border: 1px solid rgba(0, 0, 0, 0.15);
            }
        }
        
        .bf-label__icon {
            display: flex;
            gap: 8px;
            background-color: black;
            padding: 12px;
            border-radius: 12px;
            align-items: center;
        }
        
        .bf-label__bg.visible {
            
            @media screen and (max-width: 768px) {
                position: fixed;
                width: 100%;
                height: 100%;
                inset: 0;
                background-color: #1b1b1bc9;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        
        .bf-label__popup.visible {
            animation: popupIn 0.5s ease-out forwards;
            
            @media screen and (max-width: 768px) {
                position: relative;
                bottom: unset;
                left: unset;
                animation: none;
                display: flex;
            }
        }
        
        .bf-label__popup.on-hide {
            animation: popupOut 0.5s ease-out forwards;
        }
        
        .bf-label.hidden {
            background-color: transparent;   
        }
        
        .bf-label__icon.hidden {
            animation: popupOut 0.5s ease-out forwards;
        }
        
        @keyframes popupIn {
            0% {
                transform: translateX(-400px);
            }
            
            90% {
               transform: translateX(10px); 
            }
            
            100% {
                transform: translateX(0);
            }
        }
        
        @keyframes popupOut {
            0% {
                transform: translateX(0);
            }
            
            100% {
                transform: translateX(-400px);
            }
        }
        
        .bf-label__d-hidden {
            display: block;
            
            @media screen and (max-width: 768px) {
                display: none;
            }
        }
        
        .bf-label__m-hidden {
            display: none;
            
            @media screen and (max-width: 768px) {
                display: block;
            }
        }
        
        .bf-mb {
            margin-bottom: 14px;
        }
        
        .bf-mobile {
            @media screen and (max-width: 768px) {
                display: none;
            }
        }
        
        .bf-label__code {
            display: flex;
        }
        
        .bf-label__code svg {
            @media screen and (max-width: 768px) {
                width: 79px;
            }
        }
    `;
        document.head.appendChild(style);

        const bfLabel = document.createElement('div');

        bfLabel.className = 'bf-label';
        bfLabel.innerHTML = `
        <div class="bf-label__icon js-bf-icon">
            <img src="https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/bolt.gif" alt="">
            <div class="bf-label__wrapper">
                <p class="bf-label__text">
                    Промокод
                </p>
                <div class="bf-label__code">
                    <svg xmlns="http://www.w3.org/2000/svg" width="89" height="18" viewBox="0 0 89 18" fill="none">
                      <path d="M9.72 15.768C7.656 15.768 5.896 15.48 4.44 14.904C3 14.328 1.896 13.504 1.128 12.432C0.376 11.36 0 10.08 0 8.592C0 7.104 0.376 5.824 1.128 4.752C1.88 3.68 2.976 2.856 4.416 2.28C5.872 1.704 7.632 1.416 9.696 1.416C10.304 1.416 10.904 1.416 11.496 1.416C12.104 1.416 12.704 1.416 13.296 1.416C15.344 1.416 17.088 1.712 18.528 2.304C19.984 2.88 21.088 3.704 21.84 4.776C22.608 5.848 22.992 7.12 22.992 8.592C22.992 10.064 22.608 11.336 21.84 12.408C21.088 13.48 19.984 14.312 18.528 14.904C17.072 15.48 15.32 15.768 13.272 15.768C12.696 15.768 12.104 15.768 11.496 15.768C10.904 15.768 10.312 15.768 9.72 15.768ZM9.336 17.256V14.616L9.384 13.752V3.408L9.336 2.544V0H13.68V2.544L13.608 3.408V13.752L13.68 14.616V17.256H9.336ZM9.84 12.624C10.4 12.624 10.952 12.624 11.496 12.624C12.056 12.624 12.616 12.624 13.176 12.624C14.28 12.624 15.216 12.464 15.984 12.144C16.752 11.824 17.336 11.368 17.736 10.776C18.152 10.184 18.36 9.456 18.36 8.592C18.36 7.728 18.16 7 17.76 6.408C17.36 5.8 16.768 5.344 15.984 5.04C15.216 4.72 14.28 4.56 13.176 4.56C12.616 4.56 12.056 4.56 11.496 4.56C10.952 4.56 10.4 4.56 9.84 4.56C8.72 4.56 7.768 4.72 6.984 5.04C6.216 5.344 5.632 5.792 5.232 6.384C4.832 6.976 4.632 7.712 4.632 8.592C4.632 9.456 4.832 10.192 5.232 10.8C5.632 11.392 6.216 11.848 6.984 12.168C7.768 12.472 8.72 12.624 9.84 12.624Z" fill="white"/>
                      <path d="M25.7091 17.184C25.2771 17.184 24.8851 17.168 24.5331 17.136C24.1811 17.104 23.8611 17.064 23.5731 17.016V13.464C23.7171 13.496 23.9011 13.528 24.1251 13.56C24.3491 13.576 24.5651 13.584 24.7731 13.584C25.2691 13.584 25.6771 13.512 25.9971 13.368C26.3171 13.208 26.5651 12.96 26.7411 12.624C26.9171 12.272 27.0451 11.824 27.1251 11.28C27.2211 10.72 27.2931 10.04 27.3411 9.24L27.8451 0.216H42.6291V17.016H38.0451V3.912H31.9731L31.5411 11.16C31.4451 12.696 31.1811 13.904 30.7491 14.784C30.3171 15.648 29.6851 16.264 28.8531 16.632C28.0371 17 26.9891 17.184 25.7091 17.184Z" fill="white"/>
                      <path d="M46.1269 17.016V0.216H60.0469V3.648H50.6149V7.104H59.2789V10.032H50.6149V13.584H60.0469V17.016H46.1269Z" fill="white"/>
                      <path d="M63.0488 17.016V0.216H67.6328V13.32H73.5608V0.216H78.1448V13.32H84.0728V0.216H88.6568V17.016H63.0488Z" fill="white"/>
                    </svg>
                </div>
            </div>
        </div>
        
        <div class="bf-label__bg js-bf-bg">
            <div class="bf-label__popup js-bf-popup">
                <div class="bf-label__close js-bf-close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5672 0.544067C15.5677 0.544067 15.5681 0.544534 15.5691 0.545467L16.9155 1.89216C16.9165 1.89286 16.9167 1.89333 16.9169 1.89403C16.917 1.89449 16.917 1.89497 16.9169 1.89543C16.9169 1.89613 16.9165 1.8966 16.9155 1.89753L10.2007 8.61233L16.9155 15.3271C16.9165 15.3281 16.9167 15.3285 16.9169 15.3292C16.9171 15.3298 16.9171 15.3303 16.9169 15.3309C16.9169 15.3313 16.9165 15.3318 16.9155 15.3327L15.5688 16.6792C15.5681 16.6801 15.5677 16.6804 15.5672 16.6806C15.5667 16.6808 15.5661 16.6808 15.5656 16.6806C15.5649 16.6806 15.5644 16.6801 15.5635 16.6792L8.84866 9.9644L2.13386 16.6792C2.13293 16.6801 2.13246 16.6804 2.13176 16.6806C2.13123 16.6808 2.13066 16.6808 2.13012 16.6806C2.12966 16.6806 2.12919 16.6801 2.12826 16.6792L0.781796 15.3325C0.780862 15.3318 0.780629 15.3313 0.780395 15.3309C0.780233 15.3303 0.780233 15.3298 0.780395 15.3292C0.780395 15.3285 0.780862 15.3281 0.781796 15.3271L7.4966 8.61233L0.781796 1.89753C0.780862 1.8966 0.780629 1.89613 0.780395 1.89543C0.780233 1.8949 0.780233 1.89433 0.780395 1.8938C0.780395 1.89333 0.780862 1.89286 0.781796 1.89193L2.12849 0.545467C2.12919 0.544534 2.12966 0.5443 2.13012 0.544067C2.13066 0.543905 2.13123 0.543905 2.13176 0.544067C2.13246 0.544067 2.13293 0.544534 2.13386 0.545467L8.84866 7.26027L15.5635 0.545467C15.5644 0.544534 15.5649 0.5443 15.5656 0.544067C15.5661 0.543905 15.5667 0.543905 15.5672 0.544067Z" fill="#535353"/>
                    </svg>
                </div>
                <span class="bf-label__quote">Реклама. ООО "Центрбронь" <br class="bf-mobile"> erid: 2W5zFHgQtSc</span>
                <img class="bf-label__m-hidden" src="https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/flash.webp" alt="">
                <img class="bf-label__d-hidden" src="https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/flash_m.webp" alt="">
                <div class="bf-label__info">
                    <p class="bf-label__title">
                        Секретная скидка к Черной пятнице
                    </p>
                    <p class="bf-label__text bf-mb">
                        Вы поймали секретную скидку 10 000 ₽
                        на путешествия. Она действует на туры и бронирования отелей.
                        Чтобы активировать скидку, введите промокод «ФЛЕШ» в поле «Примечание к заказу».
                    </p>
                    <p class="bf-label__title">
                        Условия применения скидки:
                    </p>
                    <ul class="bf-label__text">
                        <li>
                            Срок жизни промокода 7 дней: 11–17 ноября.  
                            от 200&nbsp;000 ₽. 
                        </li>
                        <li>
                            Промокод действует при бронированиях
                        </li>
                        <li>
                            Акция не распространяется на РФ, СНГ и Грузию.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;

        document.body.appendChild(bfLabel);

        ym(96674199, 'reachGoal', 'pop_up_flesh_show');

        const bfLabelIcon = bfLabel.querySelector('.js-bf-icon');
        const bfLabelPopup = bfLabel.querySelector('.js-bf-popup');

        if (window.innerWidth > 768) {
            bfLabelIcon.addEventListener('mouseenter', () => {
                bfLabelPopup.classList.add('visible');
                bfLabelIcon.classList.add('hidden');
                bfLabel.classList.add('hidden');

                bfLabelPopup.classList.remove('on-hide');

                ym(96674199, 'reachGoal', 'pop_up_flesh_open');
            });

            bfLabelPopup.addEventListener('mouseleave', () => {
                bfLabelPopup.classList.remove('visible');
                bfLabelIcon.classList.remove('hidden');
                bfLabel.classList.remove('hidden');

                bfLabelPopup.classList.add('on-hide');
            });
        } else {
            const bfLabelBg = bfLabel.querySelector('.js-bf-bg');
            const bfLabelClose = bfLabel.querySelector('.js-bf-close');


            bfLabelIcon.addEventListener('click', () => {
                bfLabelPopup.classList.add('visible');
                bfLabelBg.classList.add('visible');
                bfLabelIcon.classList.add('hidden');
                bfLabel.classList.add('hidden');

                bfLabelPopup.classList.remove('on-hide');

                ym(96674199, 'reachGoal', 'pop_up_flesh_open');
            });

            bfLabelClose.addEventListener('click', () => {
                bfLabelPopup.classList.remove('visible');
                bfLabelBg.classList.remove('visible');
                bfLabelIcon.classList.remove('hidden');
                bfLabel.classList.remove('hidden');

                bfLabelPopup.classList.add('on-hide');
            });
        }
    }
});