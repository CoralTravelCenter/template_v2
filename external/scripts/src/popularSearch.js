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
    if (__NEXT_DATA__.props.pageProps.meta.departure === "2671-5") {
        const searchPanel = document.querySelector('.quick-search-wrapper');
        const recentlyTours = searchPanel.querySelector('[data-testid="quickSearchPackageToursRecentlyViewedBlock"]');

        const style = document.createElement('style');
        style.textContent = `
      .popular-wrapper {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 20px;
      }
      
      .popular-container {
        display: flex;
        gap: 10px;
        padding-top: 10px;
        width: 100%;
        overflow: auto;
      }
      
      .popular-block {
        position: relative;
        background-color: rgb(230, 244, 255);
        padding-inline: 10px;
        padding-block: 8px;
        border-radius: 7px;
        flex: 1;
        min-width: 213px;
        color: inherit;
      }
      
      @media screen and (max-width: 768px) {
        .popular-block {
            min-width: 175px;
        }
      }
      
      .popular-block:hover {
        color: inherit;
      }
      
      .popular-block__info {
        display: flex;
        flex-direction: column;
      }
      
      .popular-block__text {
        font-size: 12px;
        line-height: 14px;
        font-weight: 400;
        margin: 0;
      }
      
      .popular-block__text + .popular-block__text {
        margin-top: 2px;
      }
      
      .popular-block__label {
        position: absolute;
        right: 10px;
        top: -9px;
        padding-inline: 10px;
        border-radius: 30px;
        display: flex;
        padding-block: 3px;
      }
      
      .popular-block__label span {
        color: white;
      }
      
      .popular-block__label--blue {
        background-color: #0093D0;
      }
      
      .popular-block__label--orange {
        background-color: #EE762D;
      }
      
      .popular-block__label span {
        font-size: 11px;
        font-weight: 600;
      }
      
      .popular-title {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      
      .popular-title span {
        color: #E84E0F;
        font-size: 16px;
        font-weight: 600;
      }
    `;

        document.head.append(style);

        const popularData = [
            {
                link: 'https://coral.ru/packagetoursctx/?ctx_destination=vn&nights=10&departure=msk&depthDays=20&other_stat=none|1|premium',
                places: ['Москва', 'Вьетнам'],
                dates: '09.09.2025-20.09.2025',
                nights: 7,
                adults: 2,
                label: 'Тур'
            },
            {
                link: 'https://www.sunmar.ru/',
                places: ['Москва', 'Мальдивы'],
                dates: '11.02.2025-01.05.2025',
                nights: 15,
                adults: 1,
                label: 'Тур'
            },
            {
                link: 'https://www.sunmar.ru/',
                places: ['Венера'],
                dates: '15.07.2025-25.07.2025',
                nights: 10,
                adults: 3,
                label: 'Отель'
            },
            {
                link: 'https://www.sunmar.ru/',
                places: ['Плутон'],
                dates: '15.07.2025-25.07.2025',
                nights: 1,
                adults: 10,
                label: 'Отель'
            }
        ];

        function createPopularBlock(blockData, index) {
            const point = blockData.places.map(place => `<span>${place}</span>`).join(', ') || '<span>Москва, Турция</span>';

            // Определяем страну для метрики
            const country = blockData.places.length > 1 ? blockData.places[1] : blockData.places[0];

            const displayIndex = index + 1;

            return `
        <a href="${blockData.link}" target="_blank" class="popular-block" data-index="${displayIndex}" data-country="${country}" data-date="${blockData.dates}" data-label="${blockData.label}">
          <div class="popular-block__info">
            <p class="popular-block__text">
              ${point}
            </p>
            <p class="popular-block__text">
              <strong>${blockData.dates}</strong>
            </p>
            <p class="popular-block__text">
              <strong>Ночей:</strong> ${blockData.nights}, <strong>Взрослых:</strong> ${blockData.adults}
            </p>
          </div>
          <div class="popular-block__label popular-block__label--${blockData.label === 'Тур' ? 'blue' : 'orange'}">
            <span>${blockData.label}</span>
          </div>
        </a>
      `;
        }

        const popularTitle = `
      <div class="popular-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
          <path d="M0.916504 5.83325H3.83317V13.3333H0.916504V5.83325Z" stroke="#E84E0F" stroke-linejoin="round"/>
          <path d="M3.8335 5.83333H5.29183L7.16683 3.75L7.77725 1.91875C8.07109 1.03721 9.18992 0.77309 9.84698 1.43015L10.015 1.59813C10.3172 1.90033 10.444 2.33598 10.3513 2.75318L9.66683 5.83333H13.0058C14.0721 5.83333 14.8641 6.82069 14.6328 7.86155L13.6343 12.3545C13.5073 12.9264 13 13.3333 12.4141 13.3333H3.8335V5.83333Z" stroke="#E84E0F" stroke-linejoin="round"/>
        </svg>
        <span>Выбор туристов</span>
      </div>
    `;

        function createPopularWrapper(popularData) {
            const popularContainer = document.createElement('div');
            popularContainer.classList.add('popular-container');

            popularData.forEach((block, index) => {
                const createBlock = createPopularBlock(block, index);
                popularContainer.insertAdjacentHTML('beforeend', createBlock);

                const blockList = popularContainer.lastElementChild;

                blockList.addEventListener('click', () => {
                    const dataIndex = blockList.dataset.index;
                    const dataCountry = blockList.dataset.country;
                    const dataDate = blockList.dataset.date;
                    const dataLabel = blockList.dataset.label;

                    ym(96674199, 'reachGoal', 'quick_search', {
                        'index': dataIndex,
                        'country': dataCountry,
                        'date': dataDate,
                        'type': dataLabel
                    });
                });
            });

            const popularWrapper = document.createElement('div');
            popularWrapper.classList.add('popular-wrapper');

            popularWrapper.insertAdjacentHTML('beforeend', popularTitle);
            popularWrapper.appendChild(popularContainer);

            return popularWrapper;
        }

        if (recentlyTours && recentlyTours.children.length === 0) {
            recentlyTours.insertAdjacentElement('beforeend', createPopularWrapper(popularData));
        }

        const hotelButton = document.querySelector('[aria-controls="rc-tabs-0-panel-2"]');

        hotelButton.addEventListener('click', () => {
            setTimeout(() => {
                const recentlyHotels = document.querySelector('[data-testid="quickSearchOnlyHotelRecentlyViewedBlock"]');

                if (recentlyHotels && recentlyHotels.children.length === 0) {
                    recentlyHotels.insertAdjacentElement('beforeend', createPopularWrapper(popularData));
                }
            }, 500)
        });
    }
});