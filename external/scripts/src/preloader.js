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
            background-color: rgba(0, 0, 0, 0.06);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding-bottom: 10px;
            padding-top: 18px;
        }
        
        .preloader-new.preloader-new--desktop {
            flex-direction: row;
            background-color: transparent;
            gap: 20px;
            padding-top: 10px;
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
    `;

    document.body.appendChild(style);

    const obs = new MutationObserver(mutations => {

        if (window.innerWidth <= 768) {

            const sectionRow = document.getElementById('section-row-4');

            if (sectionRow) {

                obs.disconnect();

                sectionRow.insertAdjacentHTML('afterbegin', `
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
            }
        } else {
            const headings = document.querySelectorAll('.B2CHeading');

            headings.forEach(heading => {
                if (heading.textContent.trim() === 'Выберите рейс') {
                    obs.disconnect();

                    heading.insertAdjacentHTML('afterend', `
                        <div class="preloader-new preloader-new--desktop">
                            <span>Ищем лучшие цены для вас</span>
                            <div class="preloader-dots">
                                <div class="preloader-dot"></div>
                                <div class="preloader-dot"></div>
                                <div class="preloader-dot"></div>
                                <div class="preloader-dot"></div>
                            </div>
                        </div>
                    `);
                }
            });
        }
    });

    obs.observe(document, {
        childList: true,
        subtree: true
    });
});