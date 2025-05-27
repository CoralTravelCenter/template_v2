

const footer = document.querySelector('#footer-column');

if (footer) {
    function addUserFooterStyles() {
        const style = document.createElement('style');
        style.textContent = `
        .user-footer-score {
            padding: 12px;
            background-color: #C2E4F6;
            border-radius: 12px;           
            position: relative;
            margin-top: 50px;
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            max-width: 820px;
            
            @media screen and (max-width: 768px) {
                max-width: 100%;
                width: 100%;
                flex-wrap: wrap;
            }
        }
        
        .user-footer-score__text {
            font-size: 24px;
            line-height: 32px;
            font-weight: 600;
            margin: 0;
            padding-left: 150px;
            
            @media screen and (max-width: 768px) {
                font-size: 20px;
                padding-left: 0;
                width: 100%;
                padding-right: 150px;
            }
        }
        
        .user-footer-score__button {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 48px;
            color: #fff;
            background-color: #0092D0;
            cursor: pointer;
            border-radius: 36px;
            font-size: 16px;
            padding-inline: 32px;
            text-align: center;
            
            @media screen and (max-width: 768px) {
                width: 100%;
                margin-top: 24px;
            }
        }
        
        .user-footer-score__img {
            width: 132px;
            transform: scaleX(-1);
            position: absolute;
            top: -50px;
            
            @media screen and (max-width: 768px) {
                transform: scaleX(1);
                right: 10px;
            }
        }
    `;
        document.head.appendChild(style);
    }

    function insertUserFooterScore(targetElement, position = 'beforebegin') {
        const html = `
        <div class="user-footer-score">
            <img class="user-footer-score__img" src="https://b2ccdn.coral.ru/content/mindbox/user-score/img.webp" alt="">
            <p class="user-footer-score__text">
                На сколько удобно пользоваться <br> нашим сайтом?
            </p>
            <div class="user-footer-score__button" onclick="PopMechanic.show(120292, true);">
                Отправить отзыв
            </div>
        </div>
    `;
        targetElement.insertAdjacentHTML(position, html);
    }

    addUserFooterStyles();

    insertUserFooterScore(footer);
}
