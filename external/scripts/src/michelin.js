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
    const michelinConfig = new Map([
        ["AMANPURI RESORT", 3],

        ["The Sarojin Thailand", 2],
        ["BANYAN TREE KRABI", 2],
        ["KEEMALA", 2],
        ["INTERCONTINENTAL PHUKET RESORT", 2],

        ["RAYAVADEE", 1],
        ["Aleenta Resort & Spa, Phuket", 1],
        ["THE NAKA ISLAND A LUXURY COLLECTION RESORT & SPA", 1],
        ["ANDARA RESORT & VILLAS", 1],
        ["THE NAI HARN", 1],
        ["THE PAVILIONS PHUKET", 1],
        ["THE SLATE", 1],
        ["TRISARA PHUKET", 1],
    ]);

    const hotelTitle = document.querySelector('.hotel-name h1');
    if (!hotelTitle) return;

    const hotelName = hotelTitle.textContent.trim();
    if (!michelinConfig.has(hotelName)) return;

    const keyCount = michelinConfig.get(hotelName);

    if (!document.querySelector('#michelin-style')) {
        const style = document.createElement('style');
        style.id = 'michelin-style';
        style.textContent = `
            .michelin {
                display: flex;
                height: 53px;
                align-items: center;
                border-radius: 8px;
                border: 1px solid rgba(0, 0, 0, 0.16);
                background: #FFF;
                overflow: hidden;
                margin-top: 12px;
                gap: 20px;
            }
            
            .michelin__keys {
                display: flex;
                gap: 2px;
                background-image: url('https://b2ccdn.coral.ru/content/landing-pages/michelin-keys/key-bg.webp');
                height: 100%;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                align-items: center;
                padding-right: 10px;
                padding-left: 10px;
            }
            
            .michelin__text {
                margin: 0;
                color: #C1122C;
                font-size: 16px;
                line-height: 18px;
                font-weight: 500;
            }
            
            .michelin__img--dark {
                opacity: 0.25;
            }
            
            @media screen and (max-width: 992px) {
                .michelin {
                    width: fit-content;
                    padding-right: 18px;
                    margin-bottom: 10px;
                }
            }
        `;
        document.body.appendChild(style);
    }

    const keyImage = 'https://b2ccdn.coral.ru/content/landing-pages/michelin-keys/mini-key.webp';

    const keysHTML = [1, 2, 3].map((index) => {
        const isActive = index <= keyCount;
        return `
            <img 
                class="michelin__img ${isActive ? '' : 'michelin__img--dark'}"
                src="${keyImage}"
                alt=""
            >
        `;
    }).join('');

    const michelinHTML = `
        <div class="michelin" data-michelin-inserted="1">
            <div class="michelin__keys">
                ${keysHTML}
            </div>
            <p class="michelin__text">
                Отель отмечен <br>
                ключом Мишлен
            </p>
        </div>
    `;

    const alreadyInserted = (anchorEl) => {
        if (!anchorEl) return true;
        const next = anchorEl.nextElementSibling;
        return !!next?.matches?.('.michelin[data-michelin-inserted="1"]');
    };

    if (window.innerWidth > 992) {
        const sidebar = document.getElementById('hotelDetailSummaryCard');
        if (!sidebar) return;

        if (alreadyInserted(sidebar)) return;

        sidebar.insertAdjacentHTML('afterend', michelinHTML);

        const michelinEl = sidebar.nextElementSibling;
        if (!michelinEl || !michelinEl.matches('.michelin[data-michelin-inserted="1"]')) return;

        const applyStickyTop = () => {
            const sidebarHeight = sidebar.getBoundingClientRect().height;
            const topPx = Math.round(sidebarHeight + 93);

            michelinEl.style.position = 'sticky';
            michelinEl.style.top = `${topPx}px`;
            michelinEl.style.zIndex = '2';
        };

        applyStickyTop();

        let michelinResizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(michelinResizeTimer);
            michelinResizeTimer = setTimeout(() => {
                if (window.innerWidth > 992) applyStickyTop();
            }, 100);
        });

    } else {
        const insertIfReady = () => {
            const anchors = document.querySelectorAll('[class*="HotelCategory_hotelCategory"]');
            if (!anchors.length) return false;

            const anchor = anchors[anchors.length - 1];

            if (!anchor || anchor.offsetHeight === 0) return false;

            if (anchor.nextElementSibling?.matches?.('.michelin[data-michelin-inserted="1"]')) {
                return true;
            }

            anchor.insertAdjacentHTML('afterend', michelinHTML);
            return true;
        };

        if (insertIfReady()) return;

        const observer = new MutationObserver(() => {
            if (insertIfReady()) {
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});
