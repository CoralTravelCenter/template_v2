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
    const paymentVariations = document.querySelector('[class*="PaymentMethods_paymentMethods"]');

    const styles = document.createElement('style');
    styles.textContent = `
        .p-tabs {
            display: flex;
            padding: 4px;
            background-color: #fff;
            border-radius: 40px;
            box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.15);
            width: fit-content;
        }
        
        .p-button {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 44px;
            padding-inline: 24px;
            border-radius: 48px;
            cursor: pointer;
        }
        
        .p-button.p-button--active {
            background-color: #0092D0;
            color: #fff;
        }
        
        @media screen and (max-width: 400px) {
            .p-tabs {
                flex-wrap: wrap;
                border-radius: 24px;
            }
            
            .p-button {
                width: 100%;
            }
        }
    `;

    document.head.appendChild(styles);

    paymentVariations.insertAdjacentHTML('beforebegin', `
        <div class="p-tabs">
            <div class="p-button p-button--active js-p-tab">
                Рекомендуем
            </div>
            <div class="p-button js-p-tab">
                Все способы оплаты
            </div>
        </div> 
    `);

    let isRecommendedActive = true;

    function filterPaymentMethods(showAll = false) {
        if (!paymentVariations) return;

        const childDivs = Array.from(paymentVariations.children)
            .filter(element => element.tagName === 'DIV');

        childDivs.forEach(div => {
            const text = div.textContent || div.innerText;

            if (showAll) {
                div.style.display = '';
            } else {
                if (!text.includes('СБП') && !text.includes('QR-код')) {
                    div.style.display = 'none';
                } else {
                    div.style.display = '';
                }
            }
        });
    }

    function setActiveTab(activeButton) {
        const tabs = document.querySelectorAll('.js-p-tab');

        tabs.forEach(tab => {
            if (tab === activeButton) {
                tab.classList.add('p-button--active');
            } else {
                tab.classList.remove('p-button--active');
            }
        });
    }

    const observer = new MutationObserver((mutations) => {
        const hasChildChanges = mutations.some(mutation =>
            mutation.type === 'childList' || mutation.type === 'attributes'
        );

        if (hasChildChanges) {
            filterPaymentMethods(!isRecommendedActive);
        }
    });

    if (paymentVariations) {
        observer.observe(paymentVariations, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }

    const tabs = document.querySelectorAll('.js-p-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const isRecommendedTab = this.textContent.trim() === 'Рекомендуем';

            if (isRecommendedTab) {
                if (typeof ym !== 'undefined') {
                    ym(96674199, 'reachGoal', 'payment_method', {'name': 'recommend'});
                }
            } else {
                if (typeof ym !== 'undefined') {
                    ym(96674199, 'reachGoal', 'payment_method', {'name': 'all'});
                }
            }

            isRecommendedActive = isRecommendedTab;

            setActiveTab(this);

            filterPaymentMethods(!isRecommendedTab);
        });
    });

    filterPaymentMethods(false);
});