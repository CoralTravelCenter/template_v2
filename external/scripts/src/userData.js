
if (!__NEXT_DATA__.props.pageProps.initialState.User.isLoggedIn) {
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
    
    .custom-email-box {
        flex-direction: column;
        align-self: baseline;
    }

    .custom-input-field.custom-input-field--code {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      flex-basis: 90px;
      box-sizing: border-box;
      flex-shrink: 0;
      align-self: baseline;
      
      appearance: none; 
      -webkit-appearance: none;
      -moz-appearance: none;
      padding-right: 25px;
      background-image: url('data:image/svg+xml;utf8,<svg fill="currentColor" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
      background-repeat: no-repeat;
      background-position: right 5px center;
      background-size: 12px;
      cursor: pointer;
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
<!--      width: 100%;-->
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
    
    .custom-success .custom-input-field {
        background-color: #D9F7BE33;
    }
    
    .custom-error .custom-input-field {
        border-color: #E84F0E;
        background-color: white;
    }
    
    .custom-error .custom-label__checkbox {
        border-color: #E84F0E;
    }
    
    .custom-tel-inner {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-self: baseline;
    }
    
    
    .custom-label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    
    .custom-label input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .custom-label__checkbox {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px solid rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      margin-right: 10px;
      transition: all 0.3s;
    }
    
    .custom-label input:checked + .custom-label__checkbox {
      background-color: #0092D0;
      border-color: #0092D0;
    }
    
    .custom-label input:checked + .custom-label__checkbox:after {
      content: "";
      position: absolute;
      left: 6px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    
    .custom-error-quote p {
        margin: 0
    }
    
    .custom-error-quote {
        align-items: center;
        gap: 8px;
        padding-block: 8px;
        padding-inline: 16px;
        border-radius: 8px;
        background-color: #FEEEE7;
        border: 1px solid #F9BA9F;
        margin-top: 20px;
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
                <select id="custom-code" class="custom-input-field custom-input-field--code">
                    <option value="+7">+7</option>
                    <option value="+375">+375</option>
                    <option value="+373">+373</option>
                    <option value="+48">+48</option>
                    <option value="+995">+995</option>
                    <option value="+380">+380</option>
                </select>
                <div class="custom-tel-inner" id="custom-tel-message">
                    <input type="tel" placeholder="Номер телефона" id="custom-tel" class="custom-input-field custom-input-field--tel">
                    <span></span>
                </div>
            </div>
            <div class="custom-email-box" id="custom-email-message">
                <input type="email" placeholder="e-mail" id="custom-email" class="custom-input-field custom-input-field--email">
                <span></span>
            </div>
        </div>
        <div class="custom-row" style="margin-top: 14px;">
            <label class="custom-label" id="custom-label" for="custom-check">
                <input type="checkbox" id="custom-check">
                <span class="custom-label__checkbox"></span>
                <span>
                    Даю <a href="https://www.coral.ru/soglasie-na-obrabotku-dannyh/" target="_blank">согласие</a> 
                    на обработку персональных данных.<a href="https://cdn.coral.ru/content/doc/legal/privacy_policy_coral.pdf" target="_blank"> 
                    Политика обработки персональных данных</a>
                </span>
            </label>
        </div>
        <div class="custom-error-quote" id="error-quote" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M8.12598 1.0661C4.26035 1.0661 1.12598 4.20048 1.12598 8.0661C1.12598 11.9317 4.26035 15.0661 8.12598 15.0661C11.9916 15.0661 15.126 11.9317 15.126 8.0661C15.126 4.20048 11.9916 1.0661 8.12598 1.0661ZM10.7104 10.7255L9.6791 10.7208L8.12598 8.86923L6.57441 10.7192L5.5416 10.7239C5.47285 10.7239 5.4166 10.6692 5.4166 10.5989C5.4166 10.5692 5.42754 10.5411 5.44629 10.5177L7.4791 8.09579L5.44629 5.67548C5.42741 5.65258 5.41693 5.6239 5.4166 5.59423C5.4166 5.52548 5.47285 5.46923 5.5416 5.46923L6.57441 5.47391L8.12598 7.32548L9.67754 5.47548L10.7088 5.47079C10.7775 5.47079 10.8338 5.52548 10.8338 5.59579C10.8338 5.62548 10.8229 5.6536 10.8041 5.67704L8.77441 8.09735L10.8057 10.5192C10.8244 10.5427 10.8354 10.5708 10.8354 10.6005C10.8354 10.6692 10.7791 10.7255 10.7104 10.7255Z" fill="#E84F0E"/>
            </svg>
            <p>
                Аккаунт с такими данными не найден. При бронировании мы создадим аккаунт для вас автоматически.
            </p>
        </div>
    </div>
    `
        );
    }

    function checkField(inputElement, url, getPayload, parentSelector, onSuccess, errorMessage, errorElement) {
        const parent = typeof parentSelector === 'string'
            ? inputElement.closest(parentSelector)
            : parentSelector;

        const existingLoader = parent.querySelector('.skeleton-loader');
        if (existingLoader) {
            parent.removeChild(existingLoader);
        }

        const skeletonLoader = document.createElement('div');
        skeletonLoader.className = 'skeleton-loader';
        parent.appendChild(skeletonLoader);

        const payload = getPayload(inputElement.value);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                const loader = parent.querySelector('.skeleton-loader');
                if (loader) parent.removeChild(loader);

                parent.classList.remove('custom-success', 'custom-error');

                if (data.result && data.result.isAvailable) {
                    parent.classList.add('custom-success');
                    onSuccess && onSuccess(data);
                } else {
                    parent.classList.add('custom-error');
                    if (errorMessage && errorElement) {
                        showError(errorElement, errorMessage);
                    }
                }

                checkBothFields();
            })
            .catch(error => {
                console.error('Error:', error);
                const loader = parent.querySelector('.skeleton-loader');
                if (loader) parent.removeChild(loader);
                parent.classList.remove('custom-success', 'custom-error');
                parent.classList.add('custom-error');
                if (errorMessage && errorElement) {
                    showError(errorElement, errorMessage);
                }

                checkBothFields();
            });
    }

    function checkBothFields() {
        const telBox = document.querySelector('.custom-tel-box');
        const emailBox = document.querySelector('.custom-email-box');

        const telError = telBox.classList.contains('custom-error') && telMessage.textContent !== '';
        const emailError = emailBox.classList.contains('custom-error') && emailMessage.textContent !== '';

        console.log(telError, emailError);

        if (!telError && !emailError) {
            console.log(12312)
            errorQuote.style.display = 'flex';
        } else {
            errorQuote.style.display = 'none';
        }
    }

    const telInput = document.getElementById('custom-tel');
    const emailInput = document.getElementById('custom-email');
    const checkbox = document.getElementById('custom-check');
    const label = document.getElementById('custom-label');

    const telMessage = document.querySelector('#custom-tel-message span');
    const emailMessage = document.querySelector('#custom-email-message span');
    const errorQuote = document.getElementById('error-quote');

    function validateConsent() {
        if (!checkbox.checked) {
            label.classList.add('custom-error');
            return false;
        } else {
            label.classList.remove('custom-error');
            return true;
        }
    }

    function hideAllErrors() {
        telMessage.textContent = '';
        emailMessage.textContent = '';
        errorQuote.style.display = 'none';
    }

    function showError(element, message) {
        element.textContent = message;
    }

    if (telInput) {
        telInput.addEventListener('blur', () => {
            const telBox = document.querySelector('.custom-tel-box');
            const value = telInput.value.replace(/\D/g, '');

            hideAllErrors();

            telBox.classList.remove('custom-success', 'custom-error');

            if (value.length < 6) {
                telBox.classList.add('custom-error');
                showError(telMessage, 'Введите корректный номер');
                return;
            }

            const mobilePhone = `(${value.slice(0, 3)}) ${value.slice(3, 6)} ${value.slice(6, 8)} ${value.slice(8)}`;

            const mobileCode = document.getElementById('custom-code');
            const selectedCode = mobileCode.options[mobileCode.selectedIndex];

            if (!validateConsent()) return;

            checkField(
                telInput,
                'https://www.coral.ru/endpoints/Customer/GetCheckExistCustomerByMobilePhone ',
                () => ({
                    mobilePhonePrefix: selectedCode.value,
                    mobilePhone: mobilePhone,
                }),
                telBox,
                () => {
                    const loginWidget = document.querySelector('[data-testid="test-login-widget"]');
                    if (loginWidget && !loginWidget.closest('.custom-modal-login')) {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'custom-modal-login';
                        loginWidget.parentNode.insertBefore(wrapper, loginWidget);
                        wrapper.appendChild(loginWidget);
                        loginWidget.style.display = 'flex';
                    }
                },
                'Мы не нашли вас по номеру, попробуйте ввести почту',
                telMessage
            );
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const emailBox = document.querySelector('.custom-email-box');
            const value = emailInput.value.trim();

            hideAllErrors();

            emailBox.classList.remove('custom-success', 'custom-error');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                emailBox.classList.add('custom-error');
                showError(emailMessage, 'Введите корректный адрес почты');
                return;
            }

            if (!validateConsent()) return;

            checkField(
                emailInput,
                'https://www.coral.ru/endpoints/Customer/GetCheckExistCustomerByEmail ',
                (val) => ({ email: val }),
                emailBox,
                () => {
                    const loginWidget = document.querySelector('[data-testid="test-login-widget"]');
                    if (loginWidget && !loginWidget.closest('.custom-modal-login')) {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'custom-modal-login';
                        loginWidget.parentNode.insertBefore(wrapper, loginWidget);
                        wrapper.appendChild(loginWidget);
                        loginWidget.style.display = 'flex';
                    }
                },
                null,
                emailMessage
            );
        });
    }

    if (checkbox) {
        checkbox.addEventListener('change', () => {
            validateConsent();
        });
    }
}