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
    const sliderSummer = new Swiper(".js-slider-summer", {
        breakpoints: {
            1279: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
            1023: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 32,
            },
        },
        slidesPerView: 1,
        spaceBetween: 32,
        loop: true,
        pagination: {
            el: ".js-pagination-summer",
            clickable: true,
        },
        navigation: {
            nextEl: ".js-next-summer",
            prevEl: ".js-prev-summer",
        },
    });

    const sliderSki = new Swiper(".js-slider-ski", {
        breakpoints: {
            1279: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
            1023: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 32,
            },
        },
        slidesPerView: 1,
        spaceBetween: 32,
        loop: true,
        pagination: {
            el: ".js-pagination-ski",
            clickable: true,
        },
        navigation: {
            nextEl: ".js-next-ski",
            prevEl: ".js-prev-ski",
        },
    });

    const sliderEx = new Swiper(".js-slider-ex", {
        breakpoints: {
            1279: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
            1023: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 32,
            },
        },
        slidesPerView: 1,
        spaceBetween: 32,
        loop: true,
        pagination: {
            el: ".js-pagination-ex",
            clickable: true,
        },
        navigation: {
            nextEl: ".js-next-ex",
            prevEl: ".js-prev-ex",
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
    const anchorsHeight = anchors.offsetHeight;

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
                    placeholder.style.height = `${anchorsHeight}px`;
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
                placeholder.style.height = `${anchorsHeight}px`;
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

            const linkText = this.textContent.trim();

            ym(215233, "reachGoal", "promo_landing_navigation", {
                name_stock: {
                    ng_dec_jan: {
                        name_block: linkText,
                    },
                },
            });

            e.preventDefault();

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        });
    });

    document.querySelectorAll('[data-tabs]').forEach(tabsBlock => {
        const tabs = tabsBlock.querySelectorAll('.tabs__tab');
        const panes = tabsBlock.querySelectorAll('.tabs__pane');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');

                tabs.forEach(item => item.classList.remove('tabs__tab--active'));
                panes.forEach(pane => pane.classList.remove('tabs__pane--active'));

                tab.classList.add('tabs__tab--active');
                const activePane = tabsBlock.querySelector(`.tabs__pane[data-tab="${tabId}"]`);
                if (activePane) {
                    activePane.classList.add('tabs__pane--active');
                }
            });
        });
    });

    document.querySelectorAll('.js-choose-button').forEach(button => {
        button.addEventListener('click', (e) => {

            const slide = e.currentTarget.closest('.swiper-slide');

            if (slide) {
                const titleElement = slide.querySelector('h4');

                if (titleElement) {
                    const titleElementText = titleElement.textContent.trim();

                    ym(215233,'reachGoal','ng_select_tour', {
                        'country': titleElementText
                    });
                }
            }
        });
    });
});