const container = document.querySelector('[data-testid="test-package-tour-flight-widget"]');

if (container) {
    const observer = new MutationObserver(mutations => {
        if (window.innerWidth > 768) {
            const header = document.querySelector('.header-wrapper');
            const divider = header?.nextElementSibling;

            if (divider && divider.classList.contains('ant-divider')) {
                divider.insertAdjacentHTML('beforeend', '<div><img style="border-radius: 12px; width: 100%;" src="https://b2ccdn.coral.ru/content/mindbox/business-flight/business-flight.webp" alt=""></div>');
                observer.disconnect();
            }
        } else {
            const header = document.getElementById('package-tour-flight-hotel-overview-heading-area');

            if (header) {
                header.insertAdjacentHTML('afterend', '<div><img style="border-radius: 12px; width: 100%;" src="https://b2ccdn.coral.ru/content/mindbox/business-flight/business-flight_m.webp" alt=""></div>');
                observer.disconnect();
            }
        }
    });

    observer.observe(container, {
        childList: true,
        subtree: true,
    });
}