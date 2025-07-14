// const container = document.querySelector('[data-testid="test-package-tour-flight-widget"]');
// const heading = document.querySelector('.countdown-timer');
//
// console.log(heading);
//
// if (container) {
//     const observer = new MutationObserver(mutations => {
//         if (window.innerWidth > 768) {
//             console.log(1)
//
//         } else {
//             console.log(2)
//
//         }
//     });
//
//     observer.observe(document.body, {
//         childList: true,
//         subtree: true,
//     });
// }

setTimeout(() => {
    if (window.innerWidth <= 768) {
        const mobileLocation = document.querySelector('[aria-describedby="«ri»"]');

        if (mobileLocation) {
            const locationText = mobileLocation.textContent.trim();
            const cityCode = locationText.split('-')[0].trim().toUpperCase();

            if (cityCode === 'AYT') {
                const header = document.getElementById('package-tour-flight-hotel-overview-heading-area');

                if (header) {
                    header.insertAdjacentHTML('afterend', '<div><img style="border-radius: 12px; width: 100%;" src="https://b2ccdn.coral.ru/content/mindbox/business-flight/bs-nord_m.webp" alt=""></div>');
                }
            }
        }
    } else {
        const card = document.getElementById('package-tour-flight-hotel-overview-flight-information');

        if (card) {
            const locations = card.querySelectorAll('.flight-location');
            const locationText = locations[1].textContent.trim();
            const cityCode = locationText.split('-')[0].trim().toUpperCase();

            if (cityCode === 'AYT') {
                const header = document.querySelector('.header-wrapper');
                const divider = header?.nextElementSibling;

                if (divider && divider.classList.contains('ant-divider')) {
                    divider.insertAdjacentHTML('beforeend', '<div><img style="border-radius: 12px; width: 100%;" src="https://b2ccdn.coral.ru/content/mindbox/business-flight/bs-nord.webp" alt=""></div>');
                }
            }
        }
    }
}, 2000);


