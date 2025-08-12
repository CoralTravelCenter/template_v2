

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

const section1 = document.getElementById('section-row-9');
const section2 = document.getElementById('section-row-13');
const section3 = document.getElementById('section-row-7');
const section4 = document.getElementById('section-row-14');
const section5 = document.getElementById('section-row-12');

if (section1) {
    section1.remove();
}

if (section2) {
    section2.remove();
}

if (section3) {
    section4.remove();
}

if (section4) {
    section4.remove();
}

if (section5) {
    section5.remove();
}

const bonusBanner = document.querySelector('.coral-custom-section.bonus-banner');
const bonusSlider = document.getElementById('coral-bonus-slider');

const actionsSlider = document.getElementById('coral-actions-slider');

if (bonusBanner) {
    bonusBanner.remove();
}

if (actionsSlider) {
    actionsSlider.style.display = 'block';
    ym(96674199, 'reachGoal', 'min_home_page_show');
    metric(actionsSlider, 'Наши акции');
}

if (bonusSlider) {
    bonusSlider.style.display = 'block';
    metric(bonusSlider, 'Coral Bonus');
}

function metric(sliderElement, sliderTitle) {
    const slides = sliderElement.querySelectorAll('.swiper-slide');

    slides.forEach(slide => {
        const title = slide.dataset.title;
        const button = slide.querySelector('.actions__link');

        button.addEventListener('click', () => {
            ym(96674199, "reachGoal", "min_home_page_click", {
                name_block: {
                    [sliderTitle]: {
                        name_banner: title,
                    },
                },
            });
            console.log(sliderTitle, title);
        });
    });
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
      
      .coral .slider__prev {
        border: 1px solid white;
        transition: 0.2s linear;
      }
      
      .coral .slider__prev:hover {
        border-color: #66d1ff;
      }
      
      .coral .slider__prev:hover path {
        fill: #66d1ff;
      }
      
      .coral .slider__next:hover {
        border-color: #66d1ff;
      }
      
      .coral .slider__next:hover path {
        fill: #66d1ff;
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
