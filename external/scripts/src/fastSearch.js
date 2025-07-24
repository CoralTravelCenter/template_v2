const countries = [
    {
        friendlyUrl: "egipet",
        id: "12-0",
        name: "Египет",
        type: 0
    },
    {
        friendlyUrl: "egipet",
        id: "12-0",
        name: "Египет",
        type: 0
    }
]

fetch('https://www.coral.ru/endpoints/PackageTourHotelProduct/PriceSearchList', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        searchSource: 1,
        // getOnlyTopHotels: true,
        // dontSearchTopHotels: false,
        // notIncludeFilters: false,
        searchCriterias: {
            arrivalLocations: [
                {
                    friendlyUrl: "egipet",
                    id: "12-0",
                    name: "Египет",
                    type: 0
                }
            ],
            beginDates: ["2025-08-18", "2025-08-24"],
            datePickerMode: 0,
            departureLocations: [
                {
                    id: "2671-5",
                    name: "Москва",
                    friendlyUrl: "moskva",
                    type: 5
                }
            ],
            flightType: 2,
            // imageSizes: [4],
            nights: [{ value: 7 }],
            paging: {
                hasNextPage: false,
                hasPreviousPage: false,
                pageNumber: 1,
                pageSize: 20,
                sortType: 0
            },
            reservationType: 0,
            roomCriterias: [
                {
                    passengers: [
                        { age: 20, passengerType: 0 },
                        { age: 20, passengerType: 0 }
                    ]
                }
            ]
        }
    })
})
    .then(response => response.json())
    .then(data => console.log("✅ Ответ от PriceSearchList:", data.result.products))
    .catch(error => console.error("❌ Ошибка:", error));


// fetch('https://www.coral.ru/endpoints/PackageTourHotelProduct/PriceSearchDecrypt', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         queryParam: "lWOJw1XDa14WeujkN6zDTskRAKRR%2bfx%2fNQhRhzTkB85EoRYV3rb1P8Y0xYsiBInJjMhwaB97g2hT3oVdQ9NsHfI4Y8aSX0%2feU8ANLUU%2fR4PT98CGMYuz1%2b7FfgInrU%2fSpkolur9FaNc0gpXzZPuflU8wrOIBimz%2fZtd0LfGN58c50jcDTEiXlfqnTCwjtQBqUJAxQ6XfXMR8nY4%2bkSBIXwePUbMWc9qXQysXRFI7Jn%2fill022bZGVukr3ugmZnMH7rjImpFv6N5iilPvjE0BxyMXqBw6kdnj7YFbpatghelZk7azGW0XDdCepk3i8WH8"
//     })
// })
//     .then(response => response.json())
//     .then(data => console.log('✅ Расшифрованный объект:', data))
//     .catch(error => console.error('❌ Ошибка запроса:', error));

