const news = {
    _id: {},
    TITLE: {
        //goverment number
        type: "String",
        require: true,
        default: "None",
        loc: "Заголовок",
        sort: false,
        editable: true,
    },
    CODE: {
        type: "Simbol",
        require: true,
        default: '',
        loc: 'Символьный код новости',
        sort: false,
        editable: true,
    },
    ANOUNCE: {
        //goverment number
        type: "String",
        require: true,
        default: "None",
        loc: "Анонс",
        sort: false,
        editable: true,
    },
    DATE: {
        type: "Date",
        default: Date.now(),
        loc: "Дата создания",
        sort: false,
        editable: true,
        filter: true,
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
};

export default news;
