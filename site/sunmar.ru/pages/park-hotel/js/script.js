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
    const swiper = new Swiper('.js-slider', {
        navigation: {
            nextEl: '.js-next',
            prevEl: '.js-prev',
        },
        slidesPerView: 1,
        loop: true,
        spaceBetween: 24,
        pagination: {
            el: '.js-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 24,
            },
        },
        on: {
            init: function () {
                updateActivePagination(this.realIndex);
            },
            slideChange: function () {
                updateActivePagination(this.realIndex);
            }
        }
    });

    function updateActivePagination(activeIndex) {
        const buttons = document.querySelectorAll('.js-slide-button');
        buttons.forEach(btn => btn.classList.remove('active'));

        if (buttons[activeIndex]) {
            buttons[activeIndex].classList.add('active');
        }
    }

    document.querySelectorAll('.js-slide-button').forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);
            swiper.slideToLoop(index);
        });
    });
});