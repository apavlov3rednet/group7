import { MongoClient } from 'mongodb';

export default class MDB
{
    static #PORT = '27017';
    static #LOCATION = 'mongodb://localhost';
    static #LOGIN;
    static #PSSWD;
    static #DBNAME = 'group7';

    constructor(collectionName) {
        console.log('start DB connect');
        const url = [MDB.#LOCATION, MDB.#PORT].join(':') + '/';
        this.client = new MongoClient(url);
        this.db = this.client.db(MDB.#DBNAME);
        this.collection = this.db.collection(collectionName);
        console.log('DB connect success');
    }

    changeCollection(collectionName) {
        this.collection = this.db.collection(collectionName);
    }

    async getCountElements(collectionName) {
        try {
            this.client.connect();
            const db = this.client.db(MDB.#DBNAME);
            const collection = db.collection(collectionName);
            const count = await collection.countDocuments();
            return count;
        }
        catch(e) {
            console.log(e);
        }
       
    }

    getCollection(collectionName) {
        try {
            this.client.connect();
            const db = this.client.db(MDB.#DBNAME);
            return db.collection(collectionName);
        }
        catch(e) {
            console.log(e);
        }
    }

    getCount(key) {
        let values = MDB.getValue(key);
        if(values instanceof Array)
            return values.length;

        return 0;
    }

    /**
     * 
     * @param {string} collectionName 
     * @returns 
     */
    issetCollection(collectionName) {
        let result = this.db[collectionName];
        this.mongoClient.close();
        return (result);
    }

    /**
     * 
     * @param {string} nameCollection 
     * @param {Object} params 
     * @returns 
     */
    async createCollection(nameCollection, params = {}) {
        let collection = await this.db.createCollection(nameCollection, params);
        this.mongoClient.close();
        return collection;
    }


    /**
     * 
     * @param {string} collectionName 
     * @param {object} filter 
     * @param {array} select 
     * @param {number} limit 
     * @param {number} pageCount 
     */
    async getValue(filter = {}, select = [], limit = false, pageCount = false) {
        let ob = null;

        if(collectionName == "") {
            this.mongoClient.close();
            return false;
        }

        let request = [filter];

        if(select.length > 0) {
            let arSelect = {};
            for (let key of select) {
                arSelect[key] = 1;
            }
            request.push(arSelect);
        }

        
        let options = {sort: {TITLE: 1}};

        if(limit)
            options.limit = limit;

        if(pageCount)
            options.skip = pageCount;

        ob = await this.collection.find(...request, options).toArray();
        return ob;
    }

    static isJson(value) {
        try {
            JSON.parse(value);
        }
        catch(error) {
            return false;
        }

        return true;
    }

    /**
     * 
     * @param {string} collectionName 
     * @param {object} props 
     * @returns 
     */
    async setValue(props = {}) {
        let id = 0;

        if(Object.keys(props).length == 0 || collectionName == "") {
            this.client.close();
            return false;
        }
        
        id = await this.collection.insertOne(props);
        return id;
    }

    async removeValue(key) {
        //this.Init();
        if(confirm('Удалить?')) {
            this.collection.dropOne(key);
        }
            

            //this.mongoClient.close();
    }
}