(() => {
    const obs = new MutationObserver(() => {
        const quizContainer = document.getElementById('qz-container');

        if (quizContainer && quizContainer.shadowRoot) {
            obs.disconnect();
            const shadowRoot = quizContainer.shadowRoot;

            const startButton = shadowRoot.querySelector('.go2693040066');

            startButton.addEventListener('click', (e) => {
                ym(96674199,'reachGoal', '14_02_quiz_start');

                const innerObs = new MutationObserver(() => {
                    const enterButton = shadowRoot.querySelector('.go3912719842');

                    if (enterButton) {
                        // innerObs.disconnect();

                        const links = shadowRoot.querySelectorAll('a');
                        const buttons = shadowRoot.querySelectorAll('button');

                        if (links.length > 0) {
                            innerObs.disconnect();

                            links.forEach(link => {
                                if (link.title === 'Ночная жизнь в Таиланде') {
                                    link.addEventListener('click', () => {
                                        ym(96674199,'reachGoal', '14_02_quiz_finish', {'product': 'Таиланд'});
                                    });
                                }

                                if (link.title === 'Яркие впечатления в ОАЭ') {
                                    link.addEventListener('click', () => {
                                        ym(96674199,'reachGoal', '14_02_quiz_finish', {'product': 'ОАЭ'});
                                    });
                                }

                                if (link.title === 'Беззаботный отдых в Египте') {
                                    link.addEventListener('click', () => {
                                        ym(96674199,'reachGoal', '14_02_quiz_finish', {'product': 'Египет'});
                                    });
                                }

                                if (link.title === 'Уединение на Мальдивах') {
                                    link.addEventListener('click', () => {
                                        ym(96674199,'reachGoal', '14_02_quiz_finish', {'product': 'Мальдивы'});
                                    });
                                }
                            });
                        }

                        buttons.forEach(button => {
                            button.addEventListener('click', () => {

                            });
                        });
                    }
                });

                innerObs.observe(shadowRoot, {
                    childList: true,
                    subtree: true,
                });
            });
        }
    });

    obs.observe(document, {
        childList: true,
        subtree: true
    });
})();