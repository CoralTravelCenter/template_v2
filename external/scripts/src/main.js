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

function updateBookingButtonText() {
    const button = document.getElementById('SaveReservation_Button');
    const buttonText = button?.querySelector('.save-reservation-btn-child-wrapper');
    const nextText = 'Забронировать и перейти к оплате';

    if (buttonText && buttonText.textContent.trim() !== nextText) {
        buttonText.textContent = nextText;
    }
}

function isBookingStep2Page() {
    return new URLSearchParams(window.location.search).get('step') === '2';
}

function subscribeToSpaUrlChanges(callback) {
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
        originalPushState.apply(this, args);
        callback();
    };

    history.replaceState = function (...args) {
        originalReplaceState.apply(this, args);
        callback();
    };

    window.addEventListener('popstate', callback);
}

hostReactAppReady().then(() => {
    let bookingButtonObserver = null;

    const enableBookingButtonObserver = () => {
        if (bookingButtonObserver) {
            return;
        }

        updateBookingButtonText();

        ym(96674199, 'reachGoal', 'add_passenger_reservation_and_payment');

        bookingButtonObserver = new MutationObserver(() => {
            updateBookingButtonText();
        });

        bookingButtonObserver.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
        });
    };

    const disableBookingButtonObserver = () => {
        if (!bookingButtonObserver) {
            return;
        }

        bookingButtonObserver.disconnect();
        bookingButtonObserver = null;
    };

    const syncBookingButtonObserver = () => {
        if (isBookingStep2Page()) {
            enableBookingButtonObserver();
        } else {
            disableBookingButtonObserver();
        }
    };

    subscribeToSpaUrlChanges(syncBookingButtonObserver);
    syncBookingButtonObserver();
});
