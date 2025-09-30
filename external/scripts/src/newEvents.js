// window.dataLayer = window.dataLayer || [];
//
// (() => {
//     const originalPush = window.dataLayer.push.bind(window.dataLayer);
//
//     window.dataLayer.push = (...args) => {
//         for (const item of args) {
//             if (!item || item.event !== 'search_tour') continue;
//
//             const {
//                 ecommerce: { items = [] } = {}
//             } = item;
//
//             for (const tour of items) {
//                 const {
//                     item_adult_count: adultCount,
//                     item_child_count: childCount,
//                     period_flight: [flightDateFrom = '', flightDateTo = ''] = [],
//                     departure: departures = [],
//                     destination: destinations = [],
//                     destination_id: destinationIds = [],
//                     nights = [],
//                     item_variant: searchType
//                 } = tour;
//
//                 const countryIds = destinationIds
//                     .filter(id => id.endsWith('-0'))
//                     .map(id => id.split('-')[0]);
//
//                 // console.log('Country IDs from dataLayer:', ...countryIds);
//
//                 for (const countryId of countryIds) {
//                     mindbox('async', {
//                         operation: 'Website.ViewCategory',
//                         data: {
//                             viewProductCategory: {
//                                 productCategory: {
//                                     ids: { hotels: countryId }
//                                 },
//                                 customerAction: {
//                                     customFields: {
//                                         adultCount,
//                                         childCount,
//                                         distanceToTheAirportInMeters: '',
//                                         distanceToTheBeachInMeters:    '',
//                                         flightDateFrom,
//                                         flightDateTo,
//                                         // hotelDateFrom:  flightDateFrom,
//                                         // hotelDateTo:    flightDateTo,
//                                         // isRecommended:  false,
//                                         // roomName:       '',
//                                         // roomSelected:   false,
//                                         searchType: 1,
//                                         departures,
//                                         // destinationIds,
//                                         destinations,
//                                         hotelCategoryNames: [],
//                                         hotelConcepts:      [],
//                                         nights
//                                     }
//                                 }
//                             }
//                         },
//                         onSuccess: () => console.log(`✅ ViewCategory отправлен для countryId=${countryId}`),
//                         onError:   err => console.error(`❌ Ошибка ViewCategory для countryId=${countryId}`, err)
//                     });
//                 }
//
//                 mindbox('async', {
//                     operation: 'Website.SearchTour',
//                     data: {
//                         customerAction: {
//                             customFields: {
//                                 adultCount,
//                                 childCount,
//                                 flightDateFrom,
//                                 flightDateTo,
//                                 // hotelDateFrom: flightDateFrom,
//                                 // hotelDateTo:   flightDateTo,
//                                 roomName:     '',
//                                 // roomSelected: false,
//                                 searchType: 1,
//                                 departures,
//                                 destinationIds,
//                                 destinations,
//                                 nights
//                             }
//                         }
//                     },
//                     onSuccess: () => {
//                         console.log('✅ SearchTour sent to Mindbox');
//                     },
//                     onError: (err) => {
//                         console.error('❌ SearchTour error', err);
//                     }
//                 });
//             }
//         }
//
//         return originalPush(...args);
//     };
// })();