import {hostReactAppReady} from "../../../../global/js/utils";

hostReactAppReady().then(() => {
    const tabContainers = document.querySelectorAll('.js-tabs-container');

    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('.js-tabs-button');
        const contents = container.querySelectorAll('.js-tab-content');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;

                buttons.forEach(btn => btn.classList.remove('active'));
                contents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                container.querySelector(`.tab-content[data-tab="${targetTab}"]`)?.classList.add('active');
            });
        });
    });
});

