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
    if (!document.querySelector('#michelin-style')) {
        const style = document.createElement('style');
        style.id = 'michelin-style';
        style.textContent = `
            .seal {
                z-index: 9999;
                margin-top: 16px;
            }
            
            .seal__wrapper {
                display: flex;
                align-items: center;
                padding-left: 14px;
                background-image: url('https://b2ccdn.coral.ru/content/landing-pages/new-rb-timer/rbsummer.webp');
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                height: 56px;
                position: relative;
            }
            
            .seal__text {
                font-size: 14px;
                line-height: 18px;
                font-weight: 600;
            }
            
            .seal__tooltip {
                display: none;
                padding: 12px;
                position: absolute;
                background-color: #CCE9F6;
                border-radius: 12px;
                z-index: 9999;
            }
            
            .seal__tooltip ul {
                margin: 0;
                padding-left: 16px;
            }
            
            .seal__tooltip:after {
                content: '';
                position: absolute;
                background-color: #CCE9F6;
                width: 16px;
                height: 16px;
                transform: rotate(45deg);
                border-radius: 2px;
                left: 48%;
                bottom: -5px;
            }
            
            .seal:hover .seal__tooltip {
                display: flex;
                top: -110px;
            }
            
            .seal-m {
                background-image: url('https://b2ccdn.coral.ru/content/landing-pages/new-rb-timer/rbsummer_m.webp');
                background-repeat: no-repeat;
                background-position: right;
                background-size: cover;
                padding: 14px;
                border-radius: 8px;
                max-width: 363px;
                margin-top: 16px;
            }
            
            .seal-m ul {
                padding-left: 16px;
                font-size: 12px;
                margin: 0;
            }
            
            .seal-m__title {
                margin: 0;
                margin-bottom: 8px;
                font-size: 14px;
            }
        `;
        document.body.appendChild(style);
    }

    const michelinHTML = `
        <div class="seal">
            <div class="seal__wrapper">
                <p class="seal__text">
                    Раннее бронирование – <br> инвестиция в летний отдых
                </p>
                <div class="seal__tooltip">
                    <ul>
                        <li>
                            Отель участвует в акции 
                        </li>
                        <li>
                            Предоплата 20% от цены
                        </li>
                        <li>
                            Скидки до 50% 
                        </li>
                        <li>
                            8 000 бонусов CB на летний отдых
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    const sealMarkup = `
        <div class="seal-m">
            <h4 class="seal-m__title">
                Участвует в Раннем Бронировании
            </h4>
            <ul>
                <li>
                    Предоплата 20% от цены
                </li>
                <li>
                    Скидки до 50%
                </li>
                <li>
                    Оплата в рассрочку или кредит
                </li>
                <li>
                    Инвестиция в летний отдых
                </li>
                <li>
                    Выбор лучшего: номера и рейсы
                </li>
                <li>
                    Отели для разного отдыха
                </li>
            </ul>
        </div>
    `;

    const alreadyInserted = (anchorEl) => {
        if (!anchorEl) return true;
        const next = anchorEl.nextElementSibling;
        return !!next?.matches?.('.michelin[data-michelin-inserted="1"]');
    };

    if (window.innerWidth > 992) {
        const sidebar = document.getElementById('hotelDetailSummaryCard');
        if (!sidebar) return;

        if (alreadyInserted(sidebar)) return;

        sidebar.insertAdjacentHTML('afterend', michelinHTML);

        const michelinEl = sidebar.nextElementSibling;
        if (!michelinEl || !michelinEl.matches('.seal')) return;

        michelinEl.style.position = 'sticky';

        const applyStickyTop = () => {
            const sidebarHeight = sidebar.offsetHeight;
            michelinEl.style.top = `${sidebarHeight + 93}px`;
        };

        applyStickyTop();

        const resizeObserver = new ResizeObserver(() => {
            applyStickyTop();
        });

        resizeObserver.observe(sidebar);

        let resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(applyStickyTop, 100);
        });

        setTimeout(applyStickyTop, 300);
        setTimeout(applyStickyTop, 800);
        setTimeout(applyStickyTop, 1500);
    } else {
        const insertIfReady = () => {
            const anchors = document.querySelectorAll('[class*="hotelConceptsWrapper"]');
            if (!anchors.length) return false;

            const anchor = anchors[anchors.length - 1];

            if (!anchor || anchor.offsetHeight === 0) return false;

            if (anchor.nextElementSibling?.matches?.('.seal')) {
                return true;
            }

            anchor.insertAdjacentHTML('afterend', sealMarkup);
            return true;
        };

        if (insertIfReady()) return;

        const observer = new MutationObserver(() => {
            if (insertIfReady()) {
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});