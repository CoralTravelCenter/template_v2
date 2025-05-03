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

    const detail = document.getElementById('hotelDetailSummaryCard');
    let result = null;
    let priceValue = null;
    let percent20 = null;

    const divs = detail.querySelectorAll('div');

    divs.forEach(div => {
        if (div.textContent.trim() === 'Итоговая стоимость') {
            let next = div.nextElementSibling;
            while (next) {
                if (next.tagName.toLowerCase() === 'h5') {
                    result = next.textContent.trim();
                    console.log('Текст из h5:', result);

                    let clean = result.replace(/[^\d,]/g, '');
                    clean = clean.split(',')[0];
                    clean = clean.replace(/\s/g, '');
                    priceValue = parseInt(clean, 10);

                    if (!isNaN(priceValue)) {
                        percent20 = Math.floor(priceValue * 0.2);
                        const formatted = percent20.toLocaleString('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        });

                        const prepayBlock = document.createElement('div');

                        const style = `
            <style>
              .prepay {
                width: 100%;
                height: 45px;
                display: flex;
                align-items: center;
                background-image: url("https://b2ccdn.coral.ru/content/hotels/ecom/hotel_card.webp");
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;
                border-radius: 4px;
                padding-top: 4px;
                box-sizing: border-box;
                padding-left: 7px;
              }
              
              @media screen and (max-width: 1280px) {
                  .prepay {
                    background-image: none;
                    background-color: #E84E0F;
                    padding-inline: 7px;
                    padding-block: 4px;
                    height: auto;
                  }
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
            </style>
          `;

                        const html = `
            <div class="prepay">
              <div class="prepay__icon"></div>
              <div class="prepay__info">
                <p class="prepay__title">Предоплата от ${formatted}</p>
                <p class="prepay__text">Остальное за 14 дней до вылета</p>
              </div>
            </div> 
          `;

                        if (!document.getElementById('prepay-style')) {
                            const styleEl = document.createElement('div');
                            styleEl.innerHTML = `<div id="prepay-style">${style}</div>`;
                            document.head.appendChild(styleEl);
                        }

                        prepayBlock.innerHTML = html;

                        const creditBlock = detail.querySelector('.installment-credit-information');
                        if (creditBlock) {
                            creditBlock.replaceWith(prepayBlock);
                        } else {
                            detail.appendChild(prepayBlock);
                        }

                    }

                    return;
                }
                next = next.nextElementSibling;
            }
        }
    });

});
