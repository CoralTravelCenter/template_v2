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
    const style = document.createElement("style");

    style.textContent = `
        .preloader-new {
            padding-inline: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding-bottom: 10px;
            padding-top: 18px;
        }
        
        .preloader-new.preloader-new--desktop {
            position: absolute;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            inset: 0;
            border-radius: 16px;
        }
        
        .preloader-dots {
            display: flex;
            gap: 6px;
            align-items: center;
        }
        
        .preloader-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background-color: #0092D0;
            opacity: 0.5;
            animation: blink 1.2s infinite ease-in-out;
        }
        
        .preloader-dot:nth-child(1) { animation-delay: 0.0s; }
        .preloader-dot:nth-child(2) { animation-delay: 0.2s; }
        .preloader-dot:nth-child(3) { animation-delay: 0.4s; }
        .preloader-dot:nth-child(4) { animation-delay: 0.6s; }
        
        @keyframes blink {
            0%, 100% { opacity: 0.5; }
            50%      { opacity: 1; }
        }
        
        .preloader-new--hidden {
            display: none;
        }
    `;

    document.body.appendChild(style);

    let listenersAttached = false;

    function startPreloader() {
        if (document.querySelector('.js-preloader-new')) {
            return;
        }

        if (window.innerWidth <= 768) {
            const targetBlock = document.querySelector('[class*="PackageTourFlightHotelOverviewMobile_skeletonWrapper"]');
            if (!targetBlock) return;

            targetBlock.insertAdjacentHTML('beforebegin', `
                <div class="preloader-new js-preloader-new">
                    <div class="preloader-dots">
                        <div class="preloader-dot"></div>
                        <div class="preloader-dot"></div>
                        <div class="preloader-dot"></div>
                        <div class="preloader-dot"></div>
                    </div>
                    <span>Ищем лучшие цены для вас</span>
                </div>
            `);

            const preloader = document.querySelector('.js-preloader-new');

            const disappearObserver = new MutationObserver(() => {
                const targetBlockDisappear = document.querySelector('[class*="PackageTourFlightHotelOverviewMobile_skeletonWrapper"]');
                if (!targetBlockDisappear) {
                    preloader.classList.add('preloader-new--hidden');
                    disappearObserver.disconnect();
                }
            });

            disappearObserver.observe(document.body, {
                childList: true,
                subtree: true
            });

        } else {
            const targetBlock = document.querySelector('[class*="PackageTourFlightHotelOverview_skeletonWrapper"]');
            if (!targetBlock) return;

            targetBlock.style.position = 'relative';

            if (!targetBlock.querySelector('.preloader-new--desktop')) {
                targetBlock.insertAdjacentHTML('afterbegin', `
                    <div class="preloader-new preloader-new--desktop">
                        <div class="preloader-dots">
                            <div class="preloader-dot"></div>
                            <div class="preloader-dot"></div>
                            <div class="preloader-dot"></div>
                            <div class="preloader-dot"></div>
                        </div>
                        <span>Ищем лучшие цены для вас</span>
                    </div>
                `);
            }
        }
    }

    const skeletonObserver = new MutationObserver(() => {
        if (window.innerWidth <= 768) {
            const mobileSkeleton = document.querySelector('[class*="PackageTourFlightHotelOverviewMobile_skeletonWrapper"]');
            if (mobileSkeleton) {
                startPreloader();
                skeletonObserver.disconnect();
            }
        } else {
            const desktopSkeleton = document.querySelector('[class*="PackageTourFlightHotelOverview_skeletonWrapper"]');
            if (desktopSkeleton) {
                startPreloader();
                skeletonObserver.disconnect();
            }
        }
    });

    skeletonObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    const buttonsObserver = new MutationObserver(() => {
        if (listenersAttached) return;

        const buttonsToStart = document.querySelectorAll('[name="select-room-btn"]');
        if (buttonsToStart.length > 0) {
            listenersAttached = true;
            buttonsObserver.disconnect();

            buttonsToStart.forEach(button => {
                button.addEventListener('click', () => {
                    setTimeout(() => {
                        startPreloader();
                    }, 300);
                });
            });
        }
    });

    buttonsObserver.observe(document, {
        childList: true,
        subtree: true
    });
});
