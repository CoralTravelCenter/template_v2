console.log(1232)

const observer = new MutationObserver(mutations => {
    const list = document.querySelectorAll('.hotel-list-item');

    console.log(list)

    list.forEach(item => {
        const button = item.querySelector('#SelectHotelButton-link');

        if (button) {
            button.remove();
        }
    });
});

observer.observe(document, {
    childList: true,
    subtree: true
});