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
    const ideasData = [
        {
            title: "Мобильное приложение Sunmar",
            image: "https://cdn.sunmar.ru/content/actions/otdykh-avgust445.jpg",
            category: ["пляжный отдых", "идеи отдыха"],
            link: "https://www.sunmar.ru/yacht-charter-tour/"
        },
        {
            title: "ТЛетняя коллекция отелей по России России",
            image: "https://b2ccdn.sunmar.ru/content/img/Sunmar_Guide_445x300.webp",
            category: ["пляжный отдых"],
            link: "/"
        },
        {
            title: "Отдых в Египте",
            image: "https://cdn.sunmar.ru/content/img/egypt/egypt4.jpg",
            category: ["идеи отдыха"],
            link: "/"
        },
        {
            title: "Советы по отдыху",
            image: "https://cdn.sunmar.ru/content/actions/turkey-vesna1370.jpg",
            category: ["советы", "пляжный отдых", "идеи отдыха"],
            link: "/"
        },
        {
            title: "Летняя коллекция отелей по России России",
            image: "https://cdn.sunmar.ru/content/img/idei_otdyha/440x292_gid_summer_collection_hotels_russia.jpg",
            category: ["советы", "россия", "турция"],
            link: "/"
        },
    ];

    const menuButton = document.querySelector('.js-dropdown');
    const menuBlock = document.querySelector('.js-menu');

    menuButton.addEventListener('click', () => {
        menuBlock.classList.toggle('active');
        menuButton.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.js-ideas-link');
    const contentContainer = document.querySelector('.js-ideas-content');

    function renderCards(cards) {
        contentContainer.innerHTML = '';
        cards.forEach(card => {
            const cardHTML = `
              <a href="${card.link}" class="ideas__block" data-filter="${card.category}">
                <img class="ideas__img" src="${card.image}" alt="">
                <div class="ideas__info">
                  <p class="ideas__text">${card.title}</p>
                </div>
              </a>
    `;
            contentContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    function handleCategoryClick(e) {
        const link = e.target.closest('.js-ideas-link');
        if (!link) return;

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const selectedCategory = link.dataset.category;

        if (link.closest('.js-menu')) {
            const dropdownTitle = menuButton.querySelector('span');
            if (dropdownTitle) {
                dropdownTitle.textContent = link.textContent.trim();
            }

            menuBlock.classList.remove('active');
            menuButton.classList.remove('active');
        }

        if (selectedCategory === 'смотреть все') {
            renderCards(ideasData);
        } else {
            const filtered = ideasData.filter(card => card.category.includes(selectedCategory));
            renderCards(filtered);
        }
    }

    document.querySelector('.ideas__nav').addEventListener('click', handleCategoryClick);
    renderCards(ideasData);
});
