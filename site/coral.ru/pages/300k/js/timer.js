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
    const eventDate = new Date('2025-09-30T12:00:00');

    function calculateTimeLeft() {
        const now = new Date();
        const timeLeft = eventDate - now;

        if (timeLeft <= 0) {
            return null;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getDeclension(number, singular, few, plural) {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;

        if (lastTwoDigits > 10 && lastTwoDigits < 20) {
            return plural;
        }

        if (lastDigit === 1) {
            return singular;
        }

        if (lastDigit >= 2 && lastDigit <= 4) {
            return few;
        }

        return plural;
    }

    function updateCountdown() {
        const timeLeft = calculateTimeLeft();

        const daysElement = document.getElementById('days');
        const textDaysElement = document.getElementById('text-days');
        const hoursElement = document.getElementById('hours');
        const textHoursElement = document.getElementById('text-hours');
        const minutesElement = document.getElementById('minutes');
        const textMinutesElement = document.getElementById('text-minutes');
        const secondsElement = document.getElementById('seconds');
        const textSecondsElement = document.getElementById('text-seconds');

        if (!timeLeft) {
            daysElement.textContent = '0';
            textDaysElement.textContent = 'дней';
            hoursElement.textContent = '0';
            textHoursElement.textContent = 'часов';
            minutesElement.textContent = '0';
            textMinutesElement.textContent = 'мин';
            secondsElement.textContent = '0';
            textSecondsElement.textContent = 'сек';
            return;
        }

        daysElement.textContent = timeLeft.days.toString().padStart(2, '0');
        hoursElement.textContent = timeLeft.hours.toString().padStart(2, '0');
        minutesElement.textContent = timeLeft.minutes.toString().padStart(2, '0');
        secondsElement.textContent = timeLeft.seconds.toString().padStart(2, '0');

        textDaysElement.textContent = getDeclension(timeLeft.days, 'день', 'дня', 'дней');
        textHoursElement.textContent = getDeclension(timeLeft.hours, 'час', 'часа', 'часов');
        textMinutesElement.textContent = 'мин';
        textSecondsElement.textContent = 'сек';
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});