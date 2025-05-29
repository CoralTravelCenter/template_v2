let currentPath = location.pathname;

function shouldShowFooterBlock(pathname) {
    return pathname.startsWith('/thank-you');
}

function initUserFooterBlock() {
    const footerThanks = document.querySelector('#section-row-4');
    if (footerThanks && !document.querySelector('.user-footer-score-bg')) {
        const footerThanks = document.querySelector('#section-row-4');

        if (footerThanks) {
            function addUserFooterStyles() {
                const style = document.createElement('style');
                style.textContent = `
                .user-footer-score {
                    padding: 12px;
                    background-color: #C2E4F6;
                    border-radius: 12px;           
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    
                    @media screen and (max-width: 768px) {
                        max-width: 100%;
                        flex-wrap: wrap;
                    }
                }

                .user-footer-score__text {
                    font-size: 20px;
                    line-height: 26px;
                    font-weight: 600;
                    margin: 0;
                    padding-left: 130px;

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
                    margin-left: 10px;

                    @media screen and (max-width: 768px) {
                        width: 100%;
                        margin-top: 24px;
                        margin-left: 0;
                    }
                }

                .user-footer-score__img {
                    width: 118px;
                    transform: scaleX(-1);
                    position: absolute;
                    top: -50px;

                    @media screen and (max-width: 768px) {
                        transform: scaleX(1);
                        right: 10px;
                        top: unset;
                        bottom: 80px;
                    }
                }

                .user-footer-score-wrapper {
                    max-width: 738px;
                    width: 100%;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                }

                .user-footer-score-bg {
                    background-color: rgba(245, 245, 245, 1);
                    padding-bottom: 24px;

                    @media screen and (max-width: 768px) {
                        padding-inline: 16px;
                    }
                }
            `;
                document.head.appendChild(style);
            }

            function insertUserFooterScore(targetElement, position = 'beforebegin') {
                const html = `
                <div class="user-footer-score-bg">
                    <div class="user-footer-score-wrapper">
                        <div class="user-footer-score">
                            <img class="user-footer-score__img" src="https://b2ccdn.coral.ru/content/mindbox/user-score/img.webp" alt="">
                            <p class="user-footer-score__text">
                                На сколько удобно пользоваться <br> нашим сайтом?
                            </p>
                            <div class="user-footer-score__button" onclick="PopMechanic.show(120292, true);">
                                Отправить отзыв
                            </div>
                        </div>
                    </div>
                </div>
            `;
                targetElement.insertAdjacentHTML(position, html);
            }

            addUserFooterStyles();
            insertUserFooterScore(footerThanks);
        }
    }
}

function cleanupUserFooterBlock() {
    const existingBlock = document.querySelector('.user-footer-score-bg');
    if (existingBlock) {
        existingBlock.remove();
    }
}

if (shouldShowFooterBlock(location.pathname)) {
    initUserFooterBlock();
} else {
    cleanupUserFooterBlock();
}

setInterval(() => {
    if (location.pathname !== currentPath) {
        currentPath = location.pathname;

        if (shouldShowFooterBlock(currentPath)) {
            initUserFooterBlock();
        } else {
            cleanupUserFooterBlock();
        }
    }
}, 500);