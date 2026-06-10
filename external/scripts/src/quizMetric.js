(() => {
    const obs = new MutationObserver(() => {
        const quizContainer = document.getElementById('qz-container');

        if (quizContainer && quizContainer.shadowRoot) {
            obs.disconnect();
            const shadowRoot = quizContainer.shadowRoot;

            shadowRoot.addEventListener('click', (e) => {
                const link = e.target.closest('a');

                if (!link) return;

                switch(link.title) {
                    case 'Ночная жизнь в Таиланде':
                        ym(96674199, 'reachGoal', '14_02_quiz_finish', {'product': 'Таиланд'});
                        break;
                    case 'Яркие впечатления в ОАЭ':
                        ym(96674199, 'reachGoal', '14_02_quiz_finish', {'product': 'ОАЭ'});
                        break;
                    case 'Беззаботный отдых в Египте':
                        ym(96674199, 'reachGoal', '14_02_quiz_finish', {'product': 'Египет'});
                        break;
                    case 'Уединение на Мальдивах':
                        ym(96674199, 'reachGoal', '14_02_quiz_finish', {'product': 'Мальдивы'});
                        break;
                }
            });

            const startButton = shadowRoot.querySelector('.go2693040066');

            if (startButton) {
                startButton.addEventListener('click', (e) => {
                    ym(96674199, 'reachGoal', '14_02_quiz_start');
                }, { once: true });
            }
        }
    });

    obs.observe(document, {
        childList: true,
        subtree: true
    });
})();