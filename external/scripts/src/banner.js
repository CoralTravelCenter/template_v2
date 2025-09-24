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

function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
        return;
    }

    const observer = new MutationObserver((mutations) => {
        const element = document.querySelector(selector);
        if (element) {
            observer.disconnect();
            callback(element);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

waitForElement('#package-tour-flight-hotel-overview-flight-information', (card) => {
    const flightInfo = [...card.querySelectorAll('.flight-information-group')];

    const locations = flightInfo[1].querySelectorAll('.flight-location');
    const locationText = locations[0]?.textContent?.trim().substring(0, 3);

    if (locationText) {
        const cityCode = locationText.split('-')[0].trim().toUpperCase();

        if (cityCode === 'SGN') {
            const header = document.querySelector('.header-wrapper');
            const divider = header?.nextElementSibling;
            const nextDivider = divider?.nextElementSibling;

            if (nextDivider) {
                nextDivider.insertAdjacentHTML('afterend', `
                    <div style="display: flex; align-items: center; gap: 12px; padding-inline: 12px; padding-block: 8px; border-radius: 12px; border: 1px solid #F4B311; background-color: #FEF7E5;">
                    <svg style="flex-shrink: 0;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM7.5 10.375C7.5 10.4438 7.44375 10.5 7.375 10.5H6.625C6.55625 10.5 6.5 10.4438 6.5 10.375V6.125C6.5 6.05625 6.55625 6 6.625 6H7.375C7.44375 6 7.5 6.05625 7.5 6.125V10.375ZM7 5C6.80374 4.99599 6.61687 4.91522 6.47948 4.775C6.3421 4.63478 6.26515 4.4463 6.26515 4.25C6.26515 4.0537 6.3421 3.86522 6.47948 3.725C6.61687 3.58478 6.80374 3.50401 7 3.5C7.19626 3.50401 7.38313 3.58478 7.52052 3.725C7.6579 3.86522 7.73485 4.0537 7.73485 4.25C7.73485 4.4463 7.6579 4.63478 7.52052 4.775C7.38313 4.91522 7.19626 4.99599 7 5Z" fill="#F4B311"/>
                    </svg>
                    <p style="font-size: 14px; margin: 0;">
                    Обратите внимание: аэропорт <strong>Хошимина (SGN — Ho Chi Minh City)</strong> находится более чем в 400 км от отелей Нячанга. Дорога занимает около 6 часов на машине или 1 час перелёта на внутреннем рейсе. Для удобного трансфера выбирайте аэропорт <strong>Камрань CXR — Нячанг (Nha Trang)</strong>. Переезд от него до отеля займёт не более 90 минут. Для поиска рейсов используйте фильтры слева.
                    </p>
                    </div>
                `);
            }
        }
    }
});


