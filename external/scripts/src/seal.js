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
    const SERVICES_MAP = {
        turkey: {
            'service-turkey-1': 'Страховка от невыезда',
            'service-turkey-2': 'Индивидуальный трансфер',
            'service-turkey-3': 'Расширенная медицинская страховка',
            'service-turkey-4': 'Индивидуальная встреча в аэропорту',
            'service-turkey-5': 'Фаст-трэк в аэропорту',
            'service-turkey-6': 'Дополнительный багаж'
        },
        egypt: {
            'service-egypt-1': 'Страховка от невыезда',
            'service-egypt-2': 'Индивидуальный трансфер',
            'service-egypt-3': 'Расширенная медицинская страховка',
            'service-egypt-4': 'Индивидуальная встреча в аэропорту',
            'service-egypt-5': 'Фаст-трэк в аэропорту',
            'service-egypt-6': 'Дополнительный багаж'
        }
    };

    function getSavedServices(key) {
        const raw = localStorage.getItem(key);
        if (!raw) return [];

        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    }

    function getReadableServices(country, serviceIds) {
        const map = SERVICES_MAP[country] || {};

        return serviceIds
            .map(id => map[id])
            .filter(Boolean);
    }

    function renderSealReminder() {
        const turkeySaved = getSavedServices('savedServiceTurkey');
        const egyptSaved = getSavedServices('savedServiceEgypt');

        const turkeyReadable = getReadableServices('turkey', turkeySaved);
        const egyptReadable = getReadableServices('egypt', egyptSaved);

        const allServices = [...turkeyReadable, ...egyptReadable];

        if (!allServices.length) return;

        const uniqueServices = [...new Set(allServices)];

        const servicesHtml = uniqueServices
            .map(service => `<li>${service}</li>`)
            .join('');

        const style = document.createElement('style');

        style.textContent = `
        .seal-block {
            position: fixed;
            left: 20px;
            bottom: 20px;
            z-index: 90;
            width: 200px;
        }

        .seal-tooltip {
            position: absolute;
            bottom: 200px;
            left: 20px;
            width: 300px;
            padding: 12px;
            background: #ffffff;
            font-size: 12px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(6px);
            transition: all 0.2s ease;
            z-index: 10;
            border-radius: 12px;
            border: 1px solid #EBEBEB;
            box-shadow: 0 333px 93px 0 rgba(0, 0, 0, 0.00), 0 213px 85px 0 rgba(0, 0, 0, 0.01), 0 13px 29px 0 rgba(0, 0, 0, 0.10);
        }

        .seal-tooltip::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 12px;
            border-width: 6px;
            border-style: solid;
            border-color: #fff transparent transparent transparent;
        }

        .seal-tooltip p {
            margin: 0 0 8px;
        }

        .seal-tooltip ul {
            margin: 0;
            padding-left: 18px;
        }

        .seal-tooltip li {
            margin-bottom: 4px;
        }

        .seal-tooltip li:last-child {
            margin-bottom: 0;
        }

        @media screen and (min-width: 768px) {
            .seal-block:hover .seal-tooltip {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
        }

        .seal-block.active .seal-tooltip {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
    `;

        document.head.appendChild(style);

        document.body.insertAdjacentHTML('beforeend', `
        <div class="seal-block">
            <div class="seal-img">
                <img src="https://b2ccdn.coral.ru/content/landing-pages/calculator/seal.webp" alt="">
            </div>
            <div class="seal-tooltip">
                <p>
                    Привет, я Тюленина Калькулита. Вы ранее выбрали дополнительные услуги:
                </p>
                <ul>
                    ${servicesHtml}
                </ul>
            </div>
        </div>
    `);

        const sealBlock = document.querySelector('.seal-block');

        function isMobile() {
            return window.innerWidth < 768;
        }

        if (sealBlock) {
            sealBlock.addEventListener('click', (e) => {
                if (!isMobile()) return;
                e.stopPropagation();
                sealBlock.classList.toggle('active');
            });

            document.addEventListener('click', () => {
                sealBlock.classList.remove('active');
            });
        }
    }

    renderSealReminder();
});