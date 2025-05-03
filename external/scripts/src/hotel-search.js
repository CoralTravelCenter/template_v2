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
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            const hotelItems = document.querySelectorAll('.hotel-list-item');

            hotelItems.forEach(priceCard => {
                // const priceCard = hotel.querySelector('.hotel-card-price');

                if (!priceCard || priceCard.querySelector('.prepay')) return;

                const prices = priceCard.querySelector('.prices');
                if (!prices) return;

                const columns = prices.querySelectorAll('.column');
                if (columns.length < 2) return;

                const priceDiv = columns[1].querySelector('div');
                if (!priceDiv) return;

                let rawText = priceDiv.textContent.trim();

                let clean = rawText.replace(/[^\d,]/g, '');
                clean = clean.split(',')[0];
                clean = clean.replace(/\s/g, '');
                const priceValue = parseInt(clean, 10);

                if (isNaN(priceValue)) return;

                const percent20 = Math.floor(priceValue * 0.2);
                const formatted = percent20.toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                });

                const prepayBlock = document.createElement('div');
                prepayBlock.innerHTML = `
                    <div class="prepay">
                      <div class="prepay__icon"></div>
                      <div class="prepay__info">
                        <p class="prepay__title">Предоплата от ${formatted}</p>
                        <p class="prepay__text">Остальное за 14 дней до вылета</p>
                      </div>
                    </div> 
                  `;

                const creditBlock = priceCard.querySelector('.installment-credit-information');
                if (creditBlock) {
                    creditBlock.remove();
                }

                const cashback = priceCard.querySelector('.ant-tag-warning');
                if (cashback) {
                    cashback.parentNode.insertBefore(prepayBlock, cashback);
                } else {
                    priceCard.appendChild(prepayBlock);
                }

            });
        });
    });

    if (!document.getElementById('prepay-style')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'prepay-style';
        styleEl.textContent = `
    .prepay {
      width: 100%;
      
      display: flex;
      align-items: center;
      background-image: none;
        background-color: #E84E0F;
        padding-inline: 7px;
        padding-block: 4px;
        height: auto;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      border-radius: 4px;
      margin-bottom: 6px;
      
      box-sizing: border-box;
      
    }

    .prepay__icon {
      width: 20px;
      height: 20px;
      background-image: url("https://b2ccdn.coral.ru/content/hotels/ecom/hotel_icon.svg");
      background-repeat: no-repeat;
      background-size: contain;
      margin-right: 7px;
    }

    .prepay__info {
      display: flex;
      flex-direction: column;
    }

    .prepay__title {
      font-size: 14px;
      line-height: 16px;
      font-weight: 600;
      color: white;
      margin: 0;
    }

    .prepay__text {
      font-size: 12px;
      line-height: 14px;
      color: white;
      margin: 0;
    }
  `;
        document.head.appendChild(styleEl);
    }

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

});
