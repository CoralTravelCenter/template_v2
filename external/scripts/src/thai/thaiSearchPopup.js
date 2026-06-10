(() => {
    const mainObserver = new MutationObserver(() => {
        const filters = document.getElementById('selected-filters');
        const targetBlock = document.getElementById('tai_popup');

        if (targetBlock) {
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

            if (thailandElement) {
                mainObserver.disconnect();

                setTimeout(() => {
                    document.body.insertAdjacentHTML('beforeend', `
                        <div id="tai_popup" style="position: fixed; inset: 0; background-color: #00000070; width: 100%; height: 100%; z-index: 9999; display: flex; justify-content: center; align-items: center;">
                        <div style="display: flex; max-width: 350px;
                            flex-direction: column;
                            background-color: white;
                            border-radius: 20px;
                            position: relative;">
                            <div id="tai_popup_close" style="position: absolute; right: -15px; top: -15px; width: 40px; height: 40px; border-radius: 50%; background-color: white; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path style="fill: black;" fill-rule="evenodd" clip-rule="evenodd" d="M13.1401 1.827C13.1405 1.827 13.1409 1.82735 13.1416 1.82807L14.1718 2.85843C14.1725 2.85896 14.1726 2.85932 14.1728 2.85985C14.1729 2.86021 14.1729 2.86057 14.1728 2.86093C14.1728 2.86146 14.1725 2.86182 14.1718 2.86253L9.03425 8.00003L14.1718 13.1375C14.1725 13.1382 14.1726 13.1386 14.1728 13.1391C14.1729 13.1395 14.1729 13.14 14.1728 13.1404C14.1728 13.1407 14.1725 13.1411 14.1718 13.1418L13.1414 14.172C13.1409 14.1727 13.1405 14.1729 13.1401 14.1731C13.1397 14.1732 13.1393 14.1732 13.1389 14.1731C13.1384 14.1731 13.138 14.1727 13.1373 14.172L7.99979 9.0345L2.86229 14.172C2.86157 14.1727 2.86122 14.1729 2.86068 14.1731C2.86027 14.1732 2.85984 14.1732 2.85943 14.1731C2.85907 14.1731 2.85872 14.1727 2.858 14.172L1.82782 13.1416C1.82711 13.1411 1.82693 13.1407 1.82675 13.1404C1.82663 13.14 1.82663 13.1395 1.82675 13.1391C1.82675 13.1386 1.82711 13.1382 1.82782 13.1375L6.96533 8.00003L1.82782 2.86253C1.82711 2.86182 1.82693 2.86146 1.82675 2.86093C1.82663 2.86052 1.82663 2.86008 1.82675 2.85968C1.82675 2.85932 1.82711 2.85896 1.82782 2.85825L2.85818 1.82807C2.85872 1.82735 2.85907 1.82718 2.85943 1.827C2.85984 1.82687 2.86027 1.82687 2.86068 1.827C2.86122 1.827 2.86157 1.82735 2.86229 1.82807L7.99979 6.96557L13.1373 1.82807C13.138 1.82735 13.1384 1.82718 13.1389 1.827C13.1393 1.82687 13.1397 1.82687 13.1401 1.827Z" fill="#EFEFEF"/>
                                </svg>
                            </div>
                            <img style="border-top-left-radius: 20px; border-top-right-radius: 20px;" src="https://b2ccdn.coral.ru/content/thailand/tai_popup.webp" alt="">
                            <div style="padding-inline: 24px; padding-bottom: 24px; padding-top: 14px; display: flex;
                                flex-direction: column;
                                gap: 8px;
                                align-items: center;">
                                <h4 style="margin: 0; text-align: center; font-size: 24px;">Не получается найти  нужный вариант? </h4>
                                <p style="margin: 0; font-size: 20px; text-align: center;">У нас готовы подборки  лучших отелей для всех и каждого!</p>
                                <a id="tai_popup_button" style="width: 100%; margin-top: 12px; border-radius: 8px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; background-color: #0092d0;" target="_blank" href="https://www.coral.ru/main/thailand/">Выбрать</a>
                            </div>
                        </div>
                        </div>
                `);

                    const taiPopup = document.getElementById('tai_popup');
                    const taiPopupClose = document.getElementById('tai_popup_close');
                    const taiPopupButton = document.getElementById('tai_popup_button');

                    if (taiPopup && taiPopupClose) {
                        taiPopupClose.addEventListener('click', () => {
                            taiPopup.style.display = 'none';
                        });

                        taiPopup.addEventListener('click', () => {
                            taiPopup.style.display = 'none';
                        });
                    }

                    if (taiPopupButton && typeof ym === 'function') {
                        taiPopupButton.addEventListener('click', () => {
                            ym(96674199, "reachGoal", "segmentation_entry_point", {
                                page_path: {
                                    "/main/thailand/": {
                                        name_point: "search_pop_up",
                                    },
                                },
                            });
                        });
                    }
                }, 3000);

            }
        }
    });

    mainObserver.observe(document, {
        childList: true,
        subtree: true
    });
})();