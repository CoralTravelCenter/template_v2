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

    let rangeHandler = null;
    let dateHandler = null;
    let monthHandler = null;
    let cellHandlers = [];

    const cleanup = () => {
        if (rangeHandler && document.querySelector('[data-node-key="range"]')) {
            document.querySelector('[data-node-key="range"]').removeEventListener('click', rangeHandler);
        }
        if (dateHandler && document.querySelector('[data-node-key="date"]')) {
            document.querySelector('[data-node-key="date"]').removeEventListener('click', dateHandler);
        }
        if (monthHandler && document.querySelector('[data-node-key="month"]')) {
            document.querySelector('[data-node-key="month"]').removeEventListener('click', monthHandler);
        }

        const monthPanel = document.querySelector('.ant-picker-month-range-wrapper');
        if (monthPanel) {
            cellHandlers.forEach(({ cell, handler }) => {
                cell.removeEventListener('click', handler);
            });
        }
        cellHandlers = [];
    };

    datesInput.addEventListener('click', event => {
        ym(96674199, 'reachGoal', 'main_search_date_show');

        cleanup();

        setTimeout(() => {
            const datesModal = document.querySelector('.ant-picker-dropdown-range');
            if (!datesModal) return;

            const range = datesModal.querySelector('[data-node-key="range"]');
            const date = datesModal.querySelector('[data-node-key="date"]');
            const month = datesModal.querySelector('[data-node-key="month"]');

            rangeHandler = () => {
                ym(96674199, 'reachGoal', 'main_search_date_click', { 'period': 'Период' });
            };
            range?.addEventListener('click', rangeHandler);

            dateHandler = () => {
                ym(96674199, 'reachGoal', 'main_search_date_click', { 'period': 'Точная дата' });
            };
            date?.addEventListener('click', dateHandler);

            monthHandler = () => {
                ym(96674199, 'reachGoal', 'main_search_date_click', { 'period': 'Целый месяц' });

                setTimeout(() => {
                    const monthPanel = document.querySelector('.ant-picker-month-range-wrapper');
                    if (!monthPanel) return;

                    const enabledCells = monthPanel.querySelectorAll('.ant-picker-cell-in-view:not(.ant-picker-cell-disabled)');
                    enabledCells.forEach(cell => {
                        const cellHandler = () => {
                            const title = cell.getAttribute('title');
                            ym(96674199, 'reachGoal', 'month_click', { 'month': title });
                        };
                        cell.addEventListener('click', cellHandler);
                        cellHandlers.push({ cell, handler: cellHandler });
                    });
                }, 700);
            };
            month?.addEventListener('click', monthHandler);

        }, 700);
    });
});