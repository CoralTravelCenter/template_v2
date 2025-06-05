const styleId = 'survey-styles';

if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
    .survey {
      display: flex;
      flex-direction: column;
      padding: 16px 24px;
      background-color: white;
      border-radius: 20px;
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
    }
    
    .survey__field--col {
        flex-direction: column;
        align-items: flex-start;
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
        justify-content: space-between;
    }
    
    .survey__button {
        display: flex;
        align-items: center;
        height: 48px;
        padding-inline: 14px;
        background-color: #0092D0;
    }

  `;
    document.head.appendChild(style);
}

const mapBlock = document.getElementById('hotelDetailMap');
const parentMapBlock = mapBlock.parentNode;

const surveyHTML = `
<div class="survey">
    <div class="survey__head">
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
            <input type="radio" id="point_1" name="survey" value="Смотрю тур на сайте и покупаю в фирменном турагентстве Coral Travel">
            <label for="point_1">
                Смотрю тур на сайте и покупаю в фирменном турагентстве Coral Travel
            </label>
        </div>

        <div class="survey__field">
            <input type="radio" id="point_2" name="survey" value="Смотрю тур на сайте и покупаю в агентстве (не фирменном)">
            <label for="point_2">
                Смотрю тур на сайте и покупаю в агентстве (не фирменном)
            </label>
        </div>
        
        <div class="survey__field">
            <input type="radio" id="point_3" name="survey" value="Смотрю и покупаю тур онлайн на сайте coral.ru">
            <label for="point_3">
                Смотрю и покупаю тур онлайн на сайте coral.ru
            </label>
        </div>
        
        <div class="survey__field">
            <input type="radio" id="point_4" name="survey" value="Смотрю тур на сайте coral.ru, но покупаю на другом сайте">
            <label for="point_4">
                Смотрю тур на сайте coral.ru, но покупаю на другом сайте
            </label>
        </div>
        
        <div class="survey__field">
            <input type="radio" id="point_5" name="survey" value="Смотрю туры на другом сайте, но покупаю на coral.ru">
            <label for="point_5">
                Смотрю туры на другом сайте, но покупаю на coral.ru
            </label>
        </div>
        
        <div class="survey__field survey__field--col">
            <div style="display: flex;">
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
            const fullHeight = content.scrollHeight;
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

sendButton.addEventListener('click', () => {
    const selectedOption = surveyElement.querySelector('input[name="survey"]:checked');
    const otherInputValue = inputOther.value.trim();

    if (!selectedOption) {
        console.warn('Пользователь не выбрал вариант ответа');
        return;
    }

    const answer = selectedOption.value;

    if (selectedOption.id === 'point_6') {
        const yaParams = {
            'Другое': {
                'Текст': otherInputValue
            }
        }

        ym(96674199, 'reachGoal', 'purchase_survey', yaParams);
    } else {
        ym(96674199, 'reachGoal', 'purchase_survey', {
            answer: answer
        });
    }
});




