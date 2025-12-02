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
    const obs = new MutationObserver(mutations => {
        const warning = document.querySelector('#sgn-warning');

        if (warning) {
            return;
        }

        const leftCol = document.getElementById('package-tour-departure-list');

        if (leftCol) {
            const parentLeftCol = leftCol.parentNode;
            obs.disconnect();

            function setHtml() {
                if (parentLeftCol) {
                    parentLeftCol.insertAdjacentHTML('beforebegin', `
                    <div id="sgn-warning" style="display: flex; align-items: center; gap: 12px; padding-inline: 12px; padding-block: 8px; border-radius: 12px; border: 1px solid #F4B311; background-color: #FEF7E5;">
                    <svg style="flex-shrink: 0;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM7.5 10.375C7.5 10.4438 7.44375 10.5 7.375 10.5H6.625C6.55625 10.5 6.5 10.4438 6.5 10.375V6.125C6.5 6.05625 6.55625 6 6.625 6H7.375C7.44375 6 7.5 6.05625 7.5 6.125V10.375ZM7 5C6.80374 4.99599 6.61687 4.91522 6.47948 4.775C6.3421 4.63478 6.26515 4.4463 6.26515 4.25C6.26515 4.0537 6.3421 3.86522 6.47948 3.725C6.61687 3.58478 6.80374 3.50401 7 3.5C7.19626 3.50401 7.38313 3.58478 7.52052 3.725C7.6579 3.86522 7.73485 4.0537 7.73485 4.25C7.73485 4.4463 7.6579 4.63478 7.52052 4.775C7.38313 4.91522 7.19626 4.99599 7 5Z" fill="#F4B311"/>
                    </svg>
                    <p style="font-size: 14px; margin: 0;">
                        Внимание! Вы выбираете тур на базе регулярной авиаперевозки (GDS). Стоимость авиаперелета и наличие билета/тарифа будут актуализированы на момент завершения бронирования и могут измениться. Мы рекомендуем вам совершить бронирование в максимально сжатые сроки.
                    </p>
                    </div>
                `);
                }
            }

            const charterButton = document.querySelector('[name="charter-tab"]');
            const regularButton = document.querySelector('[name="regular-tab"]');

            if (regularButton.classList.contains('active-btn')) {
                obs.disconnect();
                setHtml();
            }

            if (charterButton.classList.contains('active-btn')) {
                regularButton.addEventListener('click', () => {
                    obs.disconnect();
                    setHtml();
                });
            }

            charterButton.addEventListener('click', () => {
                const warning = document.querySelector('#sgn-warning');

                if (warning) {
                    warning.remove();
                }
            });
        }
    });

    obs.observe(document, {
        childList: true,
        subtree: true
    });
});