const models = {
    _id: {},
        TITLE: {
            type: 'String',
            require: true,
            default: 'None',
            loc: "Название",
            sort: true,
            editable: true
        },
        BRAND: {
            type: 'DBRef',
            require: true,
            default: 'None',
            loc: "Бренд",
            sort: true,
            editable: true,
            collection: 'brands'
        },
    };

    export default models;