export default class Controll {

    constructor(collectionName = '') {
        this.pathSchema = collectionName;
        import Schema from `../schema/{$collectionName}.js`;
    }

    preparePost(query) {
        return query;
    }
}