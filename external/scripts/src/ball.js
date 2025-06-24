

const body = document.getElementById('__next');

const html = `
    <div class="disco-ball">
        <div class="disco-ball__star disco-ball__star--red">
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
                    Скидка от 5 000 ₽ <br>
                    Оторвитесь этим <br>
                    летом!
                </p>
                <a href="/" class="disco-ball__link">
                    Подробнее
                </a>
            </div>
        </div>
        <div class="disco-ball__star disco-ball__star--yellow">
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
const discoContent = document.getElementById('disco-content');

discoBall.addEventListener('click', (e) => {
    discoContent.style.display = 'flex';
});

const style = document.createElement('style');
style.textContent = `
    .disco-ball {
        position: fixed;
        z-index: 999;
        right: 20px;
        bottom: 250px;
        cursor: pointer;
    }
    
    .disco-ball__content {
        flex-direction: column;
    }
    
    .disco-ball__star {
        position: absolute;
        z-index: 2;
    }
    
    .disco-ball__star--red {
        top: 10px;
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
        right: 20px;
        bottom: 0;
        animation: pulse-yellow 2s infinite ease-out;
    }
    
    .disco-ball__ball {
        position: relative;
        width: 216px;
        height: 158px;
        background-image: url('https://b2ccdn.coral.ru/content/promo/young-day/disco.webp');
        background-repeat: no-repeat;
        background-size: contain;
        
        @media screen and (max-width: 768px) {
            width: 375px;
            height: 298px;
        }
    }
`;
document.head.append(style);