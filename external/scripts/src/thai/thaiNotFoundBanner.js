(() => {
    const mainObserver = new MutationObserver(() => {
        const filters = document.getElementById('selected-filters');
        const targetBanner = document.getElementById('tai-not-found');

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
            const targetBlock = document.querySelector('.quicksearch-change-wrapper');

            if (thailandElement && targetBlock) {
                mainObserver.disconnect();

                targetBlock.insertAdjacentHTML('beforebegin', `
                        <a href="https://www.coral.ru/main/thailand/" style="display: flex; margin: 0 auto;" id="tai-not-found">
                            <picture>
                                <source media="(max-width: 768px)" srcset="https://b2ccdn.coral.ru/content/thailand/tai_banner_m.webp">
                                <img src="https://b2ccdn.coral.ru/content/thailand/tai_banner.webp" alt="">
                            </picture>
                        </a>
                    `);

                const banner = document.getElementById('tai-not-found');

                if (banner && typeof ym === 'function') {
                    banner.addEventListener('click', () => {
                        ym(96674199, "reachGoal", "segmentation_entry_point", {
                            page_path: {
                                "/main/thailand/": {
                                    name_point: "search_not_found",
                                },
                            },
                        });
                    });
                }
            }
        }
    });

    mainObserver.observe(document, {
        childList: true,
        subtree: true
    });
})();