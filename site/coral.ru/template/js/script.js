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
    const sliderStambul = new Swiper(".js-slider-stambul", {
        breakpoints: {
            1280: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
        },
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        pagination: {
            el: ".js-pagination-stambul",
            clickable: true,
        },
        navigation: {
            nextEl: ".js-next-stambul",
            prevEl: ".js-prev-stambul",
        },
    });

    const sliderFood = new Swiper(".js-slider-food", {
        slidesPerView: 1,
        spaceBetween: 24,
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
        },
        loop: true,
        pagination: {
            el: ".js-pagination-food",
            clickable: true,
        },
        navigation: {
            nextEl: ".js-next-food",
            prevEl: ".js-prev-food",
        },
    });

    const sliderActions = new Swiper(".js-slider-actions", {
        slidesPerView: 1,
        spaceBetween: 24,
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
        },
        loop: true,
        pagination: {
            el: ".js-pagination-actions",
            clickable: true,
        },
        navigation: {
            nextEl: ".js-next-actions",
            prevEl: ".js-prev-actions",
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