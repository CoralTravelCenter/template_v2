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

const countiesMapping = [
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
    const country = countiesMapping.find(c => c.name === item.name);
    if (!country) return item;

    const [price, link] = await Promise.all([
        fetch('https://www.coral.ru/endpoints/PackageTourHotelProduct/PriceSearchList', {
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

        fetch('https://www.coral.ru/endpoints/PackageTourHotelProduct/PriceSearchEncrypt', {
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

    ym(96674199, 'reachGoal', 'quick_search_show', {type: 'Быстрый поиск'});

    popularData.forEach((block, index) => {
        const html = createPopularBlock(block, index);
        popularContainer.insertAdjacentHTML('beforeend', html);

        const blockEl = popularContainer.lastElementChild;
        blockEl.addEventListener('click', () => {
            const {index, country, date, label} = blockEl.dataset;
            ym(96674199, 'reachGoal', 'quick_search', {
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
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
        <path d="M0.916504 5.83325H3.83317V13.3333H0.916504V5.83325Z" stroke="#E84E0F" stroke-linejoin="round"/>
        <path d="M3.8335 5.83333H5.29183L7.16683 3.75L7.77725 1.91875C8.07109 1.03721 9.18992 0.77309 9.84698 1.43015L10.015 1.59813C10.3172 1.90033 10.444 2.33598 10.3513 2.75318L9.66683 5.83333H13.0058C14.0721 5.83333 14.8641 6.82069 14.6328 7.86155L13.6343 12.3545C13.5073 12.9264 13 13.3333 12.4141 13.3333H3.8335V5.83333Z" stroke="#E84E0F" stroke-linejoin="round"/>
      </svg>
      <span>Быстрый поиск</span>
    </div>
  `);

    wrapper.appendChild(popularContainer);
    return wrapper;
}

hostReactAppReady().then(() => {
    if (__NEXT_DATA__.props.pageProps.pageData.meta.departures[0].id === "2671-5" && __NEXT_DATA__.props.pageProps.pageData.meta.departures[0].isCurrent) {
        waitForPopularTours().then(async (popularData) => {
            const searchPanel = document.querySelector('[data-testid="quickSearchBarBlock"]');
            const searchToursPanel = searchPanel?.querySelector('.ant-tabs-content-holder');

            if (!searchToursPanel) return;

            const enriched = await Promise.all(popularData.map(enrichPopularItem));

            const recentBlock = searchPanel?.querySelector('.swiper-wrapper');
            if (!recentBlock) {
                searchToursPanel.insertAdjacentElement('beforeend', createPopularWrapper(enriched));
            }

            const hotelButton = searchPanel.querySelector('[data-node-key="2"]');
            const popularWrapperBlock = searchPanel?.querySelector('.popular-wrapper');

            hotelButton?.addEventListener('click', () => {
                if (popularWrapperBlock) {
                    popularWrapperBlock.style.display = 'none';
                }
            });

            const tourButton = searchPanel.querySelector('[data-node-key="1"]');

            tourButton?.addEventListener('click', () => {
                if (popularWrapperBlock) {
                    popularWrapperBlock.style.display = 'block';
                }
            });

            const closeRecentBlock = recentBlock?.querySelectorAll('.icon-container');

            const tabsDiv = searchPanel?.querySelector('.ant-row');

            if (closeRecentBlock !== undefined) {
                let isExecuted = false;

                closeRecentBlock.forEach((block) => {
                    block.addEventListener('click', () => {
                        setTimeout(() => {
                            if ((tabsDiv && tabsDiv.nextElementSibling && tabsDiv.nextElementSibling.tagName === 'DIV') === null && !isExecuted) {
                                searchToursPanel.insertAdjacentElement('beforeend', createPopularWrapper(enriched));
                                isExecuted = true;
                            }
                        }, 1500);
                    });
                });
            }

        }).catch(err => {
            console.warn('Не удалось получить данные для быстрого поиска', err);
        });
    }
});