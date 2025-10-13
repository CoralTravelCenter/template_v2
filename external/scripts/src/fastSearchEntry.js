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
        const popularBlocks = [...document.querySelectorAll('.popular-block')];

        if (popularBlocks.length > 0) {
            const targetBlock = popularBlocks[0];
            obs.disconnect();

            const style = document.createElement('style');
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
                }
                
                .pb-black-friday__img {
                    position: absolute;
                    background-image: url('https://b2ccdn.coral.ru/content/landing-pages/black-friday/2025/img.webp');
                    width: 181px;
                    height: 63px;
                    right: 0;
                    bottom: 0;
                }
                
                .pb-black-friday__text {
                    margin: 0;
                    font-size: 12px;
                    color: white
                }
            `;
            document.head.appendChild(style);

            const blackBlock = document.createElement('a');

            blackBlock.href = '/';
            blackBlock.className = 'pb-black-friday';
            blackBlock.innerHTML = `
                <p class="pb-black-friday__text">Черная пятница – <br>все по-настоящему!</p>
                <div class="pb-black-friday__img"></div>
            `;

            targetBlock.parentNode.replaceChild(blackBlock, targetBlock);

            blackBlock.addEventListener('click', (e) => {

                const ymParams = {
                    name_stock: {
                        black_friday: {
                            name_point: "quick_search"
                        }
                    }
                }

                ym(96674199, "reachGoal", "entry-point", ymParams);
            });
        }
    });

    obs.observe(document, {
        childList: true,
        subtree: true
    });
});