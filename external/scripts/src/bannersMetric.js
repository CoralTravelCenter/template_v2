const holidayBlock = document.getElementById('holiday-guide-block');

if (holidayBlock) {
    const holidayBlockTitle = holidayBlock.querySelector('.B2CHeading').textContent;
    const holidayBlockSlides = holidayBlock.querySelectorAll('.swiper-slide');

    holidayBlockSlides.forEach(slide => {
        slide.addEventListener('click', () => {
            const title = slide.querySelector('.title').textContent;

            const yaParams = {
                [holidayBlockTitle]: {
                    'banner': title
                }
            }
            ym(215233,'reachGoal', 'main_block_news_guide', yaParams);
        });
    });
}

const attentionBlock = document.querySelector('.pay-attention');

if (attentionBlock) {
    const attentionBlockTitle = attentionBlock.querySelector('h2').textContent;
    // const attentionBlockSlides = attentionBlock.querySelectorAll('swiper-slide');
    const attentionBlockSlides = attentionBlock.querySelectorAll('.pay-attention-block');

    attentionBlockSlides.forEach(slide => {
        const link = slide.querySelector('a');

        if (link) {
            link.addEventListener('click', () => {
                const title = slide.querySelector('h3').textContent;

                const yaParams = {
                    [attentionBlockTitle]: {
                        'banner': title
                    }
                }
                ym(215233,'reachGoal', 'main_block_news_guide', yaParams);
            });
        }
    });
}

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;

    if (scrolled >= 100 && !window.scrollReached) {
        window.scrollReached = true;

        setTimeout(() => {
            const newsBlock = document.querySelector('.news-slider-block');

            if (newsBlock) {
                const newsBlockTitle = newsBlock.querySelector('.B2CHeading').textContent;
                const newsBlockSlides = newsBlock.querySelectorAll('.swiper-slide');

                newsBlockSlides.forEach(slide => {
                    const title = slide.querySelector('.title').textContent;
                    const links = slide.querySelectorAll('a');

                    if (links.length > 0) {
                        links.forEach(link => {
                            link.addEventListener('click', () => {
                                const yaParams = {
                                    [newsBlockTitle]: {
                                        'banner': title
                                    }
                                }
                                ym(215233,'reachGoal', 'main_block_news_guide', yaParams);
                            });
                        });
                    }
                });
            }
        }, 1000);
    }
});