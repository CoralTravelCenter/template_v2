import {hostReactAppReady} from "../../../../global/js/utils";

hostReactAppReady().then(() => {

    class PopupComponent {
        constructor(containerId) {
            this.container = document.getElementById(containerId);

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
            const {popupId, title, linkHref, imageSrc, zodiacSigns} = data;

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
                                    Промокод <strong style="color: #0092D0">КОСМОС</strong>. <strong>Скидка 5 000 ₽ <br class="d-hidden"> от 150 000 ₽ или 10 000 ₽ от 300 000 ₽.</strong>
                                </p>
                                <a href="${linkHref}" target="_blank" class="s-popup__link js-metrika">
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

            const link = popup.querySelector('.js-metrika');
            link.addEventListener('click', (e) => {
                ym(96674199, 'reachGoal', 'space_day_select_tour', { country: popupId });
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
        linkHref: 'https://www.coral.ru/packagetours/moskva-to-egipet-tours/?qp=lWOJw1XDa14WeujkN6zDTkiSEw7vty54I7GrRwglhfZJM8Q8DxbVVCoGPzovRkfNw%2bDoTwXjm3j9sbO6sc74XalNfa246XkWSeUhjZxF00dPv665GiFVzg%2fV1WWYG7TddnOfUESGOvkXGcJ11J%2fp6l%2f0l3ohyqaGD7%2bmCJDcwpEaWOmse%2bZOB%2b2SCOsaSi84NfHzoMUI77j%2fevWVTZiYsCKxYknVD6KneAgdH13PbFwFaQZgiPKLByrWrXK9b883vauLnf9c8mOhrJoODb5EwgCR6oHlsmBkd19Xwht1vHDsOKyfF25Y3rhj51MBzlXW&p=1&w=0&s=0',
        zodiacSigns: [
            {symbol: '♈', name: 'Овен', element: 'fire'},
            {symbol: '♉', name: 'Телец', element: 'earth'},
            {symbol: '♓', name: 'Рыбы', element: 'water'}
        ]
    };

    const uaeData = {
        popupId: 'uae',
        title: 'ОАЭ — в сиянии Павлина, где блеск небес не уступает огням города',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_2.webp',
        linkHref: 'https://www.coral.ru/packagetours/moskva-to-oae-tours/?qp=lWOJw1XDa14WeujkN6zDTkiSEw7vty54I7GrRwglhfZJM8Q8DxbVVCoGPzovRkfNw%2BDoTwXjm3j9sbO6sc74XalNfa246XkWSeUhjZxF00dPv665GiFVzg%2FV1WWYG7Tdq05rmoYNbVd6rcJO4OM3chHQdGIMPsPozB5P6WuQWeT0BK1Z3OV9XOK9tyJCf6zLjlJ9ElIEnXdYHhQ8IjEOqqOZ3EWQF1QHxOeQplcJkuo9HaVupkvmynuqrCdRyNffRBFtUGR1E4oKqLxFkYZObFPqxCMYui4klG8q9CCeOwn9NqJO6J%2B83HOEkFXWEsBc&p=1&w=0&s=0',
        zodiacSigns: [
            {symbol: '♋', name: 'Рак', element: 'water'},
            {symbol: '♎', name: 'Весы', element: 'air'},
            {symbol: '♑', name: 'Козерог', element: 'earth'}
        ]
    };

    const thailandData = {
        popupId: 'thailand',
        title: 'Таиланд — на крыле Дракона, что несёт тебя между джунглями и храмами',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_3.webp',
        linkHref: 'https://www.coral.ru/packagetours/moskva-to-tailand-tours/?qp=lWOJw1XDa14WeujkN6zDTj0ex1IHs4OpD2x%2BMBrqkbYQB%2FIIOz9bXiFV3KWzk%2BiCV32zCueQ%2Bul%2BU3I%2B3xUAnbjRofPk1s8NPja%2BtDlT4j2uAYyAiY7q9oCRKeettPyYltv%2FJtY268spXn2VGHk1fTOht8eCTKnQXix1oce0TUOFy3jffhtia%2BQW5e6b%2F0Lp%2FYJtuT0DSl%2BzYnrP93PngkqObjQvqISiH7cGVelSyQy44AlojSNnnwzUpHC%2FJtps3TjHElBThp4Bz1c5T4SE7MfqHofpuUe3CDSdF3ApYKt8CdUm9JiUbe7g%2FE40l3wJtmx5PWELe%2F9zxiwIshZ1qw%3D%3D&p=1&w=0&s=0',
        zodiacSigns: [
            {symbol: '♉', name: 'Телец', element: 'earth'},
            {symbol: '♐', name: 'Стрелец', element: 'fire'},
            {symbol: '♒', name: 'Водолей', element: 'air'}
        ]
    };

    const bahrainData = {
        popupId: 'bahrain',
        title: 'Бахрейн — в глубине Южной Рыбы, где покой встречается с восточной сказкой',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_7.webp',
        linkHref: 'https://www.coral.ru/packagetours/moskva-to-bahreyn-tours/?qp=lWOJw1XDa14WeujkN6zDTk5EW8Fox9dkoRWWrhSJ5NBi4ckszLEMapDvZRNw7tlL%2FrgfKmMqOHsg46D3mMauDwhLSwokaCNUBS0BFEBEiKplFFzMIwjIUggYrYWfc%2Fxzevaf8jxh3pyXQqK%2FJiURN56V4bwoEZyCt04bEZ61MrQxD3hWtcm48TIIItlGLWQ4tq0teWSeTn13xOacbYDkNFAlH0rTw6%2B3bJJJqVx4iXosOn%2B3nIBZV%2BXYPdYwmB3C6G%2FLuibYayAZ5pNLhm%2FoxviwGelsViAV4P%2FV8CmzRuKmlcMaGDf3c0FQyNi3Z8se&p=1&w=0&s=0',
        zodiacSigns: [
            {symbol: '♊', name: 'Близнецы', element: 'air'},
            {symbol: '♈', name: 'Овен', element: 'fire'},
            {symbol: '♏', name: 'Скорпион', element: 'water'}
        ]
    };

    const turkeyData = {
        popupId: 'turkey',
        title: 'Турция — в пламени Феникса, где каждый рассвет — перерождение',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_4.webp',
        linkHref: 'https://www.coral.ru/packagetours/moskva-to-turtsiya-tours/?qp=lWOJw1XDa14WeujkN6zDTkiSEw7vty54I7GrRwglhfZJM8Q8DxbVVCoGPzovRkfNw%2bDoTwXjm3j9sbO6sc74XalNfa246XkWSeUhjZxF00dPv665GiFVzg%2fV1WWYG7TdDC%2fmv%2f8UGIkBTfl2dHVK75lLZ9aN6gGTlvR3THhN2gKN68zzh6TiDLagpJ0WiUYJPjhuBxTwwl2lN2ESusar0oIOTFprKga4E8HuAd88AqwRIM%2bZnoHs6lz59gvBxswpfjXIkbPOmeRVwtF9KrD1dMO5cVsvH6RWQC5uxDS3qlc7uO%2bR6CJaqrotCGnNGFg2&p=1&w=0&s=0',
        zodiacSigns: [
            {symbol: '♍', name: 'Дева', element: 'earth'},
            {symbol: '♌', name: 'Лев', element: 'fire'},
            {symbol: '♊', name: 'Близнецы', element: 'air'}
        ]
    };

    const vietnamData = {
        popupId: 'vietnam',
        title: 'Вьетнам — в переменчивом свете Хамелеона, где каждый день — новое лицо',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_6.webp',
        linkHref: 'https://www.coral.ru/packagetours/moskva-to-vyetnam-tours/?qp=3mXCNsoTYgYvGGFvTswFgzGsMOgUkWbLH1LdddBhrUrJgwaPIVpc%2FkdQf1fLJVo8fIaff8GctIKK5SUTRf5QLPaOPK8eTv073vO6egC06WZ0T1VwNWTm1v5Icdg5RNlH%2BPPNx4zbFGfiOgUGDosiI25aIE9Jv82f7yY3TyTk%2BhBUIdwP3paR%2Fn7Jhd5mw8t0TEX12cW4vnfh6qFzzWtRuKesdeureCxns7%2Fs7BGAJ0R42UW7%2Fnc3pAw%2F75mWsEXrmXJIRmTEnDB5jZRxgU2oDAxUmAkZii3ky4zk6%2BNva2JtZLtYp7vnzyd%2BHwYFpwr2p%2BRYCWukipP9KFr1QdXGpA%3D%3D&p=1&w=0&s=0',
        zodiacSigns: [
            {symbol: '♏', name: 'Скорпион', element: 'water'},
            {symbol: '♍', name: 'Дева', element: 'earth'},
            {symbol: '♒', name: 'Водолей', element: 'air'}
        ]
    };

    const srilankaData = {
        popupId: 'srilanka',
        title: 'Шри-Ланка — в нежности Южной Короны, где мир наполняется чаем и океаном',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_5.webp',
        linkHref: 'https://www.coral.ru/main/srilanka/',
        zodiacSigns: [
            {symbol: '♋', name: 'Рак', element: 'water'},
            {symbol: '♌', name: 'Лев', element: 'fire'},
            {symbol: '♑', name: 'Козерог', element: 'earth'}
        ]
    };

    const maldivesData = {
        popupId: 'maldives',
        title: 'Мальдивы — в свете Голубя, где звёзды шепчут о любви и безмятежности',
        imageSrc: 'https://b2ccdn.coral.ru/content/landing-pages/promo/space-day/ball_8.webp',
        linkHref: 'https://www.coral.ru/packagetours/moskva-to-malydivy-tours/?qp=lWOJw1XDa14WeujkN6zDTt4J%2FpGFxgyLxfHRgfoTvvSIgIfTIuhVvATK%2BkJptO2V1w1jAiLTZOnQNCb%2BuWijbPcPaK8AmSw8wqfef1K7x6EKuxhJSW7rM%2B6xR0Cer1JX4S9gyNNXNIeau3c7XzVDdQODQDwgubkC4XcECiQQV3lBRVdLdibNrqi%2BZqWs7IulaHaEGLxvbXfYz4ga92JaxpI1dhFHEXKU6Uq83Gw%2F9SuyhK5J55f2U%2B9upLXeVHsYdbTv9U4XA4vBnRZsQXeXP9F38pRCNhSvkpAxCaVLmgC3Q1eImZtqykfpAyK4rk6r&p=1&w=0&s=0',
        zodiacSigns: [
            {symbol: '♎', name: 'Весы', element: 'air'},
            {symbol: '♓', name: 'Рыбы', element: 'water'},
            {symbol: '♐', name: 'Стрелец', element: 'fire'}
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
        await smoothScroll(scrollBlock, {left: 100, behavior: 'smooth'}, 2000);

        await smoothScroll(scrollBlock, {left: -100, behavior: 'smooth'}, 300);
    }

    performScroll();
});