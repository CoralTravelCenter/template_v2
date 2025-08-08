

const benefits = document.querySelector('.coral-custom-section.benefits');
const narrowSlider = document.querySelector('.coral-custom-section.narrow-slider');
const brandsSlider = document.querySelector('.coral-custom-section.brand-slider');
const rixosElite = document.querySelector('.coral-custom-section.rixos-elite-banner');
const hotels = document.getElementById('section-row-17');
const russia = document.querySelector('.coral-custom-section.russia');
const resortBrands = document.querySelector('.hero.resort-brands');
const guide = document.getElementById('holiday-guide-block');
const attentionSlider = document.querySelector('.coral-custom-section.pay-attention');
const newsSlider = document.querySelector('.news-slider-block');
const popSlider = document.querySelector('.pop-slider');

const booking = document.querySelector('.coral-custom-section.bronirovanie');

const bonusBanner = document.querySelector('.coral-custom-section.bonus-banner');
const bonusSlider = document.getElementById('coral-bonus-slider');

const actionsSlider = document.getElementById('coral-actions-slider');

if (bonusBanner) {
    bonusBanner.remove();
}

if (actionsSlider) {
    actionsSlider.style.display = 'block';
}

if (bonusSlider) {
    bonusSlider.style.display = 'block';
}

if (booking) {
    const bookingSection = booking.querySelector('.coral-custom-section-wrapper');

    if (bookingSection) {
        bookingSection.insertAdjacentHTML('beforeend', `
        <a href="https://www.coral.ru/packagetours/moskva-to-turtsiya-tours/?qp=lWOJw1XDa14WeujkN6zDTskRAKRR%2Bfx%2FNQhRhzTkB8670%2FokdjRaHzgKL%2FK6r4khCF3fkNq6jr32VpophSQYAi%2F9dcU5IJoUvx8U9JjiBwF%2BBLMHLeg6zDZSeXfyVIAIqH%2FzMA89XsUO667lWQjV%2Fc5g416%2FFWp2eDwNhlatn4Wb9Os4G03G9EMmyqANMqthieeszyqRzJ1ax7qgNYQYyshoyITdiyX10qEB%2FvtC86mCqXJQ4Wv4hH7db2nIGwtT2p0fR3d5lDXsgpq3aKqfdhH1MpabIA8DtckpMwGSOO4KhKlPFo2hY4fT72AzOETGaXKnbqQnOJxdUAMuBfLD6w%3D%3D&p=1&w=0&s=0&ws=10" style="margin-top: 10px;" class="coral-button-rounded">Выбрать отель</a>
`);
    }
}

const hotelsOfTheWeek = document.querySelector('.coral-custom-section.hotels-week');

if (hotelsOfTheWeek) {
    hotelsOfTheWeek.insertAdjacentHTML('afterbegin', `
   <h2 class="week-title">Отели недели</h2> 
`);
}

setTimeout(() => {
    const jivo = document.querySelector('jdiv');

    if (jivo) {
        jivo.remove();
    }
}, 1000)

const style = document.createElement('style');
style.textContent = `
      section.hotels-week .coral-custom-section-wrapper {
        border-radius: 24px!important;
      }
      
      section.hotels-week .week-title {
        margin: 0;
        font-size: 28px;
        font-weight: 600;
        line-height: 38px;
        margin-bottom: 18px;
      }
      
      section.hotels-week swiper-container swiper-slide .content {
        padding: 24px!important;
        min-height: 300px!important;
        border-radius: 24px!important;
        width: 43%!important;
      }
      
      section.hotels-week swiper-container swiper-slide .visual>img {
        border-radius: 24px!important;
      }
      
      section.hotels-week swiper-container swiper-slide .content-wrapper {
        padding: 0!important;
      }
      
      .custom-slider-nav-btn {
        top: 53%!important;
      }
      
      #coral-bonus-slider .slider__next {
        top: 45%;
      }
      
      @media screen and (max-width: 1200px) {
        #coral-actions-slider .slider__next,
         #coral-actions-slider .slider__prev {
            display: none;
         }
        section:not(#coral-bonus-slider) > article .wrapper {
            padding-inline: 16px!important;
        }
      }
      
      @media screen and (max-width: 768px) {
        
        section#coral-bonus-slider > article .wrapper {
            padding-inline: 16px!important;
        }
      }
    `;

document.head.append(style);

if (popSlider) {
    popSlider.remove();
}

if (hotels) {
    hotels.style.backgroundColor = 'white';
}

if (rixosElite) {
    rixosElite.remove();
}

if (brandsSlider) {
    brandsSlider.remove();
}

if (benefits) {
    benefits.remove();
}

if (narrowSlider) {
    narrowSlider.remove();
}

if (russia) {
    russia.remove();
}

if (resortBrands) {
    resortBrands.remove();
}

if (guide) {
    guide.remove();
}

if (attentionSlider) {
    attentionSlider.remove();
}

if (newsSlider) {
    newsSlider.remove();
}
