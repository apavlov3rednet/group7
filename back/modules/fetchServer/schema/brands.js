export default class Brands {
    schema = {
        TITLE: {
            type: 'String',
            require: true,
            default: ''
        },
        COUNTRY: {
            type: 'String',
            require: true,
            default: '',
        },
        PARENT_COMPANY: {
            type: 'String',
            require: false,
            default: '',
        },
        BUDGET: {
            type: 'Number',
            require: true,
            default: 0,
        }
    }

    prepareData(data = {}) {
        
    }
}