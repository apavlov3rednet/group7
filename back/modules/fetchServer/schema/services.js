const services = {
    _id: {},
    TITLE: {
        type: 'String',
            require: true,
            default: 'None',
            loc: "Название услуги",
            sort: true,
            editable: true
    },
    DATE: {
        type: 'Date',
        default: date('Y-m-d'),
        loc: 'Дата обращения',
        sort: true,
        editable: true,
    },
    CARD: {
        type: 'DBRef',
        require: true,
        default: 'None',
        loc: "Автомобиль",
        sort: true,
        editable: true,
        collection: 'cards'
    },
    PRICE: {
        type: 'Number',
            require: true,
            default: 'None',
            loc: "Цена",
            sort: true,
            editable: true,
            step: 100
    },
    COUNT: {
        type: 'Number',
            require: true,
            default: 'None',
            loc: "Количество (шт)",
            sort: true,
            editable: true,
            step: 1
    },
       
    };

    export default services;