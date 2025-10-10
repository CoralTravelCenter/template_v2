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
                }
                
                .bf-label__popup {
                    display: none;
                    flex-direction: column;
                    align-items: center;
                    border-radius: 12px;
                    background-color: #24242C;
                    position: absolute;
                    bottom: -200px;
                    left: 8px;
                    width: 180px;
                    
                    // transition: 0.3s all ease-in-out;
                }
                
                .bf-label__icon {
                    // transition: 0.3s all ease-in-out;
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
                }
                
                .bf-label__text {
                    color: white;
                    font-size: 12px;
                    line-height: 16px;
                    margin: 0;
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
                }
                
                .bf-label__quote {
                    font-size: 6px;
                    opacity: 0.5;
                    color: white;
                    position: absolute;
                    top: 8px;
                }
                
                .bf-label__popup.visible {
                    display: flex;
                    animation: left 0.5s ease-out;
                    animation-fill-mode: forwards;
                }
                
                .bf-label__icon.hidden {
                    display: none;
                }
                
                @keyframes left {
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
            `;
    document.head.appendChild(style);

    const bfLabel = document.createElement('div');
    bfLabel.className = 'bf-label';
    bfLabel.innerHTML = `
        <img class="bf-label__icon js-bf-icon" src="https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/label.webp" alt="">
        
        <div class="bf-label__popup js-bf-popup">
            <span class="bf-label__quote">Реклама. ООО "Центрбронь" erid: 2W5zFHAEDjv</span>
            <img src="https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/popum_desktop.webp" alt="">
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
    `;

    document.body.appendChild(bfLabel);

    const bfLabelIcon = bfLabel.querySelector('.js-bf-icon');
    const bfLabelPopup = bfLabel.querySelector('.js-bf-popup');

    bfLabelIcon.addEventListener('mouseenter', () => {
        bfLabelPopup.classList.add('visible');
        bfLabelIcon.classList.add('hidden');
    });

    bfLabelPopup.addEventListener('mouseleave', () => {
        bfLabelPopup.classList.remove('visible');
        bfLabelIcon.classList.remove('hidden');
    });

    const button = document.querySelector('.js-bf-button');

    button.addEventListener('click', () => {
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