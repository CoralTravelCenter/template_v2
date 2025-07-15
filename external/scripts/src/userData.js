// console.log(123)


const card = document.querySelectorAll('.ant-card-body');
if (card.length > 0) {
    card[0].insertAdjacentHTML(
        'afterbegin',
        '<input type="tel" placeholder="Номер телефона" id="custom-tel" class="ant-input ant-input-outlined">'
    );
}

const input = document.getElementById('custom-tel');

if (input) {
    input.addEventListener('input', () => {
        let value = input.value.replace(/\D/g, '');

        if (value.length === 10) {
            const mobilePhone = `(${value.slice(0, 3)}) ${value.slice(3, 6)} ${value.slice(6, 8)} ${value.slice(8)}`;

            const payload = {
                mobilePhonePrefix: "+7",
                mobilePhone: mobilePhone,
            };

            fetch('https://www.coral.ru/endpoints/Customer/GetCheckExistCustomerByMobilePhone ', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });
}
