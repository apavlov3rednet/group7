const burgers = {
    '_id': {},
    TITLE: {
        type: 'String',
            require: true,
            default: 'None',
            loc: "Название",
            sort: true,
            editable: true,
            searchable: true,
    },
    STARS: {
        type: 'Rating',
        require: true,
        default: 0,
        loc: 'Рейтинг',
        sort: true,
        editable: true,
        searchable: false
    },
    SEGEMENT: {
        type: 'List',
        require: true,
        default: 0,
        list: [
            'Низкий', 'Средний', 'Высокий'
        ],
        sort: false,
        editable: true,
        searchable: falses
    },
    TEXT: {
        type: "Text",
        default: "",
        loc: "Текст",
        sort: false,
        editable: true,
        require: true,
    },
    PICTURE: {
        type: "File",
        default: "",
        loc: "Картинка анонса",
        sort: false,
        editable: true,
        filter: false,
    },
}