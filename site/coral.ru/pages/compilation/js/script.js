async function hostReactAppReady(
    selector = "#__next > div",
    timeout = 500,
) {
    return new Promise((resolve) => {
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
    const anchors = document.querySelector('.js-anchor');

    if (anchors) {
        const anchorsOffsetTop = anchors.getBoundingClientRect().top + window.scrollY;

        const placeholder = document.createElement('div');
        placeholder.className = 'anchors-placeholder';
        placeholder.style.display = 'none';

        anchors.parentNode.insertBefore(placeholder, anchors);

        function hotelsNav() {
            const fixedNav = document.querySelector('.el-affix--fixed');
            return !!(fixedNav && fixedNav.querySelector('.controls'));
        }


        function onScroll() {
            const scrollY = window.scrollY;

            if (hotelsNav()) {
                if (anchors.classList.contains('anchors--fixed')) {
                    anchors.classList.remove('anchors--fixed');
                    placeholder.style.display = 'none';
                }
                return;
            }

            if (scrollY >= anchorsOffsetTop) {
                if (!anchors.classList.contains('anchors--fixed')) {
                    anchors.classList.add('anchors--fixed');
                    placeholder.style.display = '';
                    placeholder.style.height = `${anchors.offsetHeight + 60}px`;
                }
            } else {
                if (anchors.classList.contains('anchors--fixed')) {
                    anchors.classList.remove('anchors--fixed');
                    placeholder.style.display = 'none';
                }
            }
        }

        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', () => {
            if (anchors.classList.contains('anchors--fixed')) {
                placeholder.style.height = `${anchors.offsetHeight + 60}px`;
            }
        });
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            if (!hash || hash.length < 2) return;

            const target = document.querySelector(hash);
            if (!target) return;

            let offset = anchors.offsetHeight;

            if (anchors.classList.contains('anchors--fixed')) {
                offset = anchors.offsetHeight;
            }

            const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;

            e.preventDefault();

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        });
    });

    const cards = [
        {
            anchor: 'turkey',
            img: 'https://b2ccdn.coral.ru/content/landing-pages/home/bonus-kv.webp',
            location: 'Турция, Кемер, Гейнюк',
            title: 'ULUSOY KEMER HOLIDAY CLUB',
            score: 5,
            text: 'Standard Room, Ультра все включено',
            dates: '12.08.',
            nights: '7 н',
            peoples: 'на двоих',
            arrival: 'из Москвы',
            price: '219 930',
            link: '/',
        },
        {
            img: 'https://b2ccdn.coral.ru/content/landing-pages/home/bonus-kv.webp',
            location: 'Турция, Кемер, Гейнюк',
            title: 'ULUSOY KEMER HOLIDAY CLUB',
            score: 2,
            text: 'Standard Room, Ультра все включено',
            dates: '12.08.',
            nights: '7 н',
            peoples: 'на двоих',
            arrival: 'из Москвы',
            price: '219 930',
            link: '/',
        },
        {
            img: 'https://b2ccdn.coral.ru/content/landing-pages/home/bonus-kv.webp',
            location: 'Турция, Кемер, Гейнюк',
            title: 'ULUSOY KEMER HOLIDAY CLUB',
            score: 2,
            text: 'Standard Room, Ультра все включено',
            dates: '12.08.',
            nights: '7 н',
            peoples: 'на двоих',
            arrival: 'из Москвы',
            price: '219 930',
            link: '/',
        },
        {
            img: 'https://b2ccdn.coral.ru/content/landing-pages/home/bonus-kv.webp',
            location: 'Турция, Кемер, Гейнюк',
            title: 'ULUSOY KEMER HOLIDAY CLUB',
            score: 2,
            text: 'Standard Room, Ультра все включено',
            dates: '12.08.',
            nights: '7 н',
            peoples: 'на двоих',
            arrival: 'из Москвы',
            price: '219 930',
            link: '/',
        },
        {
            img: 'https://b2ccdn.coral.ru/content/landing-pages/home/bonus-kv.webp',
            location: 'Турция, Кемер, Гейнюк',
            title: 'ULUSOY KEMER HOLIDAY CLUB',
            score: 2,
            text: 'Standard Room, Ультра все включено',
            dates: '12.08.',
            nights: '7 н',
            peoples: 'на двоих',
            arrival: 'из Москвы',
            price: '219 930',
            link: '/',
        },
        {
            img: 'https://b2ccdn.coral.ru/content/landing-pages/home/bonus-kv.webp',
            location: 'Турция, Кемер, Гейнюк',
            title: 'ULUSOY KEMER HOLIDAY CLUB',
            score: 2,
            text: 'Standard Room, Ультра все включено',
            dates: '12.08.',
            nights: '7 н',
            peoples: 'на двоих',
            arrival: 'из Москвы',
            price: '219 930',
            link: '/',
        },
        {
            img: 'https://b2ccdn.coral.ru/content/landing-pages/home/bonus-kv.webp',
            location: 'Турция, Кемер, Гейнюк',
            title: 'ULUSOY KEMER HOLIDAY CLUB',
            score: 2,
            text: 'Standard Room, Ультра все включено',
            dates: '12.08.',
            nights: '7 н',
            peoples: 'на двоих',
            arrival: 'из Москвы',
            price: '219 930',
            link: '/',
        },
        {
            img: 'https://b2ccdn.coral.ru/content/landing-pages/home/bonus-kv.webp',
            location: 'Турция, Кемер, Гейнюк',
            title: 'ULUSOY KEMER HOLIDAY CLUB',
            score: 2,
            text: 'Standard Room, Ультра все включено',
            dates: '12.08.',
            nights: '7 н',
            peoples: 'на двоих',
            arrival: 'из Москвы',
            price: '219 930',
            link: '/',
        },
        {
            img: 'https://b2ccdn.coral.ru/content/landing-pages/home/bonus-kv.webp',
            location: 'Турция, Кемер, Гейнюк',
            title: 'ULUSOY KEMER HOLIDAY CLUB',
            score: 2,
            text: 'Standard Room, Ультра все включено',
            dates: '12.08.',
            nights: '7 н',
            peoples: 'на двоих',
            arrival: 'из Москвы',
            price: '219 930',
            link: '/',
        },
        {
            img: 'https://b2ccdn.coral.ru/content/landing-pages/home/bonus-kv.webp',
            location: 'Турция, Кемер, Гейнюк',
            title: 'ULUSOY KEMER HOLIDAY CLUB',
            score: 2,
            text: 'Standard Room, Ультра все включено',
            dates: '12.08.',
            nights: '7 н',
            peoples: 'на двоих',
            arrival: 'из Москвы',
            price: '219 930',
            link: '/',
        },
        {
            anchor: 'uae',
            img: 'https://b2ccdn.coral.ru/content/landing-pages/home/bonus-kv.webp',
            location: 'Турция, Кемер, Гейнюк',
            title: 'ULUSOY KEMER HOLIDAY CLUB',
            score: 2,
            text: 'Standard Room, Ультра все включено',
            dates: '12.08.',
            nights: '7 н',
            peoples: 'на двоих',
            arrival: 'из Москвы',
            price: '219 930',
            link: '/',
        },
    ];

    const svg = {
        location: `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8335 5.66683C12.8335 9.72673 8.50008 14.6668 8.50008 14.6668C8.50008 14.6668 4.16675 9.72673 4.16675 5.66683C4.16675 3.2736 6.10685 1.3335 8.50008 1.3335C10.8934 1.3335 12.8335 3.2736 12.8335 5.66683Z" stroke="#535353" stroke-width="0.5" stroke-linejoin="round"/><path d="M8.5 7.66699C9.60457 7.66699 10.5 6.77156 10.5 5.66699C10.5 4.56242 9.60457 3.66699 8.5 3.66699C7.39543 3.66699 6.5 4.56242 6.5 5.66699C6.5 6.77156 7.39543 7.66699 8.5 7.66699Z" stroke="#535353" stroke-width="0.5" stroke-linejoin="round"/></svg>`,
        star: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0732 5.1625L10.5393 4.50358L8.51248 0.394646C8.45712 0.282146 8.36605 0.191075 8.25355 0.135717C7.97141 -0.00356831 7.62855 0.112503 7.48748 0.394646L5.4607 4.50358L0.926767 5.1625C0.801767 5.18036 0.687481 5.23929 0.599981 5.32857C0.494199 5.4373 0.435907 5.58358 0.437916 5.73526C0.439925 5.88694 0.50207 6.03162 0.610695 6.1375L3.89105 9.33572L3.11605 13.8518C3.09788 13.9568 3.1095 14.0649 3.14961 14.1637C3.18972 14.2625 3.2567 14.348 3.34296 14.4107C3.42922 14.4733 3.53132 14.5106 3.63766 14.5181C3.744 14.5257 3.85034 14.5034 3.94462 14.4536L7.99998 12.3214L12.0553 14.4536C12.1661 14.5125 12.2946 14.5321 12.4178 14.5107C12.7286 14.4571 12.9375 14.1625 12.8839 13.8518L12.1089 9.33572L15.3893 6.1375C15.4786 6.05 15.5375 5.93572 15.5553 5.81072C15.6036 5.49822 15.3857 5.20893 15.0732 5.1625Z" fill="#FADB14"/></svg>`,
        calendar: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33337 4.66663C1.33337 3.56206 2.2288 2.66663 3.33337 2.66663H12.6667C13.7713 2.66663 14.6667 3.56206 14.6667 4.66663V12.6666C14.6667 13.7712 13.7713 14.6666 12.6667 14.6666H3.33337C2.2288 14.6666 1.33337 13.7712 1.33337 12.6666V4.66663Z" stroke="#535353" stroke-width="0.7" stroke-linejoin="round"/><path d="M1.33337 4.66663C1.33337 3.56206 2.2288 2.66663 3.33337 2.66663H12.6667C13.7713 2.66663 14.6667 3.56206 14.6667 4.66663V5.99996H1.33337V4.66663Z" stroke="#535353" stroke-width="0.7" stroke-linejoin="round"/><path d="M3.33337 3.66671V1.33337" stroke="#535353" stroke-width="0.7"/><path d="M8 3.66671V1.33337" stroke="#535353" stroke-width="0.7"/><path d="M12.6666 3.66671V1.33337" stroke="#535353" stroke-width="0.7"/><path d="M3.66663 8.66663H4.99996" stroke="#535353" stroke-width="0.7"/><path d="M3.66663 11.3334H4.99996" stroke="#535353" stroke-width="0.7"/><path d="M7.33337 8.66663H8.66671" stroke="#535353" stroke-width="0.7"/><path d="M7.33337 11.3334H8.66671" stroke="#535353" stroke-width="0.7"/><path d="M11 8.66663H12.3333" stroke="#535353" stroke-width="0.7"/><path d="M11 11.3334H12.3333" stroke="#535353" stroke-width="0.7"/></svg>`,
        nights: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33337 8.66663C1.33337 7.56206 2.2288 6.66663 3.33337 6.66663H12.6667C13.7713 6.66663 14.6667 7.56206 14.6667 8.66663V9.99996H1.33337V8.66663Z" stroke="#535353" stroke-width="0.7" stroke-linejoin="round"/><path d="M1.33337 10H14.6667V13H13L12 11.6667H4.00004L3.00004 13H1.33337V10Z" stroke="#535353" stroke-width="0.7" stroke-linejoin="round"/><path d="M2 4.66663C2 3.56206 2.89543 2.66663 4 2.66663H12C13.1046 2.66663 14 3.56206 14 4.66663V6.66663H2V4.66663Z" stroke="#535353" stroke-width="0.7" stroke-linejoin="round"/><path d="M4.33337 5.66663C4.33337 5.11434 4.78109 4.66663 5.33337 4.66663H6.00004C6.55232 4.66663 7.00004 5.11434 7.00004 5.66663V6.66663H4.33337V5.66663Z" stroke="#535353" stroke-width="0.7" stroke-linejoin="round"/><path d="M9 5.66663C9 5.11434 9.44772 4.66663 10 4.66663H10.6667C11.219 4.66663 11.6667 5.11434 11.6667 5.66663V6.66663H9V5.66663Z" stroke="#535353" stroke-width="0.7" stroke-linejoin="round"/></svg>`,
        peoples: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.89246 7.9828C4.52799 7.9828 3.42188 6.87668 3.42188 5.51221C3.42188 4.14775 4.52799 3.04163 5.89246 3.04163" stroke="#535353" stroke-width="0.8" stroke-linejoin="bevel"/><path d="M1.5 12.3749C1.5 9.94922 3.46644 7.98279 5.89216 7.98279" stroke="#535353" stroke-width="0.8" stroke-linejoin="bevel"/><circle cx="9.83337" cy="5.66663" r="2.625" stroke="#535353" stroke-width="0.8" stroke-linejoin="bevel"/><path d="M5.16663 12.9583C5.16663 10.381 7.25596 8.29163 9.83329 8.29163C12.4106 8.29163 14.5 10.381 14.5 12.9583" stroke="#535353" stroke-width="0.8" stroke-linejoin="bevel"/></svg>`,
        arrival: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.55785 5.84459L2.67847 6.52863L5.4987 9.40413L13.0162 6.66797C13.5352 6.47908 13.8028 5.90524 13.6139 5.38626C13.425 4.86728 12.8512 4.5997 12.3322 4.78859L10.0503 5.61915L8.01076 3.91406L5.59013 4.08565L7.23118 6.64521L5.91096 7.12573L4.55785 5.84459Z" stroke="#535353" stroke-width="0.8" stroke-linejoin="round"/><path d="M1.3335 12.3334H14.6668" stroke="#535353" stroke-width="0.8" stroke-linejoin="round"/></svg>`
    };

    const container = document.getElementById('cardsGrid');

    cards.forEach(card => {
        const stars = Array(card.score).fill(svg.star).join('');

        const anchor = card.anchor ? `id="${card.anchor}"` : '';

        const cardHTML = `
        <div class="content__item" ${anchor}>
            <div class="content__img">
                <img src="${card.img}" alt="">
            </div>
            <div class="content__block">
                <p class="content__location text-grey">
                    ${svg.location}
                    ${card.location}
                </p>
                <h3 class="content__title">${card.title}</h3>
                <div class="content__score">
                    ${stars}
                </div>
                <p class="text-grey">
                    ${card.text}
                </p>
                <div class="content__info">
                    <p class="text-grey">
                        ${svg.calendar}
                        ${card.dates}
                    </p>
                    <p class="text-grey">
                        ${svg.nights}
                        ${card.nights}
                    </p>
                    <p class="text-grey">
                        ${svg.peoples}
                        ${card.peoples}
                    </p>
                    <p class="text-grey">
                        ${svg.arrival}
                        ${card.arrival}
                    </p>
                </div>
                <div class="content__fly">
                    <p class="text-grey">
                        Перелет включен
                    </p>
                </div>
                <a href="${card.link}" class="coral-button">
                    ${card.price} ₽
                </a>
            </div>
        </div>
    `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
});