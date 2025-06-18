export async function hostReactAppReady(
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
    const swiper = new Swiper(".js-slider", {
        slidesPerView: 4,
        spaceBetween: 24,
        loop: true,
        pagination: {
            el: ".js-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".js-next",
            prevEl: ".js-prev",
        },
    });

    const food_swiper = new Swiper(".js-food-slider", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        pagination: {
            el: ".js-food-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".js-food-next",
            prevEl: ".js-food-prev",
        },
    });

    const actions_swiper = new Swiper(".js-actions-slider", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        pagination: {
            el: ".js-actions-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".js-actions-next",
            prevEl: ".js-actions-prev",
        },
    });

    const toggles = document.querySelectorAll(".js-toggle");

    toggles.forEach(toggle => {
        const header = toggle.querySelector(".js-toggle-header");
        const body = toggle.querySelector(".js-toggle-body");

        header.addEventListener("click", () => {
            const isOpen = toggle.classList.contains("active");

            if (isOpen) {
                closeAccordion(toggle, body);
            } else {
                openAccordion(toggle, body);
            }
        });
    });

    function openAccordion(container, body) {
        container.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
    }

    function closeAccordion(container, body) {
        container.classList.remove("active");
        body.style.maxHeight = 0;
    }



    const anchors = document.querySelector('.js-anchor');

    if (anchors) {
        const anchorsOffsetTop = anchors.getBoundingClientRect().top + window.scrollY;

        const placeholder = document.createElement('div');
        placeholder.className = 'anchors-placeholder';
        placeholder.style.display = 'none';

        anchors.parentNode.insertBefore(placeholder, anchors);

        function hotelsNav() {
            return !!document.querySelector('.el-affix--fixed');
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
                    placeholder.style.height = `${anchors.offsetHeight}px`;
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
                placeholder.style.height = `${anchors.offsetHeight}px`;
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
});