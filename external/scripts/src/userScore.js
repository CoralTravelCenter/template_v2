document.body.innerHTML += `
  <style>
    .user-score {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #fff;
      border-radius: 20px;
      z-index: 1000;
      max-width: 510px;
    }
    
    .user-score__header {
        padding-inline: 16px;
        height: 140px;
        display: flex;
        align-items: center;
        background-color: #C2E4F6;
        background-image: url("https://b2ccdn.coral.ru/content/mindbox/user-score/img.webp");
        background-repeat: no-repeat;
        background-position: right;
        background-size: contain;
        border-radius: 16px 16px 0 0;
    }
    
    .user-score__title {
        margin: 0;
        font-size: 24px;
        line-height: 32px;
        font-weight: 600;
    }
    
    .user-score__body {
        padding: 16px;
    }
    
    .user-score__rank {
        display: flex;
        gap: 28px;
        justify-content: center;
    }
    
    .user-score__sun {
        width: 70px;
        height: 70px;
        cursor: pointer;
    }
    
    .user-score__footer {
        padding: 16px;
        background-color: #F3F9FF;
        border-radius: 0 0 16px 16px;
    }
    
    .user-score__quote {
        font-size: 12px;
    }
    
    .user-score__subtitle {
        font-size: 20px;
        line-height: 28px;
        font-weight: 600;
        margin: 0 0 8px;
    }
    
    .user-score__area {
        margin-top: 16px;
    }
    
    .user-score__textarea {
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: #FFF;
        padding: 12px;
        font-size: 16px;
        line-height: 24px;
        width: 100%;
        resize: vertical;
        font-family: Manrope, "Manrope Fallback", sans-serif !important;
    }
    
    .user-score__textarea::placeholder {
        color: rgba(0, 0, 0, 0.25);
        font-family: Manrope, "Manrope Fallback", sans-serif !important;
    }
    
    .user-score__button {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
    }
    
    .user-score__button button {
        display: flex;
        height: 48px;
        padding-inline: 24px;
        align-items: center;
        background-color: #0092D0;
        border-radius: 64px;
        color: #FFF;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        border: none;
        cursor: pointer;
        -webkit-font-smoothing: antialiased;
    }
    
    .user-score__quote a {
        color: inherit!important;
    }
    
    .user-score__sun.inactive {
        opacity: 0.3;
    }

    .user-score__area {
        display: none;
    }

    .user-score__area.active {
        display: block;
    }
  </style>
  <div class="user-score">
    <div class="user-score__header">
      <p class="user-score__title">
        На сколько удобно <br> пользоваться нашим сайтом?
      </p>
    </div>
    <div class="user-score__body">
        <div class="user-score__rank">
            <div class="user-score__sun js-score-sun" data-score="1">
                <img src="https://b2ccdn.coral.ru/content/mindbox/user-score/sun_1.webp" alt="">
            </div>
            <div class="user-score__sun js-score-sun" data-score="2">
                <img src="https://b2ccdn.coral.ru/content/mindbox/user-score/sun_2.webp" alt="">
            </div>
            <div class="user-score__sun js-score-sun" data-score="3">
                <img src="https://b2ccdn.coral.ru/content/mindbox/user-score/sun_3.webp" alt="">
            </div>
            <div class="user-score__sun js-score-sun" data-score="4">
                <img src="https://b2ccdn.coral.ru/content/mindbox/user-score/sun_4.webp" alt="">
            </div>
            <div class="user-score__sun js-score-sun" data-score="5">
                <img src="https://b2ccdn.coral.ru/content/mindbox/user-score/sun_5.webp" alt="">
            </div>
        </div>
        
        <div class="user-score__area js-score-area">
            <div class="user-score__field">
                <p class="user-score__subtitle js-score-subtitle">
                    Что понравилось больше всего?
                </p>
                <textarea class="user-score__textarea js-score-textarea" data-popmechanic-input="custom.message" placeholder="Расскажите подробнее" rows="1"></textarea>
            </div>
            <div class="user-score__field js-score-contacts" style="display: none; margin-top: 16px;">
                <p class="user-score__subtitle">
                  Если вам нужна помощь менеджеров оставьте свой номер телефона или e-mail.
                </p>
                <textarea class="user-score__textarea" data-popmechanic-input="custom.contacts" placeholder="Ваш номер телефона или e-mail" rows="1"></textarea>
            </div>
            <div class="user-score__button">
                <button data-popmechanic-submit class="js-score-submit">Отправить</button>
            </div>
        </div>
    </div>
    <div class="user-score__footer">
        <p class="user-score__quote">
            Отправляя форму вы даёте согласие на <a href="https://www.coral.ru/soglasie-na-obrabotku-dannyh" target="_blank">обработку персональных данных</a> и на <a href="https://cdn.coral.ru/content/doc/legal/agreement_signup_form_ctcb.pdf" target="_blank"> получение новостей и предложений</a>
        </p>
    </div>
  </div>`;

const suns = document.querySelectorAll('.js-score-sun');
const area = document.querySelector('.js-score-area');
const subtitle = document.querySelector('.js-score-subtitle');
const contactField = document.querySelector('.js-score-contacts');
const textarea = document.querySelector('.js-score-textarea');
const submitButton = document.querySelector('.js-score-submit');

let selectedScore = null;

const textsByScore = {
    1: {
        subtitle: 'С какими сложностями вы столкнулись? <span style="color: red;">*</span>',
        showContact: true,
        required: true
    },
    2: {
        subtitle: 'С какими сложностями вы столкнулись? <span style="color: red;">*</span>',
        showContact: true,
        required: true
    },
    3: {
        subtitle: 'С какими сложностями вы столкнулись? <span style="color: red;">*</span>',
        showContact: false,
        required: true
    },
    4: {
        subtitle: 'Что можно улучшить?',
        showContact: false,
        required: false
    },
    5: {
        subtitle: 'Что понравилось больше всего?',
        showContact: false,
        required: false
    }
};


suns.forEach(sun => sun.classList.remove('inactive'));
area.classList.remove('active');
contactField.style.display = 'none';

suns.forEach(sun => {
    sun.addEventListener('click', () => {
        const score = sun.dataset.score;

        suns.forEach(s => {
            s.classList.toggle('inactive', s !== sun);
        });

        area.classList.add('active');
        subtitle.innerHTML = textsByScore[score].subtitle;
        textarea.required = textsByScore[score].required;

        if (textsByScore[score].showContact) {
            contactField.style.display = 'block';
        } else {
            contactField.style.display = 'none';
        }
    });
});

submitButton.addEventListener('click', (e) => {
    if (!selectedScore) {
        e.preventDefault();
        alert('Пожалуйста, выберите оценку.');
        return;
    }

    PopMechanic.customs.mark = selectedScore;

    if (textsByScore[selectedScore].required && !textarea.value.trim()) {
        e.preventDefault();
        alert('Пожалуйста, заполните поле с описанием.');
        return;
    }

    if (textsByScore[selectedScore].showContact && !contactField.value.trim()) {
        e.preventDefault();
        alert('Пожалуйста, введите контакт.');
    }
});
