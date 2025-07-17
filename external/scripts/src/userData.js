
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .custom-modal-login {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .custom-tel-box,
    .custom-email-box {
      display: flex;
      flex: 1;
      position: relative;
    }

    .custom-input-field.custom-input-field--code {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      flex-basis: 90px;
      box-sizing: border-box;
    }

    .custom-input-field.custom-input-field--tel {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      flex: 1;
    }

    .custom-block {
      margin-bottom: 24px;
    }

    .custom-title {
      font-size: 20px;
      color: #0093D0;
      margin: 0;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .custom-row {
      display: flex;
      gap: 8px;
    }

    .custom-input-field {
      margin: 0;
      padding: 9.4px 11px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      line-height: 1.375;
      list-style: none;
      font-family: 'Manrope', 'Manrope Fallback', sans-serif;
      position: relative;
      display: inline-block;

      min-width: 0;
      border-radius: 8px;
      transition: all 0.2s;
      background: #ffffff;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(0, 0, 0, 0.15);
      width: 100%;
    }
    
    .custom-input-field:focus {
        border-color: #0093d0;
        // box-shadow: 0 0 0 2px rgba(19, 182, 255, 0.11);
        outline: 0;
        opacity: 0.8;
    }

    .custom-input-field::placeholder {
      opacity: 0.3;
    }

    .skeleton-loader {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
      background-size: 400% 100%;
      animation: skeleton-animation 1.5s ease infinite;
      z-index: 1;
      border-radius: 8px;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }

    @keyframes skeleton-animation {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    
    .custom-success .custom-input-field.custom-input-field {
        background-color: #D9F7BE33;
    }
    
    .custom-error .custom-input-field.custom-input-field {
        border-color: #E84F0E;
        background-color: white;
    }
  `;
    document.head.appendChild(style);
}

addStyles();

const card = document.querySelectorAll('.ant-card-body');
if (card.length > 0) {
    card[0].insertAdjacentHTML(
        'afterbegin',
        `
    <div class="custom-block">
        <h4 class="custom-title">
            Давайте проверим, есть ли у вас аккаунт
        </h4>
        <div class="custom-row">
            <div class="custom-tel-box">
                <input type="tel" placeholder="+7" value="+7" id="custom-code" class="custom-input-field custom-input-field--code">
                <input type="tel" placeholder="Номер телефона" id="custom-tel" class="custom-input-field custom-input-field--tel">
            </div>
            <div class="custom-email-box">
                <input type="email" placeholder="e-mail" id="custom-email" class="custom-input-field custom-input-field--email">
            </div>
        </div>
    </div>
    `
    );
}

const telInput = document.getElementById('custom-tel');

if (telInput) {
    telInput.addEventListener('input', () => {
        let value = telInput.value.replace(/\D/g, '');

        if (value.length === 10) {
            const telBox = document.querySelector('.custom-tel-box');
            const skeletonLoader = document.createElement('div');
            skeletonLoader.className = 'skeleton-loader';
            telBox.appendChild(skeletonLoader);

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

                    const skeletonLoader = telBox.querySelector('.skeleton-loader');
                    if (skeletonLoader) {
                        telBox.removeChild(skeletonLoader);
                    }

                    if (data.result && data.result.isAvailable) {
                        const loginWidget = document.querySelector('[data-testid="test-login-widget"]');
                        loginWidget.style.display = 'flex';

                        if (loginWidget && !loginWidget.closest('.custom-modal-login')) {
                            const wrapper = document.createElement('div');
                            wrapper.className = 'custom-modal-login';

                            loginWidget.parentNode.insertBefore(wrapper, loginWidget);
                            wrapper.appendChild(loginWidget);
                        }

                        telBox.classList.add('custom-success');
                    } else {
                        telBox.classList.add('custom-error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);

                    const skeletonLoader = telBox.querySelector('.skeleton-loader');
                    if (skeletonLoader) {
                        telBox.removeChild(skeletonLoader);
                    }
                });
        }
    });
}

const emailInput = document.getElementById('custom-email');
if (emailInput) {
    emailInput.addEventListener('input', () => {
        const value = emailInput.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            const emailBox = emailInput.closest('.custom-email-box');

            // Удаляем предыдущий скелетон, если он есть
            const existingLoader = emailBox.querySelector('.skeleton-loader');
            if (existingLoader) {
                emailBox.removeChild(existingLoader);
            }

            // Создаем новый скелетон
            const skeletonLoader = document.createElement('div');
            skeletonLoader.className = 'skeleton-loader';
            emailBox.appendChild(skeletonLoader);

            const payload = {
                email: value,
            };

            fetch('https://www.coral.ru/endpoints/Customer/GetCheckExistCustomerByEmail ', {
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

                    // Удаляем скелетон
                    const skeletonLoader = emailBox.querySelector('.skeleton-loader');
                    if (skeletonLoader) {
                        emailBox.removeChild(skeletonLoader);
                    }

                    // Удаляем старые статусные классы
                    emailBox.classList.remove('custom-success', 'custom-error');

                    if (data.result && data.result.isAvailable) {
                        const loginWidget = document.querySelector('[data-testid="test-login-widget"]');
                        loginWidget.style.display = 'flex';

                        if (loginWidget && !loginWidget.closest('.custom-modal-login')) {
                            const wrapper = document.createElement('div');
                            wrapper.className = 'custom-modal-login';

                            loginWidget.parentNode.insertBefore(wrapper, loginWidget);
                            wrapper.appendChild(loginWidget);
                        }

                        emailBox.classList.add('custom-success');
                    } else {
                        emailBox.classList.add('custom-error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);

                    // Удаляем скелетон при ошибке
                    const skeletonLoader = emailBox.querySelector('.skeleton-loader');
                    if (skeletonLoader) {
                        emailBox.removeChild(skeletonLoader);
                    }

                });
        }
    });
}