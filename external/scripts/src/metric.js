// function metric() {
//     const metricAction = "Территория бонусов";
//
//     const actions = document.querySelectorAll('.promo-list__link');
//
//     actions.forEach(action => {
//         const match = action.querySelector(`[alt="${metricAction}"]`);
//
//         if (match) {
//             action.addEventListener("click", (e) => {
//                 const yaParams = {
//                     name_stock: {
//                         den_molodezhi: {
//                             name_point: "promo_page"
//                         }
//                     }
//                 };
//                 ym(96674199, "reachGoal", "entry-point", yaParams);
//             });
//         }
//     });
// }
//
// const observerActions = new MutationObserver((mutationsList, obs) => {
//     const elementsExist = document.querySelectorAll('.promo-list__link').length > 0;
//
//     if (elementsExist) {
//         metric();
//         obs.disconnect();
//     }
// });
//
// observerActions.observe(document.body, {
//     childList: true,
//     subtree: true
// });


// const mainMetricBanner = 'https://www.coral.ru/poleznaya-informatsiya/offers/hot-offers/molodezhnye-oteli/?banner_on_site=main-molodezhnye-oteli';
//
// const slides = document.querySelectorAll('.swiper-slide');
//
// slides.forEach(slide => {
//     const link = slide.querySelector(`[href="${mainMetricBanner}"]`);
//
//     if (link) {
//         link.addEventListener('click', (e) => {
//             const yaParams = {
//                 name_stock: {
//                     den_molodezhi: {
//                         name_point: "main_page"
//                     }
//                 }
//             }
//             ym(96674199, "reachGoal", "entry-point", yaParams);
//         });
//     }
// });



const searchMetricLink = "https://www.coral.ru/poleznaya-informatsiya/offers/hot-offers/molodezhnye-oteli/?banner_on_site=search-molodezhnye-oteli";

const observerMetric = new MutationObserver(mutation => {
    const link = document.querySelector(`[href="${searchMetricLink}"]`);

    if (link) {
        link.addEventListener('click', (e) => {
            const yaParams = {
                name_stock: {
                    den_molodezhi: {
                        name_point: "search"
                    }
                }
            };
            ym(96674199, "reachGoal", "entry-point", yaParams);
        });
    }
});

observerMetric.observe(document.body, {
    childList: true,
    subtree: true,
});
