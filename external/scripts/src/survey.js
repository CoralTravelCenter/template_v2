const styleId = 'survey-styles';

if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
    .survey {
        padding: 16px 24px;
      background-color: white;
      border-radius: 20px;
    }
    
    .survey__wrapper {
      display: flex;
      flex-direction: column;
    }
    
    .survey__title {
        font-size: 20px;
        line-height: 28px;
        font-weight: 600;
        margin: 0;
    }
    
    .survey__subtitle {
        font-size: 14px;
        line-height: 22px;
        margin: 0;
    }
    
    .survey__field {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .survey__field input {
        margin: 0;
    }
    
    .survey__field label {
        cursor: pointer;
    }
    
    .survey__field--col {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .survey__field--col input {
        border-radius: 6px;
        border: 1px solid #e5e5e5;
        padding-block: 12px;
        padding-inline: 16px;
        width: 100%;
        max-width: 435px;
        font-size: 14px;
    }
    
    .survey__field--col input::placeholder {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.25);
    }
    
    .survey__content {
        overflow: hidden;
        transition: max-height 0.3s ease;
        will-change: max-height;
        
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 16px;
    }

    .survey__content--collapsed {
        max-height: 0;
        padding: 0;
        margin: 0;
    }

    .survey__arrow svg {
        transition: transform 0.3s ease;
    }

    .survey__arrow--rotated svg {
        transform: rotate(180deg);
    }
    
    .survey__head {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    
    .survey__arrow {
        margin-left: auto;
        padding-left: 8px;
    }
    
    .survey__button {
        display: flex;
        align-items: center;
        height: 48px;
        padding-inline: 50px;
        background-color: #0092D0;
        color: white;
        border-radius: 12px;
        width: fit-content;
        cursor: pointer;
    }
    
    .survey__icon {
        font-size: 32px;
        margin-right: 16px;
        margin-block: 0;
        
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
    
    .survey__text {
        margin: 0;
        margin-top: 8px;
    }
    
    .survey__final {
        flex-direction: column;
        align-items: center;
    }

  `;
    document.head.appendChild(style);
}

const mapBlock = document.getElementById('hotelDetailMap');
if (mapBlock) {
    const parentMapBlock = mapBlock.parentNode;

    const surveyHTML = `
<div class="survey">
    <div class="survey__wrapper">
    <div class="survey__head">
        <p class="survey__icon">
            👋
        </p>
      <div class="survey__head-text">
        <h4 class="survey__title">
          Расскажите как вы обычно бронируете туры от Соral Travel?
        </h4>
        <p class="survey__subtitle">
          Ответ анонимен, займёт не больше 10 секунд
        </p>
      </div>
      <div class="survey__arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
          <path d="M11 6L6 0.999999L1 6" stroke="#535353" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <div class="survey__content">
        <div class="survey__field">
            <input type="radio" id="point_1" name="survey" value="Смотрю тур на сайте, но покупаю в фирменном турагентстве Coral Travel">
            <label for="point_1">
                Смотрю тур на сайте, но покупаю в фирменном турагентстве Coral Travel
            </label>
        </div>

        <div class="survey__field">
            <input type="radio" id="point_2" name="survey" value="Смотрю тур на сайте, но покупаю в любом турагентстве">
            <label for="point_2">
                Смотрю тур на сайте, но покупаю в любом турагентстве
            </label>
        </div>
        
        <div class="survey__field">
            <input type="radio" id="point_3" name="survey" value="Смотрю и покупаю тур онлайн на сайте coral.ru">
            <label for="point_3">
                Смотрю и покупаю тур онлайн на сайте coral.ru
            </label>
        </div>
        
        <div class="survey__field">
            <input type="radio" id="point_4" name="survey" value="Смотрю тур на сайте coral.ru, но покупаю на другом сайте">
            <label for="point_4">
                Смотрю тур на сайте coral.ru, но покупаю на другом сайте
            </label>
        </div>
        
        <div class="survey__field">
            <input type="radio" id="point_5" name="survey" value="Смотрю тур на другом сайте, но покупаю на coral.ru">
            <label for="point_5">
                Смотрю тур на другом сайте, но покупаю на coral.ru
            </label>
        </div>
        
        <div class="survey__field survey__field--col">
            <div style="display: flex; gap: 8px;">
                <input type="radio" id="point_6" name="survey" value="другое">
                <label for="point_6">
                    Другое
                </label>
            </div>
            <input type="text" name="other" placeholder="Введите свой вариант">
        </div>
        
        <div class="survey__button" id="survey-send-button">
            Отправить
        </div>
    </div>
    </div>
    
    <div class="survey__final" style="display: none;">
    
        <h4 class="survey__title">
            Спасибо за участие!
        </h4>
        <p class="survey__text">
            Ваш ответ поможет улучшить наш сервис
        </p>
    </div>
</div>
`;

    const surveyElement = document.createElement('div');
    surveyElement.innerHTML = surveyHTML;

    parentMapBlock.parentNode.insertBefore(surveyElement, parentMapBlock);

    const head = surveyElement.querySelector('.survey__head');
    const content = surveyElement.querySelector('.survey__content');
    const arrow = surveyElement.querySelector('.survey__arrow');

    content.style.maxHeight = content.scrollHeight + 'px';

    head.addEventListener('click', () => {
        const isCollapsed = content.classList.contains('survey__content--collapsed');

        if (isCollapsed) {
            content.classList.remove('survey__content--collapsed');

            content.style.maxHeight = '0px';

            requestAnimationFrame(() => {
                const fullHeight = content.scrollHeight + 100;
                content.style.maxHeight = fullHeight + 'px';
            });
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            requestAnimationFrame(() => {
                content.style.maxHeight = '0px';
            });

            setTimeout(() => {
                content.classList.add('survey__content--collapsed');
            }, 300);
        }

        arrow.classList.toggle('survey__arrow--rotated');
    });

    const radioOther = surveyElement.querySelector('#point_6');
    const inputOther = surveyElement.querySelector('input[name="other"]');

    radioOther.addEventListener('change', () => {
        if (radioOther.checked) {
            inputOther.focus();
        }
    });

    inputOther.addEventListener('input', () => {
        if (inputOther.value.trim()) {
            radioOther.checked = true;
        }
    });

    inputOther.addEventListener('focus', () => {
        radioOther.checked = true;
    });


    const sendButton = surveyElement.querySelector('#survey-send-button');

    const wrapper = surveyElement.querySelector('.survey__wrapper');
    const final = surveyElement.querySelector('.survey__final');

    sendButton.addEventListener('click', () => {
        const selectedOption = surveyElement.querySelector('input[name="survey"]:checked');
        const otherInputValue = inputOther.value.trim();

        if (!selectedOption) {
            return;
        }

        const answer = selectedOption.value;

        if (selectedOption.id === 'point_6') {
            const yaParams = {
                'Другое': {
                    'Текст': otherInputValue
                }
            };
            ym(96674199, 'reachGoal', 'purchase_survey', yaParams);
        } else {
            ym(96674199, 'reachGoal', 'purchase_survey', {
                answer: answer
            });
        }

        wrapper.style.display = 'none';
        final.style.display = 'flex';
    });
}