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
        .bf-label {
            position: fixed;
            left: -3px;
            top: 45%;
            background-color: black;
            display: flex;
            border-radius: 0 8px 8px 0;
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
            align-items: center;
            border-radius: 12px;
            background-color: #24242C;
            position: absolute;
            bottom: -150px;
            left: 8px;
            width: 180px;
            transform: translateX(-200px);
            
            @media screen and (max-width: 768px) {
                width: 300px;
                transform: translateX(0);
                
                display: none;
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
            font-size: 14px;
            line-height: 18px;
            margin: 0;
            margin-bottom: 4px;
            
            @media screen and (max-width: 768px) {
                text-align: center;
                font-size: 26px;
                line-height: 36px;
            }
        }
        
        .bf-label__text {
            color: white;
            font-size: 12px;
            line-height: 16px;
            margin: 0;
            
            @media screen and (max-width: 768px) {
                font-size: 18px;
                line-height: 28px;
                text-align: center;
            }
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
        }
        
        .bf-label__close {
            display: none;
            
            @media screen and (max-width: 768px) {
                display: flex;
                position: absolute;
                width: 58px;
                height: 58px;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                background-color: white;
                right: 13px;
                top: 13px;
                border: 1px solid rgba(0, 0, 0, 0.15);
            }
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
                transform: translateX(-200px);
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
                transform: translateX(-200px);
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
    `;
    document.head.appendChild(style);

    const bfLabel = document.createElement('div');
    bfLabel.className = 'bf-label';
    bfLabel.innerHTML = `
        <img class="bf-label__icon js-bf-icon" src="https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/label.webp" alt="">
        
        <div class="bf-label__bg js-bf-bg">
            <div class="bf-label__popup js-bf-popup">
                <div class="bf-label__close js-bf-close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5672 0.544067C15.5677 0.544067 15.5681 0.544534 15.5691 0.545467L16.9155 1.89216C16.9165 1.89286 16.9167 1.89333 16.9169 1.89403C16.917 1.89449 16.917 1.89497 16.9169 1.89543C16.9169 1.89613 16.9165 1.8966 16.9155 1.89753L10.2007 8.61233L16.9155 15.3271C16.9165 15.3281 16.9167 15.3285 16.9169 15.3292C16.9171 15.3298 16.9171 15.3303 16.9169 15.3309C16.9169 15.3313 16.9165 15.3318 16.9155 15.3327L15.5688 16.6792C15.5681 16.6801 15.5677 16.6804 15.5672 16.6806C15.5667 16.6808 15.5661 16.6808 15.5656 16.6806C15.5649 16.6806 15.5644 16.6801 15.5635 16.6792L8.84866 9.9644L2.13386 16.6792C2.13293 16.6801 2.13246 16.6804 2.13176 16.6806C2.13123 16.6808 2.13066 16.6808 2.13012 16.6806C2.12966 16.6806 2.12919 16.6801 2.12826 16.6792L0.781796 15.3325C0.780862 15.3318 0.780629 15.3313 0.780395 15.3309C0.780233 15.3303 0.780233 15.3298 0.780395 15.3292C0.780395 15.3285 0.780862 15.3281 0.781796 15.3271L7.4966 8.61233L0.781796 1.89753C0.780862 1.8966 0.780629 1.89613 0.780395 1.89543C0.780233 1.8949 0.780233 1.89433 0.780395 1.8938C0.780395 1.89333 0.780862 1.89286 0.781796 1.89193L2.12849 0.545467C2.12919 0.544534 2.12966 0.5443 2.13012 0.544067C2.13066 0.543905 2.13123 0.543905 2.13176 0.544067C2.13246 0.544067 2.13293 0.544534 2.13386 0.545467L8.84866 7.26027L15.5635 0.545467C15.5644 0.544534 15.5649 0.5443 15.5656 0.544067C15.5661 0.543905 15.5667 0.543905 15.5672 0.544067Z" fill="#535353"/>
                    </svg>
                </div>
                <span class="bf-label__quote">Реклама. ООО "Центрбронь" erid: 2W5zFHAEDjv</span>
                <img class="bf-label__m-hidden" src="https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/popup_mobile.webp" alt="">
                <img class="bf-label__d-hidden" src="https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/popum_desktop.webp" alt="">
                <div class="bf-label__info">
                    <p class="bf-label__title">
                        Черная пятница –  все по-настоящему!
                    </p>
                    <p class="bf-label__text">
                        Летите туда, где настоящие скидки на настоящие бренды
                    </p>
                    <a href="/" class="bf-label__button js-bf-button">
                        Выбрать тур
                    </a>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(bfLabel);

    const bfLabelIcon = bfLabel.querySelector('.js-bf-icon');
    const bfLabelPopup = bfLabel.querySelector('.js-bf-popup');

    if (window.innerWidth > 768) {
        bfLabelIcon.addEventListener('mouseenter', () => {
            bfLabelPopup.classList.add('visible');
            bfLabelIcon.classList.add('hidden');
            bfLabel.classList.add('hidden');

            bfLabelPopup.classList.remove('on-hide');
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
        });

        bfLabelClose.addEventListener('click', () => {
            bfLabelPopup.classList.remove('visible');
            bfLabelBg.classList.remove('visible');
            bfLabelIcon.classList.remove('hidden');
            bfLabel.classList.remove('hidden');

            bfLabelPopup.classList.add('on-hide');
        });
    }

    const button = document.querySelector('.js-bf-button');

    button.addEventListener('click', (e) => {

        const ymParams = {
            name_stock: {
                black_friday: {
                    name_point: "pop_up",
                },
            },
        }

        ym(96674199, "reachGoal", "entry-point", ymParams);
    });
});