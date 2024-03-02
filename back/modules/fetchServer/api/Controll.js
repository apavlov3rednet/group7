export default class Controll {

    constructor(collectionName = '') {
        this.pathSchema = collectionName;
        //import Schema from `../schema/{$collectionName}.js`;
    }

    preparePost(query) {
        return query;
    }

    static prepareData(data = [], schema = {}) {
        let result = [];

        if(data instanceof Array && Object.keys(schema).length > 0) {
            data.forEach(item => {
                let newRow = {};

                for(let fieldName in schema) {
                    let fieldSchema = schema[fieldName];
                    let newData = (item[fieldName]) ? item[fieldName] : fieldSchema.default;
                    newRow[fieldName] = newData;
                }

                result.push(newRow);
            });
        }

        return result;
    }
}