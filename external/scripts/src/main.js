async function hostReactAppReady(selector = '#__next > div', timeout = 500) {
    return new Promise(resolve => {
        const waiter = () => {
            const host_el = document.querySelector(selector);
            if (host_el?.getBoundingClientRect().height) {
                resolve();
            } else {
                setTimeout(waiter, timeout);
            }
        };
        waiter();
    });
}

hostReactAppReady().then(() => {

});

const obs = new MutationObserver(() => {

});

obs.observe(document, {
    childList: true,
    subtree: true
});

(() => {})();


style.textContent = `
      .elite-popup {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #00000070;
        z-index: 1000;
        padding-inline: 16px;
      }

      .elite-popup__wrapper {
        position: relative;
        background-image: url(https://b2ccdn.coral.ru/content/landing-pages/elite-service/2026/elite_popup.png);
        display: flex;
        width: 948px;
        height: 444px;
        background-repeat: no-repeat;
        background-position: right;
        border-radius: 20px;
      }

      .elite-popup__info {
        display: flex;
        flex-direction: column;
        padding-inline: 42px;
        padding-block: 32px;
        background-color: #262626;
        max-width: 425px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        gap: 16px;
      }

      .elite-popup__title {
        margin: 0;
        color: white;
        font-size: 32px;
        line-height: 40px;
      }

      .elite-popup__text {
        margin: 0;
        color: white;
        font-size: 16px;
        line-height: 24px;
      }

      .elite-popup__close {
        position: absolute;
        top: 24px;
        right: 24px;
        cursor: pointer;
      }

      .elite-popup__link {
        display: flex;
        align-items: center;
        height: 48px;
        justify-content: center;
        width: 100%;
        border-radius: 12px;
        background-color: #0092D0;
        color: white;
        text-decoration: none;
        pointer-events: none;
        opacity: .6;
      }

      .elite-popup__link.is-enabled {
        pointer-events: auto;
        opacity: 1;
      }

      .elite-popup__back {
        display: flex;
        align-items: center;
        height: 48px;
        justify-content: center;
        width: 100%;
        color: white;
        text-decoration: none;
        opacity: .9;
      }

      .elite-popup__back:hover { opacity: 1; }

      /* ===== custom dropdown ===== */
      .elite-dd { position: relative; }

      .elite-dd__btn{
        width: 100%;
        height: 48px;
        border-radius: 12px;
        border: 1px solid #444;
        background: #1f1f1f;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 14px 0 16px;
        cursor: pointer;
        outline: none;
      }

      .elite-dd__btn:focus{
        border-color: #0092D0;
        box-shadow: 0 0 0 3px rgba(0,146,208,.25);
      }

      .elite-dd__value{
        font-size: 16px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .elite-dd__chevron{
        width: 18px;
        height: 18px;
        flex: 0 0 18px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 14px;
        transition: transform .15s ease;
        background-image: url("data:image/svg+xml,%3Csvg width='14' height='9' viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7L13 1' stroke='white' stroke-width='2'/%3E%3C/svg%3E");
      }

      .elite-dd.is-open .elite-dd__chevron{ transform: rotate(180deg); }

      .elite-dd__panel{
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        right: 0;
        background: #1f1f1f;
        border: 1px solid #444;
        border-radius: 12px;
        overflow: hidden;
        z-index: 5;
        max-height: 220px;
      }

      .elite-dd__list{
        list-style: none;
        margin: 0;
        padding: 6px;
        outline: none;
        overflow: auto;
        max-height: 220px;
      }

      .elite-dd__item{
        padding: 10px 10px;
        border-radius: 10px;
        cursor: pointer;
        color: #fff;
      }

      .elite-dd__item:hover,
      .elite-dd__item.is-active{
        background: rgba(0,146,208,.18);
      }

      .elite-dd__item[aria-selected="true"]{
        background: rgba(0,146,208,.28);
      }
      
      @media screen and (max-width: 992px) {
        .elite-shield {
            height: 36px;
            width: 36px;
            margin-right: 6px;
        }
      }

      @media screen and (max-width: 768px) {
      .elite-shield {
            
            margin-right: 0;
        }
        
        .elite-popup__wrapper {
          height: 673px;
          width: 100%;
          max-width: 396px;
          align-items: flex-end;
          background-position: -100px top;
          background-size: 500px;
        }

        .elite-popup__info {
          padding: 16px;
          border-top-left-radius: 0;
          border-bottom-right-radius: 20px;
        }

        .elite-popup__title,
        .elite-popup__text {
          text-align: center;
        }
      }
    `;