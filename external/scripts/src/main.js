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
            if (window.POPULAR_TOURS && Array.isArray(window.POPULAR_TOURS) && window.POPULAR_TOURS.length) {
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

hostReactAppReady().then(() => {
    if (__NEXT_DATA__.props.pageProps.departure === "2671-5") {
        waitForPopularTours().then((popularData) => {
            const searchPanel = document.querySelector('.quick-search-wrapper');
            const recentlyTours = searchPanel?.querySelector('[data-testid="quickSearchPackageToursRecentlyViewedBlock"]');
            if (!recentlyTours) return;

            function createPopularBlock(blockData, index) {
                const point = blockData.places.map(place => `<span>${place}</span>`).join(', ') || '<span>Москва, Турция</span>';
                const country = blockData.places.length > 1 ? blockData.places[1] : blockData.places[0];
                const displayIndex = index + 1;

                return `
                    <a href="${blockData.link}" class="popular-block" data-index="${displayIndex}" data-country="${country}" data-date="${blockData.dates}" data-label="${blockData.label}">
                        <div class="popular-block__info">
                            <p class="popular-block__text">${point}</p>
                            <p class="popular-block__text"><strong>${blockData.dates}</strong></p>
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
                    <span>Быстрый поиск</span>
                </div>
            `;

            function createPopularWrapper(popularData) {
                const popularContainer = document.createElement('div');
                popularContainer.classList.add('popular-container');

                ym(96674199, 'reachGoal', 'quick_search_show', { type: 'Быстрый поиск' });

                popularData.forEach((block, index) => {
                    const createBlock = createPopularBlock(block, index);
                    popularContainer.insertAdjacentHTML('beforeend', createBlock);

                    const blockList = popularContainer.lastElementChild;
                    blockList.addEventListener('click', () => {
                        const { index, country, date, label } = blockList.dataset;
                        ym(96674199, 'reachGoal', 'quick_search', {
                            name: 'Быстрый поиск',
                            index,
                            country,
                            date,
                            type: label
                        });
                    });
                });

                const popularWrapper = document.createElement('div');
                popularWrapper.classList.add('popular-wrapper');

                popularWrapper.insertAdjacentHTML('beforeend', popularTitle);
                popularWrapper.appendChild(popularContainer);

                return popularWrapper;
            }

            setTimeout(() => {
                if (!recentlyTours.querySelector('div')) {
                    recentlyTours.insertAdjacentElement('beforeend', createPopularWrapper(popularData));
                }
            }, 1000);

            const hotelButton = document.querySelector('[aria-controls="rc-tabs-0-panel-2"]');
            hotelButton?.addEventListener('click', () => {
                setTimeout(() => {
                    const recentlyHotels = document.querySelector('[data-testid="quickSearchOnlyHotelRecentlyViewedBlock"]');
                    if (recentlyHotels && !recentlyHotels.querySelector('div')) {
                        recentlyHotels.insertAdjacentElement('beforeend', createPopularWrapper(popularData));
                    }
                }, 1000);
            });
        }).catch((err) => {
            console.warn('Не удалось получить данные для популярного поиска', err);
        });
    }
});