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

async function waitForPopularTours(timeout = 5000, interval = 100) {
    const start = Date.now();

    return new Promise((resolve, reject) => {
        const check = () => {
            if (window.POPULAR_TOURS?.length) {
                return resolve(window.POPULAR_TOURS);
            }
            if (Date.now() - start > timeout) {
                return reject(new Error('данные не найдены за отведенное время'));
            }
            setTimeout(check, interval);
        };
        check();
    });
}

const countriesMapping = [
    {
        "friendlyUrl": "abhaziya",
        "id": "278-0",
        "name": "Абхазия",
        "type": 0
    },
    {
        "friendlyUrl": "azerbaydjan",
        "id": "7-0",
        "name": "Азербайджан",
        "type": 0
    },
    {
        "friendlyUrl": "andorra",
        "id": "72-0",
        "name": "Андорра",
        "type": 0
    },
    {
        "friendlyUrl": "armeniya",
        "id": "5-0",
        "name": "Армения",
        "type": 0
    },
    {
        "friendlyUrl": "bahreyn",
        "id": "282-0",
        "name": "Бахрейн",
        "type": 0
    },
    {
        "friendlyUrl": "belarus",
        "id": "8-0",
        "name": "Беларусь",
        "type": 0
    },
    {
        "friendlyUrl": "vyetnam",
        "id": "41-0",
        "name": "Вьетнам",
        "type": 0
    },
    {
        "friendlyUrl": "gruziya",
        "id": "15-0",
        "name": "Грузия",
        "type": 0
    },
    {
        "friendlyUrl": "egipet",
        "id": "12-0",
        "name": "Египет",
        "type": 0
    },
    {
        "friendlyUrl": "indiya",
        "id": "52-0",
        "name": "Индия",
        "type": 0
    },
    {
        "friendlyUrl": "indoneziya",
        "id": "38-0",
        "name": "Индонезия",
        "type": 0
    },
    {
        "friendlyUrl": "ispaniya",
        "id": "42-0",
        "name": "Испания",
        "type": 0
    },
    {
        "friendlyUrl": "katar",
        "id": "51-0",
        "name": "Катар",
        "type": 0
    },
    {
        "friendlyUrl": "kuba",
        "id": "48-0",
        "name": "Куба",
        "type": 0
    },
    {
        "friendlyUrl": "mavrikiy",
        "id": "63-0",
        "name": "Маврикий",
        "type": 0
    },
    {
        "friendlyUrl": "malydivy",
        "id": "35-0",
        "name": "Мальдивы",
        "type": 0
    },
    {
        "friendlyUrl": "marokko",
        "id": "45-0",
        "name": "Марокко",
        "type": 0
    },
    {
        "friendlyUrl": "oae",
        "id": "31-0",
        "name": "ОАЭ",
        "type": 0
    },
    {
        "friendlyUrl": "rossiya",
        "id": "3-0",
        "name": "Россия",
        "type": 0
    },
    {
        "friendlyUrl": "seyshely",
        "id": "39-0",
        "name": "Сейшелы",
        "type": 0
    },
    {
        "friendlyUrl": "tailand",
        "id": "33-0",
        "name": "Таиланд",
        "type": 0
    },
    {
        "friendlyUrl": "tanzaniya",
        "id": "60-0",
        "name": "Танзания",
        "type": 0
    },
    {
        "friendlyUrl": "tunis",
        "id": "34-0",
        "name": "Тунис",
        "type": 0
    },
    {
        "friendlyUrl": "turtsiya",
        "id": "1-0",
        "name": "Турция",
        "type": 0
    },
    {
        "friendlyUrl": "uzbekistan",
        "id": "49-0",
        "name": "Узбекистан",
        "type": 0
    },
    {
        "friendlyUrl": "shrilanka",
        "id": "40-0",
        "name": "Шри-Ланка",
        "type": 0
    }
]

const departureLocation = {
    id: "2671-5",
    name: "Москва",
    friendlyUrl: "moskva",
    type: 5
};

function buildPayload(item, country, reservationType = 0) {
    return {
        additionalFilters: [
            {type: 21, values: [{id: "2", value: "2"}]},
            {type: 4, values: [{id: country.id, value: country.id}]},
            {
                type: 2,
                values: (item.stars || []).map(star => ({id: star, value: star}))
            }
        ],
        arrivalLocations: [{
            id: country.id,
            name: country.name,
            friendlyUrl: country.friendlyUrl,
            type: country.type
        }],
        beginDates: item.dates,
        datePickerMode: 0,
        departureLocations: [departureLocation],
        flightType: 2,
        nights: [{value: item.nights}],
        paging: {
            hasNextPage: false,
            hasPreviousPage: false,
            pageNumber: 1,
            pageSize: 20,
            sortType: 0
        },
        reservationType: reservationType,
        roomCriterias: [{
            passengers: Array.from({length: item.adults || 2}, () => ({
                age: 20,
                passengerType: 0
            }))
        }]
    };
}

async function enrichPopularItem(item) {
    const country = countriesMapping.find(c => c.name === item.name);
    if (!country) return item;

    const [price, link] = await Promise.all([
        fetch('https://www.sunmar.ru/endpoints/PackageTourHotelProduct/PriceSearchList', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                searchSource: 1,
                searchCriterias: buildPayload(item, country, 0)
            })
        })
            .then(res => res.json())
            .then(data => data?.result?.products?.[0]?.offers?.[0]?.price?.amount ?? null)
            .catch(() => null),

        fetch('https://www.sunmar.ru/endpoints/PackageTourHotelProduct/PriceSearchEncrypt', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(buildPayload(item, country, 1))
        })
            .then(res => res.json())
            .then(data => {
                const qp = data?.result?.queryParam;
                const baseUrl = data?.result?.redirectionUrl;
                return qp && baseUrl ? `${baseUrl}?qp=${qp}&p=1&w=0&s=0&ws=10` : null;
            })
            .catch(() => null)
    ]);

    return {
        ...item,
        link,
        price
    };
}

function createPopularBlock(blockData, index) {

    const style = document.createElement('style');

    style.textContent = `
        .popular-wrapper {
            width: 100%;
            margin-top: 10px;
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
            background-color: #DFDFE8;
            padding-inline: 10px;
            padding-block: 8px;
            border-radius: 7px;
            flex: 1;
            min-width: 213px;
            color: inherit;
          }
          
          @media screen and (max-width: 768px) {
            .popular-block {
                min-width: 200px;
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
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
          }
          
          .popular-block__price {
                position: absolute;
            bottom: 6px;
            right: 7px;
            color: #21366A;
                
                font-size: 14px;
                margin: 0;
                font-weight: 600;
            }
            
            @media screen and (max-width: 1280px) {
                .popular-block__text--options {
                    max-width: 100px;
                }
            }
    `;

    document.head.appendChild(style);

    const point = blockData.places_to_html?.map(place => `<span>${place}</span>`).join(', ') || '<span>Не указано</span>';
    const country = blockData.places_to_html?.[0] || 'Страна';
    const displayIndex = index + 1;

    return `
    <a href="${blockData.link || '#'}" class="popular-block" data-index="${displayIndex}" data-country="${country}" data-date="${blockData.dates_to_html}" data-label="${blockData.label}">
      <div class="popular-block__info">
        <p class="popular-block__text">${point}</p>
        <p class="popular-block__text"><strong>${blockData.dates_to_html}</strong></p>
        <p class="popular-block__text popular-block__text--options"><strong>Ночей:</strong> ${blockData.nights}, <strong>Взрослых:</strong> ${blockData.adults}</p>
      </div>

<!--      <div class="popular-block__label popular-block__label&#45;&#45;${blockData.label === 'Тур' ? 'blue' : 'orange'}">-->
<!--         <span>${blockData.label}</span>-->
<!--      </div>-->

      <p class="popular-block__price">
        ${blockData.price ? `от ${Math.floor(blockData.price).toLocaleString('ru-RU')} руб` : 'Цена уточняется'}
      </p>
    </a>
  `;
}

function createPopularWrapper(popularData) {
    const popularContainer = document.createElement('div');
    popularContainer.classList.add('popular-container');

    ym(215233, 'reachGoal', 'quick_search_show', {type: 'Быстрый поиск'});

    popularData.forEach((block, index) => {
        const html = createPopularBlock(block, index);
        popularContainer.insertAdjacentHTML('beforeend', html);

        const blockEl = popularContainer.lastElementChild;
        blockEl.addEventListener('click', () => {
            const {index, country, date, label} = blockEl.dataset;
            ym(215233, 'reachGoal', 'quick_search', {
                name: 'Быстрый поиск',
                index,
                country,
                date,
                type: label
            });
        });
    });

    const wrapper = document.createElement('div');
    wrapper.classList.add('popular-wrapper');

    wrapper.insertAdjacentHTML('beforeend', `
    <div class="popular-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7072 12.2929L19.7072 18.2929L18.293 19.7071L12.293 13.7071L13.7072 12.2929Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 8C11.5 6.067 9.933 4.5 8 4.5V2.5C11.0376 2.5 13.5 4.96243 13.5 8H11.5Z" fill="white"/>
      </svg>
<!--      <span>Быстрый подбор</span>-->
      <span>Поиск в один клик</span>
    </div>
  `);

    wrapper.appendChild(popularContainer);
    return wrapper;
}

function waitForElement(selector, { root = document, timeout = 15000 } = {}) {
    return new Promise((resolve, reject) => {
        const tryFind = () => (root || document).querySelector(selector);
        const first = tryFind();
        if (first && first.isConnected) return resolve(first);

        const target = root && root !== document ? root : document.documentElement;
        const obs = new MutationObserver(() => {
            const el = tryFind();
            if (el && el.isConnected) {
                obs.disconnect();
                resolve(el);
            }
        });
        obs.observe(target, { childList: true, subtree: true });

        if (timeout) {
            setTimeout(() => {
                obs.disconnect();
                const el = tryFind();
                el && el.isConnected
                    ? resolve(el)
                    : reject(new Error(`waitForElement timeout: ${selector}`));
            }, timeout);
        }
    });
}

hostReactAppReady().then(async () => {
    try {
        const meta = __NEXT_DATA__?.props?.pageProps?.pageData?.meta;
        if (!(meta?.departures?.[0]?.id === "2671-5" && meta?.departures?.[0]?.isCurrent)) return;

        const popularData = await waitForPopularTours();
        const enriched = await Promise.all(popularData.map(enrichPopularItem));

        const searchPanel = await waitForElement('[data-testid="quickSearchBarBlock"]');
        const searchToursPanel = await waitForElement('.ant-tabs-content-holder', { root: searchPanel });

        const recentBlock = searchPanel.querySelector('.swiper-wrapper');
        if (!recentBlock) {
            searchToursPanel.insertAdjacentElement('beforeend', createPopularWrapper(enriched));
        }

        let popularWrapperBlock = searchPanel.querySelector('.popular-wrapper');

        const hotelButton = searchPanel.querySelector('[data-node-key="2"]');
        hotelButton?.addEventListener('click', () => {
            popularWrapperBlock = searchPanel.querySelector('.popular-wrapper');
            if (popularWrapperBlock) popularWrapperBlock.style.display = 'none';
        });

        const tourButton = searchPanel.querySelector('[data-node-key="1"]');
        tourButton?.addEventListener('click', () => {
            popularWrapperBlock = searchPanel.querySelector('.popular-wrapper');
            if (popularWrapperBlock) popularWrapperBlock.style.display = 'block';
        });

        const closeRecentBlock = recentBlock?.querySelectorAll('.icon-container');
        const tabsDiv = searchPanel.querySelector('.ant-row');

        if (closeRecentBlock !== undefined) {
            let isExecuted = false;
            closeRecentBlock.forEach((block) => {
                block.addEventListener('click', () => {
                    setTimeout(() => {
                        const needInsert = (tabsDiv && tabsDiv.nextElementSibling && tabsDiv.nextElementSibling.tagName === 'DIV') === null;
                        if (needInsert && !isExecuted) {
                            searchToursPanel.insertAdjacentElement('beforeend', createPopularWrapper(enriched));
                            isExecuted = true;
                        }
                    }, 1500);
                });
            });
        }
    } catch (err) {
        console.warn('Не удалось инициализировать популярные туры для быстрого поиска', err);
    }
});