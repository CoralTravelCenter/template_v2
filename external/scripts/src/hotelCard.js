const observerDisco = new MutationObserver((mutations) => {
    mutations.forEach(() => {
        const hotelItemsList = document.querySelectorAll('.hotel-list-item');

        hotelItemsList.forEach(item => {
            if (!item || item.querySelector('.disco-search')) {

            } else {
                const prices = item.querySelector('.prices');

                if (prices) {
                    const promoBlock = document.createElement('div');
                    promoBlock.classList.add('disco-search-wrapper');
                    promoBlock.innerHTML = `
                        <a href="/poleznaya-informatsiya/offers/hot-offers/molodezhnye-oteli/" class="disco-search"
                        onclick="yMetricDiscoSearch(); return true;">
                            <div class="disco-search__ball">
                                <img src="https://b2ccdn.coral.ru/content/promo/young-day/disco-search.webp" alt="">
                            </div>
                            <div class="disco-search__info">
                                
                                <p class="disco-search__text">Скидка от <strong>5 000 ₽</strong>. Оторвитесь этим летом!</p>
                            </div>
                        </a>
                    `;

                    window.yMetricDiscoSearch = function() {
                        const yaParams = {
                            name_stock: {
                                den_molodezhi: {
                                    name_point: "search"
                                }
                            }
                        };
                        ym(96674199, "reachGoal", "entry-point", yaParams);
                    };

                    if (window.innerWidth > 768) {
                        const distInfo = item.querySelector('.hotel-card-distance-information');
                        if (distInfo) {
                            distInfo.parentNode.appendChild(promoBlock);
                        } else {
                            item.appendChild(promoBlock);
                        }
                    } else {
                        const cardPrice = item.querySelector('.hotel-card-price');

                        if (cardPrice) {
                            cardPrice.parentNode.appendChild(promoBlock);
                        }
                    }
                }
            }
        });
    });
});

if (!document.getElementById('disco-style')) {
    const style = document.createElement('style');
    style.id = 'disco-style';
    style.textContent = `
    .disco-search-wrapper {
        margin-top: auto;
        
        @media screen and (max-width: 768px) {
            margin-top: 10px;
        }
    }
    .disco-search {
        width: 100%;
        display: flex;
        align-items: center;
        background-image: none;
        background: linear-gradient(180deg, #AE65EA 0%, #65AEEA 100%);
        padding-inline: 7px;
        padding-block: 9px;
        height: auto;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 8px;
        position: relative;
        box-sizing: border-box;
        
        @media screen and (max-width: 768px) {
            padding-block: 15px;
        }
    }
    
    .disco-search__ball {
        display: flex;
        position: absolute;
        bottom: 0;
        left: 10px;
    }

    .disco-search__info {
        display: flex;
        flex-direction: column;
        padding-left: 80px;
    }

    .disco-search__title {
        font-size: 14px;
        line-height: 16px;
        font-weight: 600;
        color: white;
        margin: 0;
    }

    .disco-search__text {
        font-size: 12px;
        line-height: 14px;
        color: white;
        margin: 0;
    }
  `;
    document.head.appendChild(style);
}

observerDisco.observe(document.body, {
    childList: true,
    subtree: true,
});

