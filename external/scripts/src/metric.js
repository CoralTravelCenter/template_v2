// async function hostReactAppReady(
//     selector = "#__next > div",
//     timeout = 500,
// ) {
//     return new Promise((resolve) => {
//         const waiter = () => {
//             const host_el = document.querySelector(selector);
//             if (host_el?.getBoundingClientRect().height) {
//                 resolve();
//             } else {
//                 setTimeout(waiter, timeout);
//             }
//         };
//         waiter();
//     });
// }
//
// hostReactAppReady().then(() => {
//     function metric() {
//         const metricAction = ""; // <---- сюда, между кавычек, вставить alt картинки
//
//         const actions = document.querySelectorAll('.promo-list__link');
//
//         actions.forEach(action => {
//             const match = action.querySelector(`[alt="${metricAction}"]`);
//
//             if (match) {
//                 action.addEventListener("click", (e) => {
//                     const yaParams = {
//                         name_stock: {
//                             prosto_promo: {
//                                 name_point: "promo_page"
//                             }
//                         }
//                     };
//                     ym(215233, "reachGoal", "entry-point", yaParams);
//                 });
//             }
//         });
//     }
//
//     const observerActions = new MutationObserver((mutationsList, obs) => {
//         const elementsExist = document.querySelectorAll('.promo-list__link').length > 0;
//
//         if (elementsExist) {
//             metric();
//             obs.disconnect();
//         }
//     });
//
//     observerActions.observe(document.body, {
//         childList: true,
//         subtree: true
//     });
// });


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
    const mainMetricBanner = 'https://www.sunmar.ru/rb-winter/?banner_on_site=main-rb-winter-2026'; // <----- сюда, между кавычек, поставить ссылку с баннера

    const slides = document.querySelectorAll('.swiper-slide');

    slides.forEach(slide => {
        const link = slide.querySelector(`[href="${mainMetricBanner}"]`);

        if (link) {
            link.addEventListener('click', (e) => {
                const yaParams = {
                    name_stock: {
                        prosto_promo: {
                            name_point: "main_page"
                        }
                    }
                }
                ym(215233, "reachGoal", "entry-point", yaParams);
            });
        }
    });
});

