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
    let alreadyReplaced = false;

    function createBlackBlock() {
        if (!document.getElementById('pb-black-friday-styles')) {
            const style = document.createElement('style');
            style.id = 'pb-black-friday-styles';
            style.textContent = `
                .pb-black-friday {
                    background-image: url('https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/bg_stars.webp');
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    position: relative;
                    padding-inline: 10px;
                    padding-block: 8px;
                    border-radius: 7px;
                    flex: 1;
                    min-width: 213px;
                    overflow: hidden;
                }
                .pb-black-friday__img {
                    position: absolute;
                    background-image: url('https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/img.webp');
                    width: 181px;
                    height: 63px;
                    right: 0;
                    bottom: 0;
                }
                @media screen and (max-width: 1180px) {
                    .pb-black-friday__img { right: -40px; }
                }
                @media screen and (max-width: 992px) {
                    .pb-black-friday__img { right: -60px; }
                }
                @media screen and (max-width: 768px) {
                    .pb-black-friday__img {
                        background-image: url('https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/img_m.webp');
                        width: 146px;
                        height: 83px;
                        right: -7px;
                    }
                }
                .pb-black-friday__text {
                    margin: 0;
                    font-size: 12px;
                    color: white;
                }
                .pb-black__quote {
                    font-size: 6px;
                    position: absolute;
                    bottom: 2px;
                    left: 4px;
                    color: white;
                }
            `;
            document.head.appendChild(style);
        }

        const blackBlock = document.createElement('a');
        blackBlock.href = 'https://www.coral.ru/hot-offers/black-friday/';
        blackBlock.className = 'pb-black-friday';
        blackBlock.innerHTML = `
            <p class="pb-black-friday__text">Черная пятница – <br>все по-настоящему!</p>
            <div class="pb-black-friday__img"></div>
            <span class="pb-black__quote">
                Реклама. ООО "Центрбронь" <br> erid: 2W5zFGUCZ8c
            </span>
        `;

        blackBlock.addEventListener('click', () => {
            const ymParams = {
                name_stock: {
                    black_friday: {
                        name_point: "quick_search"
                    }
                }
            };

            ym(96674199, "reachGoal", "entry-point", ymParams);
        });

        return blackBlock;
    }

    const existingBlocks = document.querySelectorAll('.popular-block');
    if (existingBlocks.length > 0) {
        const first = existingBlocks[0];
        first.parentNode.replaceChild(createBlackBlock(), first);
        return;
    }

    const obs = new MutationObserver((mutations) => {
        if (alreadyReplaced) return;

        for (const mutation of mutations) {
            if (mutation.type !== 'childList') continue;

            for (const node of mutation.addedNodes) {
                if (node.nodeType !== Node.ELEMENT_NODE) continue;

                let target = null;

                if (node.classList?.contains('popular-block')) {
                    target = node;
                } else {
                    target = node.querySelector?.('.popular-block');
                }

                if (target && !alreadyReplaced) {
                    alreadyReplaced = true;
                    target.parentNode.replaceChild(createBlackBlock(), target);
                    obs.disconnect();
                    return;
                }
            }
        }
    });

    obs.observe(document, { childList: true, subtree: true });

    setTimeout(() => {
        if (!alreadyReplaced) {
            const blocks = document.querySelectorAll('.popular-block');
            if (blocks.length > 0) {
                alreadyReplaced = true;
                blocks[0].parentNode.replaceChild(createBlackBlock(), blocks[0]);
                obs.disconnect();
            }
        }
    }, 5000);
});