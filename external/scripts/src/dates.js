(() => {
    window.dataLayer = window.dataLayer || [];
    const originalPush = window.dataLayer.push;

    window.dataLayer.push = function (...args) {
        if (args[0] && typeof args[0] === 'object' && args[0].event) {
            const event = args[0];
            const gtmElement = event['gtm.element'];

            if (gtmElement && typeof gtmElement === 'object') {
                const { placeholder, textContent } = gtmElement;

                if (placeholder === 'Выберите даты вылета') {
                    ym(96674199, 'reachGoal', 'main_search_date_show');
                }

                const periodMapping = {
                    'Точная дата': 'Точная дата',
                    'Период': 'Период',
                    'Целый месяц': 'Целый месяц'
                };

                const period = textContent && periodMapping[textContent];
                if (period) {
                    ym(96674199, 'reachGoal', 'main_search_date_click', {
                        period
                    });
                }
            }
        }

        return originalPush.apply(this, args);
    };
})();