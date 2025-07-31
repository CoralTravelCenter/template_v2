const countiesMapping = [
    {
        "friendlyUrl": "abhaziya",
        "id": "278-0",
        "name": "Абхазия",
        "type": 0
    },
    {
        "friendlyUrl": "azerbaydjan",
        "id": "7-0",
        "name": "Азербайджан",
        "type": 0
    },
    {
        "friendlyUrl": "andorra",
        "id": "72-0",
        "name": "Андорра",
        "type": 0
    },
    {
        "friendlyUrl": "armeniya",
        "id": "5-0",
        "name": "Армения",
        "type": 0
    },
    {
        "friendlyUrl": "bahreyn",
        "id": "282-0",
        "name": "Бахрейн",
        "type": 0
    },
    {
        "friendlyUrl": "belarus",
        "id": "8-0",
        "name": "Беларусь",
        "type": 0
    },
    {
        "friendlyUrl": "vyetnam",
        "id": "41-0",
        "name": "Вьетнам",
        "type": 0
    },
    {
        "friendlyUrl": "gruziya",
        "id": "15-0",
        "name": "Грузия",
        "type": 0
    },
    {
        "friendlyUrl": "egipet",
        "id": "12-0",
        "name": "Египет",
        "type": 0
    },
    {
        "friendlyUrl": "indiya",
        "id": "52-0",
        "name": "Индия",
        "type": 0
    },
    {
        "friendlyUrl": "indoneziya",
        "id": "38-0",
        "name": "Индонезия",
        "type": 0
    },
    {
        "friendlyUrl": "ispaniya",
        "id": "42-0",
        "name": "Испания",
        "type": 0
    },
    {
        "friendlyUrl": "katar",
        "id": "51-0",
        "name": "Катар",
        "type": 0
    },
    {
        "friendlyUrl": "kuba",
        "id": "48-0",
        "name": "Куба",
        "type": 0
    },
    {
        "friendlyUrl": "mavrikiy",
        "id": "63-0",
        "name": "Маврикий",
        "type": 0
    },
    {
        "friendlyUrl": "malydivy",
        "id": "35-0",
        "name": "Мальдивы",
        "type": 0
    },
    {
        "friendlyUrl": "marokko",
        "id": "45-0",
        "name": "Марокко",
        "type": 0
    },
    {
        "friendlyUrl": "oae",
        "id": "31-0",
        "name": "ОАЭ",
        "type": 0
    },
    {
        "friendlyUrl": "rossiya",
        "id": "3-0",
        "name": "Россия",
        "type": 0
    },
    {
        "friendlyUrl": "seyshely",
        "id": "39-0",
        "name": "Сейшелы",
        "type": 0
    },
    {
        "friendlyUrl": "tailand",
        "id": "33-0",
        "name": "Таиланд",
        "type": 0
    },
    {
        "friendlyUrl": "tanzaniya",
        "id": "60-0",
        "name": "Танзания",
        "type": 0
    },
    {
        "friendlyUrl": "tunis",
        "id": "34-0",
        "name": "Тунис",
        "type": 0
    },
    {
        "friendlyUrl": "turtsiya",
        "id": "1-0",
        "name": "Турция",
        "type": 0
    },
    {
        "friendlyUrl": "uzbekistan",
        "id": "49-0",
        "name": "Узбекистан",
        "type": 0
    },
    {
        "friendlyUrl": "shrilanka",
        "id": "40-0",
        "name": "Шри-Ланка",
        "type": 0
    }
]

const directions = [
    {
        name: "Бахрейн",
        dates: ["2025-08-18", "2025-08-24"],
        nights: 7,
        stars: ["5", "4"]
    },
    {
        name: "Беларусь",
        dates: ["2025-08-18", "2025-08-24"],
        nights: 7,
        stars: ["5"]
    },
    {
        name: "Мальдивы",
        dates: ["2025-08-18", "2025-08-24"],
        nights: 7,
        stars: ["5", "4"]
    },
    {
        name: "Турция",
        dates: ["2025-08-18", "2025-08-24"],
        nights: 7,
        stars: ["5"]
    },
]

const departureLocation = {
    id: "2671-5",
    name: "Москва",
    friendlyUrl: "moskva",
    type: 5
};

function buildPayload(direction, country, reservationType = 0) {
    return {
        additionalFilters: [
            {
                type: 21,
                values: [
                    {
                        id: "2",
                        value: "2"
                    }
                ]
            },
            {
                type: 4,
                values: [
                    {
                        id: country.id,
                        value: country.id
                    }
                ]
            },
            {
                type: 2,
                values: (direction.stars || []).map(star => ({
                    id: star,
                    value: star
                }))
            }
        ],
        arrivalLocations: [{
            id: country.id,
            name: country.name,
            friendlyUrl: country.friendlyUrl,
            type: country.type
        }],
        beginDates: direction.dates,
        datePickerMode: 0,
        departureLocations: [departureLocation],
        flightType: 2,
        nights: [{ value: direction.nights }],
        paging: {
            hasNextPage: false,
            hasPreviousPage: false,
            pageNumber: 1,
            pageSize: 20,
            sortType: 0
        },
        reservationType: reservationType,
        roomCriterias: [{
            passengers: [
                { age: 20, passengerType: 0 },
                { age: 20, passengerType: 0 }
            ]
        }]
    };
}

function fetchPrice(direction, country) {
    const payload = {
        searchSource: 1,
        searchCriterias: buildPayload(direction, country, 0)
    };

    return fetch('https://www.coral.ru/endpoints/PackageTourHotelProduct/PriceSearchList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            const amount = data?.result?.products?.[0]?.offers?.[0]?.price?.amount;
            console.log(`💰 ${country.name}: ${amount ? `${amount} ₽` : "нет данных"}`);
        })
        .catch(err => console.error(`❌ Ошибка при получении цены (${country.name}):`, err));
}

function fetchRedirectUrl(direction, country) {
    const payload = buildPayload(direction, country, 1);

    return fetch('https://www.coral.ru/endpoints/PackageTourHotelProduct/PriceSearchEncrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            const { redirectionUrl, queryParam } = data.result || {};
            if (redirectionUrl && queryParam) {
                const fullUrl = `${redirectionUrl}?qp=${queryParam}&p=1&w=0&s=0&ws=10`;
                console.log(`🔗 ${country.name}: ${fullUrl}`);
            } else {
                console.warn(`⚠️ Нет ссылки для ${country.name}`);
            }
        })
        .catch(err => console.error(`❌ Ошибка при получении ссылки (${country.name}):`, err));
}

directions.forEach(direction => {
    const country = countiesMapping.find(c => c.name === direction.name);

    if (!country) {
        console.warn(`🚫 Страна "${direction.name}" не найдена`);
        return;
    }

    fetchPrice(direction, country).then(r => {});
    fetchRedirectUrl(direction, country).then(r => {});
});


