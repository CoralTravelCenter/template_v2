
const SLIDES_TO_REMOVE = 3;

function removeSlides(count) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (!swiperWrapper) return false;

    const slides = swiperWrapper.querySelectorAll('.swiper-slide');
    if (slides.length <= count) return false;

    for (let i = slides.length - 1; i >= slides.length - count; i--) {
        slides[i]?.remove();
    }

    return true;
}

if (removeSlides(SLIDES_TO_REMOVE)) {
    console.log(`Удалено ${SLIDES_TO_REMOVE} последних слайда!`);
} else {
    const observer = new MutationObserver(() => {
        if (removeSlides(SLIDES_TO_REMOVE)) {
            console.log(`Слайдер загружен! Удалено ${SLIDES_TO_REMOVE} последних слайда.`);
            observer.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}