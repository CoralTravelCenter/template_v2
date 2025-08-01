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

    const datesInput = document.querySelector('[placeholder="Выберите даты вылета"]');

    datesInput.addEventListener('click', event => {
        ym(96674199, 'reachGoal', 'main_search_date_show');

        setTimeout(() => {
            const datesModal = document.querySelector('.ant-picker-dropdown-range');

            const date = datesModal.querySelector('[data-node-key="date"]');
            const range = datesModal.querySelector('[data-node-key="range"]');
            const month = datesModal.querySelector('[data-node-key="month"]');

            range.addEventListener('click', event => {
                ym(96674199, 'reachGoal', 'main_search_date_click', {
                    'period': 'Период'
                });
            });

            date.addEventListener('click', event => {
                ym(96674199, 'reachGoal', 'main_search_date_click', {
                    'period': 'Точная дата'
                });
            });

            month.addEventListener('click', event => {
                ym(96674199, 'reachGoal', 'main_search_date_click', {
                    'period': 'Целый месяц'
                });

                setTimeout(() => {
                    const monthPanel = document.querySelector('.ant-picker-month-range-wrapper');

                    const enabledCells = monthPanel.querySelectorAll('.ant-picker-cell-in-view:not(.ant-picker-cell-disabled)');

                    enabledCells.forEach(cell => {
                        cell.addEventListener('click', event => {
                            const title = cell.getAttribute('title');

                            ym(96674199,'reachGoal', 'month_click', {
                                'month': title
                            });
                        });
                    });
                }, 700);
            });

        }, 700);
    });
});