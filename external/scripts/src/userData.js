;(function() {
    if (__NEXT_DATA__.props.pageProps.initialState.User.isLoggedIn) return;

    ym(96674199,'reachGoal', 'form_show');

    const TEMP_ID = __NEXT_DATA__.props.pageProps.meta.bookingTransactionDetails.details.summary.voucherId;
    const STYLE_ID = 'custom-login-styles';
    const PHONE_URL = 'https://www.coral.ru/endpoints/Customer/GetCheckExistCustomerByMobilePhone';
    const EMAIL_URL = 'https://www.coral.ru/endpoints/Customer/GetCheckExistCustomerByEmail';

    const alertContainer = document.querySelector('.ant-alert-info');

    if (window.innerWidth > 768) {
        if (alertContainer) {
            alertContainer.style.opacity = '0';
            alertContainer.style.visibility = 'hidden';
            alertContainer.style.position = 'absolute';
            alertContainer.style.left = '-9999px';
        }
    }

    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;

        const css = `
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
        
        .custom-block {
          margin-bottom: 24px;
        }
        
        .custom-title {
          font-size: 20px;
          color: #0093D0;
          margin: 0 0 12px;
          font-weight: 600;
        }
        
        .custom-row {
          display: flex;
          gap: 8px;
          
          @media screen and (max-width: 768px) {
            flex-direction: column;
          }
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
          
          @media screen and (max-width: 768px) {
            width: 100%;
          }
        }
        
        .custom-input-field {
          margin: 0;
          padding: 9.4px 11px;
          color: rgba(0, 0, 0, 0.85);
          font-size: 14px;
          line-height: 1.375;
          font-family: 'Manrope', 'Manrope Fallback', sans-serif;
          display: inline-block;
          position: relative;
          min-width: 0;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          background: #ffffff;
          transition: all 0.2s;
        }
        
        .custom-input-field:focus {
          border-color: #0093d0;
          outline: 0;
          opacity: 0.8;
        }
        
        .custom-input-field::placeholder {
          opacity: 0.3;
        }
        
        .custom-input-field--code {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          flex-basis: 90px;
          flex-shrink: 0;
          box-sizing: border-box;
          padding-right: 25px;
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
          background-repeat: no-repeat;
          background-position: right 5px center;
          background-size: 12px;
          cursor: pointer;
          
          align-self: baseline;
        }
        
        .custom-input-field--tel {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          flex: 1;
        }
        
        .skeleton-loader {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
          background-size: 400% 100%;
          animation: skeleton-animation 1.5s ease infinite;
          z-index: 1;
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.15);
        }
        
        @keyframes skeleton-animation {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        
        .custom-success .custom-input-field {
          background-color: #D9F7BE33;
        }
        
        .custom-error .custom-input-field {
          border-color: #E84F0E;
          background-color: #ffffff;
        }
        
        .custom-error .custom-label__checkbox {
          border-color: #E84F0E;
        }
        
        .custom-tel-inner {
          display: flex;
          flex-direction: column;
          width: 100%;
          align-self: baseline;
          flex: 1;
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
          width: 20px;
          height: 20px;
          border: 1px solid rgba(0, 0, 0, 0.25);
          border-radius: 4px;
          margin-right: 10px;
          transition: all 0.3s;
          flex-shrink: 0;
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
            margin: 0;
        }
        
        .custom-error-quote {
          display: none;
          align-items: center;
          gap: 8px;
          padding-block: 8px;
          padding-inline: 16px;
          border-radius: 8px;
          background-color: #FEEEE7;
          border: 1px solid #F9BA9F;
          margin-top: 20px;
        }
        
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

    `;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = css;
        document.head.appendChild(style);
    }

    function buildUI() {
        const cards = document.querySelectorAll('.ant-card-body');

        const targetCard = Array.from(cards).find(card => {
            return Array.from(card.querySelectorAll('*')).some(element =>
                element.textContent.includes('Данные заказчика для оформления договора')
            );
        });

        if (!targetCard) return;


        const html = `
      <div class="custom-block">
        <h4 id="custom-title" class="custom-title">Давайте проверим, есть ли у вас аккаунт</h4>
        <div class="custom-row">
          <div class="custom-tel-box" id="tel-box">
            <label for="custom-tel" class="visually-hidden">Номер телефона</label>
            <select id="custom-code" class="custom-input-field custom-input-field--code">
              <option value="+7">+7</option>
              <option value="+375">+375</option>
              <option value="+373">+373</option>
              <option value="+48">+48</option>
              <option value="+995">+995</option>
              <option value="+380">+380</option>
            </select>
            <div class="custom-tel-inner">
              <input type="tel" id="custom-tel" class="custom-input-field custom-input-field--tel" placeholder="Номер телефона">
              <span style="color: #e84f0e;"></span>
            </div>
          </div>
          <div class="custom-email-box" id="email-box">
            <label for="custom-email" class="visually-hidden">E-mail</label>
            <input type="email" id="custom-email" class="custom-input-field" placeholder="e-mail">
            <span style="color: #e84f0e;"></span>
          </div>
        </div>
        <div class="custom-row" style="margin-top:14px;">
          <label class="custom-label" id="custom-label" for="custom-check">
            <input type="checkbox" id="custom-check">
            <span class="custom-label__checkbox"></span>
            <span>
              Даю <a href="https://www.coral.ru/soglasie-на-обработку-дannyh/" target="_blank">согласие</a>
              на обработку персональных данных. 
              <a href="https://cdn.coral.ru/content/doc/legal/privacy_policy_coral.pdf" target="_blank">
              Политика обработки персональных данных</a>
            </span>
          </label>
        </div>
        <div id="error-quote" class="custom-error-quote" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M8.12598 1.0661C4.26035 1.0661 1.12598 4.20048 1.12598 8.0661C1.12598 11.9317 4.26035 15.0661 8.12598 15.0661C11.9916 15.0661 15.126 11.9317 15.126 8.0661C15.126 4.20048 11.9916 1.0661 8.12598 1.0661ZM10.7104 10.7255L9.6791 10.7208L8.12598 8.86923L6.57441 10.7192L5.5416 10.7239C5.47285 10.7239 5.4166 10.6692 5.4166 10.5989C5.4166 10.5692 5.42754 10.5411 5.44629 10.5177L7.4791 8.09579L5.44629 5.67548C5.42741 5.65258 5.41693 5.6239 5.4166 5.59423C5.4166 5.52548 5.47285 5.46923 5.5416 5.46923L6.57441 5.47391L8.12598 7.32548L9.67754 5.47548L10.7088 5.47079C10.7775 5.47079 10.8338 5.52548 10.8338 5.59579C10.8338 5.62548 10.8229 5.6536 10.8041 5.67704L8.77441 8.09735L10.8057 10.5192C10.8244 10.5427 10.8354 10.5708 10.8354 10.6005C10.8354 10.6692 10.7791 10.7255 10.7104 10.7255Z" fill="#E84F0E"/>
          </svg>
          <p>Аккаунт с такими данными не найден. При бронировании мы создадим аккаунт для вас автоматически.</p>
        </div>
      </div>
    `;
        targetCard.insertAdjacentHTML('afterbegin', html);
    }

    const utils = {
        isValidPhone(raw) {
            const digits = raw.replace(/\D/g, '');
            return digits.length >= 6;
        },
        isValidEmail(str) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
        },
        debounce(fn, ms = 300) {
            let t;
            return (...args) => {
                clearTimeout(t);
                t = setTimeout(() => fn(...args), ms);
            };
        },
        showError(el, msg) {
            el.textContent = msg;
        },
        clearError(el) {
            el.textContent = '';
        }
    };

    function checkExist(url, payload) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error('network');
                return res.json();
            });
    }

    let telChecked = false, telAvailable = false;
    let emailChecked = false, emailAvailable = false;
    function updateErrorQuote() {
        const quote = document.getElementById('error-quote');
        if (telChecked && emailChecked && !telAvailable && !emailAvailable) {
            quote.style.display = 'flex';
        } else {
            quote.style.display = 'none';
        }
    }

    function bindEvents() {
        const telInput   = document.getElementById('custom-tel');
        const emailInput = document.getElementById('custom-email');
        const codeSelect = document.getElementById('custom-code');
        const checkbox   = document.getElementById('custom-check');
        const telBox     = document.getElementById('tel-box');
        const emailBox   = document.getElementById('email-box');
        const telMsg     = telBox.querySelector('span');
        const emailMsg   = emailBox.querySelector('span');

        function validateConsent() {
            if (!checkbox.checked) {
                document.getElementById('custom-label').classList.add('custom-error');
                return false;
            }
            document.getElementById('custom-label').classList.remove('custom-error');
            return true;
        }

        function checkField(inputEl, boxEl, msgEl, url, buildPayload, onFound, onNotFound) {
            boxEl.querySelector('.skeleton-loader')?.remove();

            const loader = document.createElement('div');
            loader.className = 'skeleton-loader';
            boxEl.appendChild(loader);

            checkExist(url, buildPayload(inputEl.value))
                .then(data => {
                    loader.remove();
                    boxEl.classList.remove('custom-success','custom-error');
                    const ok = data.result?.isAvailable === true;
                    boxEl.classList.add(ok ? 'custom-success' : 'custom-error');

                    if (ok) {
                        utils.clearError(msgEl);
                        onFound();
                    } else {
                        onNotFound && onNotFound();
                    }

                    if (inputEl === telInput) {
                        telChecked   = true;
                        telAvailable = ok;
                    } else {
                        emailChecked   = true;
                        emailAvailable = ok;
                    }

                    updateErrorQuote();
                })
                .catch(err => {
                    loader.remove();
                    boxEl.classList.remove('custom-success','custom-error');
                    boxEl.classList.add('custom-error');
                    utils.showError(msgEl, err.message === 'network'
                        ? 'Ошибка соединения. Попробуйте позже.'
                        : 'Сервис недоступен.');
                    if (inputEl === telInput) telChecked = false;
                    else emailChecked = false;
                    updateErrorQuote();
                });
        }

        telInput.addEventListener('blur', utils.debounce(() => {
            const raw = telInput.value;
            utils.clearError(telMsg);
            telBox.classList.remove('custom-success','custom-error');

            if (!utils.isValidPhone(raw)) {
                telBox.classList.add('custom-error');
                return utils.showError(telMsg,'Введите корректный номер');
            }

            if (!validateConsent()) return;

            const digits = raw.replace(/\D/g, '');
            const fullPhone = codeSelect.value + digits;

            checkField(
                telInput,
                telBox,
                telMsg,
                PHONE_URL,
                () => ({
                    mobilePhonePrefix: codeSelect.value,
                    mobilePhone: `(${digits.slice(0,3)}) ${digits.slice(3,6)} ${digits.slice(6,8)} ${digits.slice(8)}`
                }),
                () => {
                    openModal();
                    ym(96674199, 'reachGoal', 'data', {
                        phone: fullPhone,
                        temporary_id: TEMP_ID
                    });
                },
                () => {
                    utils.showError(telMsg, 'Мы не нашли вас по номеру, попробуйте ввести почту');

                    ym(96674199, 'reachGoal', 'data', {
                        phone: fullPhone,
                        temporary_id: TEMP_ID
                    });
                }
            );
        }, 200));

        emailInput.addEventListener('blur', utils.debounce(() => {
            const rawEmail = emailInput.value.trim();
            utils.clearError(emailMsg);
            emailBox.classList.remove('custom-success','custom-error');

            if (!utils.isValidEmail(rawEmail)) {
                emailBox.classList.add('custom-error');
                return utils.showError(emailMsg, 'Введите корректный адрес почты');
            }
            if (!validateConsent()) return;

            checkField(
                emailInput,
                emailBox,
                emailMsg,
                EMAIL_URL,
                () => ({ email: rawEmail }),
                () => {
                    openModal();
                    ym(96674199, 'reachGoal', 'data', {
                        email: rawEmail,
                        temporary_id: TEMP_ID
                    });
                },
                () => {
                    // utils.showError(emailMsg, 'Мы не нашли вас по почте, попробуйте номер телефона');

                    ym(96674199, 'reachGoal', 'data', {
                        email: rawEmail,
                        temporary_id: TEMP_ID
                    });
                }
            );
        }, 200));

        checkbox.addEventListener('change', () => {
            document.getElementById('custom-label')
                .classList.toggle('custom-error', !checkbox.checked);
        });
    }

    function openModal() {
        if (window.innerWidth <= 768) {
            const mobileHeader = document.querySelector('.header-mobile');

            if (mobileHeader) {
                const rightSide = mobileHeader.querySelector('.right-group');

                if (rightSide) {
                    const loginButton = rightSide.querySelector('button');

                    if (loginButton) {
                        loginButton.click();
                    }
                }
            }
        } else if (alertContainer) {
            const loginButton = alertContainer.querySelector('.link');

            if (loginButton) {
                loginButton.click();
            }
        }
    }

    injectStyles();
    buildUI();
    bindEvents();
})();