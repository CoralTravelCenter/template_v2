import {hostReactAppReady} from "../../../../global/js/utils";

hostReactAppReady().then(() => {

    class PopupComponent {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) {
                throw new Error(`Контейнер с ID "${containerId}" не найден.`);
            }

            document.querySelectorAll('.js-space').forEach(button => {
                button.addEventListener('click', (event) => {
                    const popupId = event.currentTarget.getAttribute('data-popup');
                    if (popupId) {
                        this.openPopup(popupId);
                    }
                });
            });

            document.addEventListener('click', (event) => {
                if (event.target.closest('.js-element')) {
                    const element = event.target.closest('.js-element');
                    const elementType = element.getAttribute('data-element');
                    this.highlightEnergyBlock(elementType);
                }
            });
        }

        createPopup(data) {
            const { popupId, title, imageSrc, zodiacSigns } = data;

            const popupTemplate = `
            <div class="s-popup js-popup is-hidden" data-popup="${popupId}">
                <div class="s-popup__wrapper">
                    <div class="s-popup__header mb-24">
                        <h3 class="s-popup__title">${title}</h3>
                        <div class="s-popup__close js-close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1406 1.827C13.141 1.827 13.1413 1.82735 13.1421 1.82807L14.1722 2.85843C14.173 2.85896 14.1731 2.85932 14.1733 2.85985C14.1734 2.86021 14.1734 2.86057 14.1733 2.86093C14.1733 2.86146 14.173 2.86182 14.1722 2.86253L9.03474 8.00003L14.1722 13.1375C14.173 13.1382 14.1731 13.1386 14.1733 13.1391C14.1734 13.1395 14.1734 13.14 14.1733 13.1404C14.1733 13.1407 14.173 13.1411 14.1722 13.1418L13.1419 14.172C13.1413 14.1727 13.141 14.1729 13.1406 14.1731C13.1402 14.1732 13.1398 14.1732 13.1394 14.1731C13.1388 14.1731 13.1385 14.1727 13.1378 14.172L8.00028 9.0345L2.86278 14.172C2.86206 14.1727 2.86171 14.1729 2.86117 14.1731C2.86076 14.1732 2.86033 14.1732 2.85992 14.1731C2.85956 14.1731 2.85921 14.1727 2.85849 14.172L1.82831 13.1416C1.8276 13.1411 1.82742 13.1407 1.82724 13.1404C1.82712 13.14 1.82712 13.1395 1.82724 13.1391C1.82724 13.1386 1.8276 13.1382 1.82831 13.1375L6.96581 8.00003L1.82831 2.86253C1.8276 2.86182 1.82742 2.86146 1.82724 2.86093C1.82712 2.86052 1.82712 2.86008 1.82724 2.85968C1.82724 2.85932 1.8276 2.85896 1.82831 2.85825L2.85867 1.82807C2.85921 1.82735 2.85956 1.82718 2.85992 1.827C2.86033 1.82687 2.86076 1.82687 2.86117 1.827C2.86171 1.827 2.86206 1.82735 2.86278 1.82807L8.00028 6.96557L13.1378 1.82807C13.1385 1.82735 13.1388 1.82718 13.1394 1.827C13.1398 1.82687 13.1402 1.82687 13.1406 1.827Z" fill="#535353"/>
                            </svg>
                        </div>
                    </div>
                    <div class="s-popup__content">
                        <div class="s-popup__img">
                            <img src="${imageSrc}" alt="">
                        </div>
                        <div class="s-popup__info">
                            <p class="text mb-8">
                                Путешествие идеально сочетается с вашей зодиакальной энергией:
                            </p>
                            <div class="s-popup__energy mb-24">
                                ${zodiacSigns.map(sign => `
                                    <div class="s-popup__energy-block js-energy" data-element="${sign.element}">
                                        <p class="text">
                                            <strong>${sign.symbol} ${sign.name}</strong>
                                        </p>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="s-popup__footer">
                                <p class="text mb-24">
                                    Промокод <strong style="color: #0092D0">КОСМОС</strong>. <strong>Скидка 5 000 ₽ от 150 000 ₽ или 10 000 ₽ от 300 000 ₽.</strong>
                                </p>
                                <a href="" class="s-popup__link">
                                    Выбрать тур
                                </a>
                                <div class="s-popup__elements">
                                    <div class="s-popup__element js-element" data-element="earth">
                                        <img src="https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/earth.webp" alt="Стихия земли" title="Стихия земли">
                                    </div>
                                    <div class="s-popup__element js-element" data-element="water">
                                        <img src="https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/water.webp" alt="Стихия воды" title="Стихия воды">
                                    </div>
                                    <div class="s-popup__element js-element" data-element="fire">
                                        <img src="https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/fire.webp" alt="Стихия огня" title="Стихия огня">
                                    </div>
                                    <div class="s-popup__element js-element" data-element="air">
                                        <img src="https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/air.webp" alt="Стихия воздуха" title="Стихия воздуха">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

            this.container.insertAdjacentHTML('beforeend', popupTemplate);

            const popup = this.container.querySelector(`[data-popup="${popupId}"]`);
            popup.querySelector('.js-close').addEventListener('click', () => {
                this.closePopup(popupId);
            });
        }

        openPopup(popupId) {
            this.closeAllPopups();
            const popup = this.container.querySelector(`[data-popup="${popupId}"]`);
            if (popup) {
                popup.classList.remove('is-hidden');
            }
        }

        closePopup(popupId) {
            const popup = this.container.querySelector(`[data-popup="${popupId}"]`);
            if (popup) {
                popup.classList.add('is-hidden');
                this.resetHighlights();
            }
        }

        closeAllPopups() {
            document.querySelectorAll('.js-popup').forEach(popup => {
                popup.classList.add('is-hidden');
            });
            this.resetHighlights();
        }

        highlightEnergyBlock(elementType) {
            const energyBlocks = document.querySelectorAll(`.js-energy[data-element="${elementType}"]`);
            const isHighlighted = Array.from(energyBlocks).some(block => block.classList.contains('highlight'));

            this.resetHighlights();

            if (!isHighlighted) {
                energyBlocks.forEach(block => {
                    block.classList.add('highlight');
                });
            }
        }

        resetHighlights() {
            document.querySelectorAll('.js-energy').forEach(block => {
                block.classList.remove('highlight');
            });
        }
    }

    const popupComponent = new PopupComponent('s-popup-container');

    const egyptData = {
        popupId: 'egypt',
        title: 'Египет — под защитой Ориона, где звёзды хранят тайны древности',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_1.webp',
        zodiacSigns: [
            { symbol: '♈', name: 'Овен', element: 'fire' },
            { symbol: '♉', name: 'Телец', element: 'earth' },
            { symbol: '♓', name: 'Рыбы', element: 'water' }
        ]
    };

    const uaeData = {
        popupId: 'uae',
        title: 'ОАЭ — в сиянии Павлина, где блеск небес не уступает огням города',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_2.webp',
        zodiacSigns: [
            { symbol: '♋', name: 'Рак', element: 'water' },
            { symbol: '♎', name: 'Весы', element: 'air' },
            { symbol: '♑', name: 'Козерог', element: 'earth' }
        ]
    };

    const thailandData = {
        popupId: 'thailand',
        title: 'Таиланд — на крыле Дракона, что несёт тебя между джунглями и храмами',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_3.webp',
        zodiacSigns: [
            { symbol: '♉', name: 'Телец', element: 'earth' },
            { symbol: '♐', name: 'Стрелец', element: 'fire' },
            { symbol: '♒', name: 'Водолей', element: 'air' }
        ]
    };

    const bahrainData = {
        popupId: 'bahrain',
        title: 'Бахрейн — в глубине Южной Рыбы, где покой встречается с восточной сказкой',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_7.webp',
        zodiacSigns: [
            { symbol: '♊', name: 'Близнецы', element: 'air' },
            { symbol: '♈', name: 'Овен', element: 'fire' },
            { symbol: '♏', name: 'Скорпион', element: 'water' }
        ]
    };

    const turkeyData = {
        popupId: 'turkey',
        title: 'Турция — в пламени Феникса, где каждый рассвет — перерождение',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_4.webp',
        zodiacSigns: [
            { symbol: '♍', name: 'Дева', element: 'earth' },
            { symbol: '♌', name: 'Лев', element: 'fire' },
            { symbol: '♊', name: 'Близнецы', element: 'air' }
        ]
    };

    const vietnamData = {
        popupId: 'vietnam',
        title: 'Вьетнам — в переменчивом свете Хамелеона, где каждый день — новое лицо',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_6.webp',
        zodiacSigns: [
            { symbol: '♏', name: 'Скорпион', element: 'water' },
            { symbol: '♍', name: 'Дева', element: 'earth' },
            { symbol: '♒', name: 'Водолей', element: 'air' }
        ]
    };

    const srilankaData = {
        popupId: 'srilanka',
        title: 'Шри-Ланка — в нежности Южной Короны, где мир наполняется чаем и океаном',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_5.webp',
        zodiacSigns: [
            { symbol: '♋', name: 'Рак', element: 'water' },
            { symbol: '♌', name: 'Лев', element: 'fire' },
            { symbol: '♑', name: 'Козерог', element: 'earth' }
        ]
    };

    const maldivesData = {
        popupId: 'maldives',
        title: 'Мальдивы — в свете Голубя, где звёзды шепчут о любви и безмятежности',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_8.webp',
        zodiacSigns: [
            { symbol: '♎', name: 'Весы', element: 'air' },
            { symbol: '♓', name: 'Рыбы', element: 'water' },
            { symbol: '♐', name: 'Стрелец', element: 'fire' }
        ]
    };

    popupComponent.createPopup(egyptData);
    popupComponent.createPopup(uaeData);
    popupComponent.createPopup(thailandData);
    popupComponent.createPopup(bahrainData);
    popupComponent.createPopup(turkeyData);
    popupComponent.createPopup(vietnamData);
    popupComponent.createPopup(srilankaData);
    popupComponent.createPopup(maldivesData);

    const scrollBlock = document.querySelector('.js-scroll');

    function smoothScroll(element, options, delay) {
        return new Promise((resolve) => {
            setTimeout(() => {
                element.scrollBy(options);
                resolve();
            }, delay);
        });
    }

    async function performScroll() {
        await smoothScroll(scrollBlock, { left: 100, behavior: 'smooth' }, 1000);

        await smoothScroll(scrollBlock, { left: -100, behavior: 'smooth' }, 300);
    }

    performScroll();
});