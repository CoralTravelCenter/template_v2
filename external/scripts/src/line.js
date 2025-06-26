
if (window.innerWidth > 992) {
    const header = document.querySelector('.header-client-side-desktop');

    const html = `
    <a href="/poleznaya-informatsiya/offers/hot-offers/molodezhnye-oteli/?erid=2W5zFJbxTgk" class="marquee-container" id="marquee-ticker">
        <div class="marquee">
            <img src="https://b2ccdn.coral.ru/content/promo/young-day/ticker-3.webp" alt="">
            <img src="https://b2ccdn.coral.ru/content/promo/young-day/ticker-3.webp" alt="">
        </div>
    </a>
`;

    if (header) {
        header.insertAdjacentHTML("beforebegin", html);
    }

    const style = document.createElement('style');
    style.textContent = `
    .marquee-container {
        width: 4351px;
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
        display: flex;
    }
    
    .marquee {
        display: flex;
    }

    .marquee img {
        height: 40px;
        width: auto;
        display: inline-block;
        animation: line 40s linear infinite;
    }

    @keyframes line {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-100%);
        }
    }
`;
    document.head.append(style);

    const line = document.getElementById('marquee-ticker');

    if (line) {
        line.addEventListener('click', (e) => {
            const yaParams = {
                name_stock: {
                    den_molodezhi: {
                        name_point: "running_line"
                    }
                }
            }
            ym(96674199, "reachGoal", "entry-point", yaParams);
        });
    }
}
