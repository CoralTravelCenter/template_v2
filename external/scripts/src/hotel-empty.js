async function hostReactAppReady(selector = '#__next > div', timeout = 500) {
    return new Promise(resolve => {
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
    const detail = document.getElementById('hotelDetailSummaryCard');

    if (detail) {
        const hotelNameElement = document.querySelector('h1.B2CHeading');
        const creditBlock = detail.querySelector('.installment-credit-information');

        if (creditBlock && hotelNameElement) {
            const hotelName = hotelNameElement.textContent.trim();

            ym(96674199, 'reachGoal', 'by_instalments', {hotel: hotelName});
        }

    }
});