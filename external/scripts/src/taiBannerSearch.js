(() => {
    const mainObserver = new MutationObserver(() => {
        const filters = document.getElementById('selected-filters');
        const targetBanner = document.getElementById('tai-search');

        if (targetBanner) {
            return;
        }

        if (filters) {
            function findElementByText(root, text) {
                const elements = root.querySelectorAll('*');
                for (const element of elements) {
                    if (element.textContent.includes(text)) {
                        return element;
                    }
                }
                return null;
            }

            const thailandElement = findElementByText(filters, 'Таиланд');
            const searchBlock = document.querySelector('[class*="HotelListWithCards_hotelListWithCards"]');

            if (thailandElement && searchBlock) {
                mainObserver.disconnect();

                if (searchBlock) {
                    searchBlock.insertAdjacentHTML('beforeend', `
                    <a href="https://www.coral.ru/main/thailand/" target="_blank" style="display: flex; margin: 0 auto; width: fit-content;" id="tai-search">
                        <picture>
                            <source media="(max-width: 768px)" srcset="https://b2ccdn.coral.ru/content/thailand/tai_banner-2_m.webp">
                            <img src="https://b2ccdn.coral.ru/content/thailand/tai_banner-2.webp" alt="">
                        </picture>
                    </a>
                `);

                    const banner = document.getElementById('tai-search');

                    if (banner && typeof ym === 'function') {
                        banner.addEventListener('click', () => {
                            ym(96674199, "reachGoal", "segmentation_entry_point", {
                                page_path: {
                                    "/main/thailand/": {
                                        name_point: "search_banner",
                                    },
                                },
                            });
                        });
                    }
                }
            }
        }
    });

    mainObserver.observe(document, {
        childList: true,
        subtree: true
    });
})();