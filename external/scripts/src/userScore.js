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
  </style>
  <div class="user-score">
    <div class="user-score__header">
      <p class="user-score__title">
        На сколько удобно <br> пользоваться нашим сайтом?
      </p>
    </div>
    <div class="user-score__body">
        <div class="user-score__rank">
            <div class="user-score__sun" data-popmechanic-submit onclick="PopMechanic.customs.mark = '1'">
                <img src="https://b2ccdn.coral.ru/content/mindbox/user-score/sun_1.webp" alt="">
            </div>
            <div class="user-score__sun" data-popmechanic-submit onclick="PopMechanic.customs.mark = '2'">
                <img src="https://b2ccdn.coral.ru/content/mindbox/user-score/sun_2.webp" alt="">
            </div>
            <div class="user-score__sun" data-popmechanic-submit onclick="PopMechanic.customs.mark = '3'">
                <img src="https://b2ccdn.coral.ru/content/mindbox/user-score/sun_3.webp" alt="">
            </div>
            <div class="user-score__sun" data-popmechanic-submit onclick="PopMechanic.customs.mark = '4'">
                <img src="https://b2ccdn.coral.ru/content/mindbox/user-score/sun_4.webp" alt="">
            </div>
            <div class="user-score__sun" data-popmechanic-submit onclick="PopMechanic.customs.mark = '5'">
                <img src="https://b2ccdn.coral.ru/content/mindbox/user-score/sun_5.webp" alt="">
            </div>
        </div>
    </div>
    <div class="user-score__footer">
        <p class="user-score__quote">
            Отправляя форму вы даёте согласие на <a href="https://www.coral.ru/soglasie-na-obrabotku-dannyh" target="_blank">обработку персональных данных</a> и на <a href="https://cdn.coral.ru/content/doc/legal/agreement_signup_form_ctcb.pdf" target="_blank"> получение новостей и предложений</a>
        </p>
    </div>
  </div>`;