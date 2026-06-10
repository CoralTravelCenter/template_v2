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
    const obs = new MutationObserver(() => {
        const cards = document.querySelectorAll('[class*="PrePaymentOptionsCard_prePaymentOptionsCard"]');

        if (cards.length > 0) {
            obs.disconnect();

            const cardCount = cards.length;

            if (cardCount >= 2) {
                const targetCard = cards[cardCount - 2];

                if (targetCard.textContent.includes('Оплатить')) {
                    cards.forEach(card => {
                        card.style.justifyContent = 'flex-start';
                    });

                    targetCard.style.position = 'relative';

                    const element = document.createElement('div');

                    Object.assign(element.style, {
                        position: 'absolute',
                        backgroundColor: '#52C41A',
                        bottom: '0',
                        left: '0',
                        width: '100%',
                        borderRadius: '12px',
                        paddingBlock: '6px',
                        color: 'white',
                        textAlign: 'center'
                    });

                    element.innerHTML = "Минимальная предоплата";

                    targetCard.insertAdjacentElement('beforeend', element);
                }
            }
        }
    });

    obs.observe(document, {
        childList: true,
        subtree: true
    });
});
