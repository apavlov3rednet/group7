import { MongoClient, ObjectId } from 'mongodb';
import Schema from '../schema/index.js';
import Controll from './Controll.js';

export default class MDB
{
    static #PORT = '27017';
    static #LOCATION = 'mongodb://localhost';
    static #LOGIN;
    static #PSSWD;
    static #DBNAME = 'group7';

    constructor(collectionName = '') {
        console.log('start DB connect');
        const url = [MDB.#LOCATION, MDB.#PORT].join(':') + '/';
        this.client = new MongoClient(url);
        this.client.connect();
        this.schema = Schema[collectionName];
        this.db = this.client.db(MDB.#DBNAME);
        this.collection = this.db.collection(collectionName);
        this.schema = Schema[collectionName];
        this.controll = new Controll(collectionName);
        console.log('DB connect success');
    }

    changeCollection(collectionName) {
        this.collection = this.db.collection(collectionName);
    }

    async getCountElements(collectionName) {
        try {
            const db = this.client.db(MDB.#DBNAME);
            const count = await this.collection.countDocuments();
            return count;
        }
        catch(e) {
            console.log(e);
        }
       
    }

    getCollection(collectionName) {
        try {
            const db = this.client.db(MDB.#DBNAME);
            return this.collection(collectionName);
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
        let result = this.collection;
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
    async getValue(filter = {}, select = [], limit = false, pageCount = false, sort = {}) {
        let query = [];
        let options = {};
        let arResult = [];

        let request = [filter];

        if(select.length > 0) {
            let arSelect = {};
            for (let key of select) {
                arSelect[key] = 1;
            }
            query.push(arSelect);
        }

        options.sort = {SORT: 1};

        if(Object.keys(sort).length > 0)
            options.sort = sort;

        if(limit)
            options.limit = limit;

        if(pageCount)
            options.skip = pageCount;

        let unPreparedData = await this.collection.find(filter, query, {...options}).toArray();
        let data = Controll.prepareData(unPreparedData, this.schema);
        let simId = {};
        let sim = {};

        data.forEach(item => {
            for(let i in item) {
                let keyElement = item[i];

                if(keyElement.ref) {
                    if(!simId[keyElement.collectionName])
                        simId[keyElement.collectionName] = [];

                    simId[keyElement.collectionName].push(new ObjectId(keyElement._id));
                }
            }
        });

        if(Object.keys(simId).length > 0) {
            for(let collection in simId) {
                let mdb = new MDB(collection);
                let ids = simId[collection];
                sim[collection] = [];

                sim[collection] = await mdb.collection.find({
                    _id: {
                        $in: ids
                    }
                }).toArray();
            }
        }

        let result = await {
            schema: this.schema,
            data: data,
            sim : sim
        }

        return result;
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
        let controllData = this.controll.preparePost(props);
        
        if(controllData._id) { // UPDATE
            let result = await this.collection.updateOne(
                { _id: controllData._id },
                { $set: controllData }
            );
            id = result;
        }
        else { // ADD
            id = await this.collection.insertOne(controllData);
        }

        return id;
    }

    async removeValue(_id) {
        await this.collection.deleteOne({_id : new ObjectId(_id)})
    }
}