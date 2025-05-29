const footer = document.querySelector('.footer-menu-row');

if (footer) {
    function addUserFooterStyles() {
        const style = document.createElement('style');
        style.textContent = `
        .с-user-footer-score {
            padding: 12px;
            background-color: #C2E4F6;
            border-radius: 12px;
            max-width: 220px;
            position: relative;
            margin-top: 24px;
            
            @media screen and (max-width: 768px) {
                max-width: 100%;
                width: 100%;
                margin-block: 30px;
            }
        }
        
        .с-user-footer-score::before {
            content: '';
            position: absolute;
            background-image: url("https://b2ccdn.coral.ru/content/mindbox/user-score/img.webp ");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            width: 76px;
            height: 76px;
            right: 10px;
            top: -50px;
        }
        
        .с-user-footer-score__text {
            font-size: 12px;
            font-weight: 600;
            margin: 0;
            margin-bottom: 12px;
        }
        
        .с-user-footer-score__button {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            color: #fff;
            background-color: #0092D0;
            cursor: pointer;
            border-radius: 36px;
            font-size: 12px;
        }
    `;
        document.head.appendChild(style);
    }

    function insertUserFooterScore(targetElement, position = 'beforeend') {
        const html = `
        <div class="с-user-footer-score">
            <p class="с-user-footer-score__text">
                На сколько удобно <br> пользоваться нашим сайтом?
            </p>
            <div class="с-user-footer-score__button" onclick="PopMechanic.show(120292, true);">
                Отправить отзыв
            </div>
        </div>
    `;
        targetElement.insertAdjacentHTML(position, html);
    }

    addUserFooterStyles();

    if (window.innerWidth > 768) {
        const footerCol = footer.querySelectorAll('.ant-col');
        if (footerCol.length > 0) {
            const footerList = footerCol[0].querySelector('.footer-menu-list');
            if (footerList) {
                insertUserFooterScore(footerList);
            }
        }
    } else {
        insertUserFooterScore(footer);
    }
}
