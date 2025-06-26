

const body = document.getElementById('__next');

const html = `
    <div class="disco-ball" id="disco-wrapper">
        <div class="disco-ball__close" id="disco-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7188 0.931762C15.7193 0.931762 15.7197 0.932229 15.7207 0.933163L17.0671 2.27986C17.0681 2.28056 17.0683 2.28102 17.0685 2.28172C17.0686 2.28218 17.0686 2.28267 17.0685 2.28313C17.0685 2.28383 17.0681 2.28429 17.0671 2.28523L10.3523 9.00003L17.0671 15.7148C17.0681 15.7158 17.0683 15.7162 17.0685 15.7169C17.0687 15.7175 17.0687 15.718 17.0685 15.7186C17.0685 15.719 17.0681 15.7195 17.0671 15.7204L15.7204 17.0669C15.7197 17.0678 15.7193 17.0681 15.7188 17.0683C15.7183 17.0685 15.7177 17.0685 15.7172 17.0683C15.7165 17.0683 15.716 17.0678 15.7151 17.0669L9.00026 10.3521L2.28546 17.0669C2.28452 17.0678 2.28406 17.0681 2.28336 17.0683C2.28282 17.0685 2.28226 17.0685 2.28172 17.0683C2.28126 17.0683 2.28079 17.0678 2.27986 17.0669L0.933394 15.7202C0.932461 15.7195 0.932228 15.719 0.931994 15.7186C0.931832 15.718 0.931832 15.7175 0.931994 15.7169C0.931994 15.7162 0.932461 15.7158 0.933394 15.7148L7.6482 9.00003L0.933394 2.28523C0.932461 2.28429 0.932228 2.28383 0.931994 2.28313C0.931832 2.28259 0.931832 2.28202 0.931994 2.28149C0.931994 2.28102 0.932461 2.28056 0.933394 2.27962L2.28009 0.933163C2.28079 0.932229 2.28126 0.931996 2.28172 0.931762C2.28226 0.9316 2.28282 0.9316 2.28336 0.931762C2.28406 0.931762 2.28452 0.932229 2.28546 0.933163L9.00026 7.64797L15.7151 0.933163C15.716 0.932229 15.7165 0.931996 15.7172 0.931762C15.7177 0.9316 15.7183 0.9316 15.7188 0.931762Z" fill="#535353"/>
</svg>
        </div>
        <div class="disco-ball__star disco-ball__star--red js-hide">
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="77" viewBox="0 0 75 77" fill="none">
  <g filter="url(#filter0_d_5909_1065)">
    <path d="M36.5936 0.292969L46.24 26.3618L72.3089 36.0082L46.24 45.6545L36.5936 71.7234L26.9473 45.6545L0.878418 36.0082L26.9473 26.3618L36.5936 0.292969Z" fill="#FF8800"/>
    <path d="M45.6528 26.5791L45.7524 26.8496L46.0229 26.9492L70.5034 36.0078L46.0229 45.0674L45.7524 45.167L45.6528 45.4375L36.5933 69.918L27.5347 45.4375L27.4351 45.167L27.1646 45.0674L2.68311 36.0078L27.1646 26.9492L27.4351 26.8496L27.5347 26.5791L36.5933 2.09766L45.6528 26.5791Z" stroke="black" stroke-width="1.25317"/>
  </g>
  <defs>
    <filter id="filter0_d_5909_1065" x="0.878418" y="0.292969" width="73.9368" height="76.4431" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="2.50633" dy="5.01266"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5909_1065"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5909_1065" result="shape"/>
    </filter>
  </defs>
</svg>
        </div>
        <div class="disco-ball__ball" id="disco-ball">
            <div class="disco-ball__content" style="display: none;" id="disco-content">
                <p class="disco-ball__text">
                    <strong>Скидка от 5 000 ₽</strong> <br>
                    Оторвитесь этим <br>
                    летом!
                </p>
                <a href="/poleznaya-informatsiya/offers/hot-offers/molodezhnye-oteli/" class="disco-ball__link" id="disco-ball-metric">
                    Подробнее
                </a>
            </div>
        </div>
        <div class="disco-ball__star disco-ball__star--yellow js-hide">
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="77" viewBox="0 0 75 77" fill="none">
  <g filter="url(#filter0_d_5909_1064)">
    <path d="M35.9735 0.292969L45.6199 26.3618L71.6887 36.0082L45.6199 45.6545L35.9735 71.7234L26.3272 45.6545L0.258301 36.0082L26.3272 26.3618L35.9735 0.292969Z" fill="#FFF700"/>
    <path d="M45.0327 26.5791L45.1323 26.8496L45.4028 26.9492L69.8833 36.0078L45.4028 45.0674L45.1323 45.167L45.0327 45.4375L35.9731 69.918L26.9146 45.4375L26.8149 45.167L26.5444 45.0674L2.06299 36.0078L26.5444 26.9492L26.8149 26.8496L26.9146 26.5791L35.9731 2.09766L45.0327 26.5791Z" stroke="black" stroke-width="1.25317"/>
  </g>
  <defs>
    <filter id="filter0_d_5909_1064" x="0.258301" y="0.292969" width="73.9368" height="76.4431" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="2.50633" dy="5.01266"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5909_1064"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5909_1064" result="shape"/>
    </filter>
  </defs>
</svg>
        </div>
    </div>
`;

body.insertAdjacentHTML("afterbegin", html);

const discoBall = document.getElementById('disco-ball');

if (discoBall) {
    const discoContent = document.getElementById('disco-content');
    const hideEl = document.querySelectorAll('.js-hide');

    if (window.innerWidth > 768) {
        discoBall.addEventListener('click', (e) => {
            discoContent.style.display = 'flex';
            discoBall.classList.add('darken');

            hideEl.forEach((el) => {
                el.style.display = 'none';
            });
        });
    } else {
        const discoWrapper = document.getElementById('disco-wrapper');
        const discoClose = document.getElementById('disco-close');

        discoBall.addEventListener('click', (e) => {
           discoWrapper.classList.add('opened');

            discoContent.style.display = 'flex';
            discoBall.classList.add('darken');

            hideEl.forEach((el) => {
                el.style.display = 'none';
            });
        });

        discoClose.addEventListener('click', (e) => {
            if (discoWrapper.classList.contains('opened')) {
                discoWrapper.classList.remove('opened');
                discoContent.style.display = 'none';
                discoBall.classList.remove('darken');

                hideEl.forEach((el) => {
                    el.style.display = 'block';
                });
            } else {
                discoWrapper.remove();
            }
        });
    }

    const discoMetric = document.getElementById('disco-ball-metric');

    if (discoMetric) {
        discoMetric.addEventListener('click', (e) => {
            const yaParams = {
                name_stock: {
                    den_molodezhi: {
                        name_point: "disco_ball"
                    }
                }
            }
            ym(96674199, "reachGoal", "entry-point", yaParams);
        });
    }
}

const style = document.createElement('style');
style.textContent = `
    .disco-ball {
        position: fixed;
        z-index: 999;
        right: 20px;
        bottom: 250px;
        cursor: pointer;
        
        display: flex;
        align-items: center;
        justify-content: center;
        
        @media screen and (max-width: 768px) {
            left: 20px;
            right: unset;
            bottom: 170px;
        }
    }
    
    .disco-ball.opened {
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: #00000096;
        z-index: 99999;
        cursor: default;
    }
    
    .disco-ball__close {
        display: none;
        
        @media screen and (max-width: 768px) {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 0;
            top: 0;
            z-index: 2;
            width: 32px;
            height: 32px;
            background-color: white;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0.15);
        }
    }
    
    .opened .disco-ball__close {
        top: 30%;
        right: 15%;
    }
    
    .disco-ball__content {
        flex-direction: column;
        align-items: center;
        padding-right: 1px;
        padding-top: 7px;
        justify-content: center;
        height: 100%;
    }
    
    .disco-ball__text {
        font-size: 13px;
        line-height: 14px;
        text-align: center;
        color: #fff;
        max-width: 158px;
        margin: 0;
        
        @media screen and (max-width: 768px) {
            font-size: 24px;
            line-height: 31px;
            max-width: unset;
        }
    }
    
    a.disco-ball__link {
        font-size: 13px;
        background-color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding-inline: 10px;
        color: inherit!important;
        width: fit-content;
        height: 32px;
        text-decoration: none!important;
        margin-top: 8px;
        font-weight: 600;
        
        @media screen and (max-width: 768px) {
            height: 40px;
            padding-inline: 24px;
        }
    }
    
    a.disco-ball__link:hover {
        color: #0092d0!important;
    }
    
    .disco-ball__star {
        position: absolute;
        z-index: 2;
    }
    
    .disco-ball__star svg {
       @media screen and (max-width: 768px) {
            width: 45px;
            height: 45px;
        } 
    }
    
    .disco-ball__star--red {
        top: 10px;
        left: -10px;
        animation: pulse-red 1.5s infinite ease-in-out;
    }
    
    @keyframes pulse-red {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);    
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes pulse-yellow {
        0% {
            transform: scale(1);
        }
        25% {
            transform: scale(1.1);
        }
        50% {
            transform: scale(0.8);    
        }
        75% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .disco-ball__star--yellow {
        right: 0;
        bottom: 0;
        animation: pulse-yellow 2s infinite ease-out;
    }
    
    .disco-ball__ball {
        position: relative;
        width: 173px;
        height: 172px;
        background-image: url('https://b2ccdn.coral.ru/content/promo/young-day/ball_4.webp');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        
        @media screen and (max-width: 768px) {
            width: 113px;
            height: 113px;
        }
    }
    
    .opened .disco-ball__ball {
       @media screen and (max-width: 768px) {
            width: 375px;
            height: 298px;
       } 
    }
    
    .disco-ball__ball.darken {
        background-image: url('https://b2ccdn.coral.ru/content/promo/young-day/ball_d4.webp');
    }
`;
document.head.append(style);