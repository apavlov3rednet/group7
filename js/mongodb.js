class DB
{
    static #PORT = '27017';
    static #LOCATION = 'mongodb://localhost';
    static #LOGIN;
    static #PSSWD;
    static #DBNAME = 'group7';

    constructor() {}

    static Init() {
        const MongoClient = require(DB.#DBNAME).MongoClient;
        const url = [DB.#LOCATION, DB.#PORT].join(':'); // mongodb://localhost:27017

        this.mongoClient = new MongoClient(url);
        this.client = this.mongoClient.connect(); // LOGIN & PSSWD
        this.db = client.db(DB.#DBNAME);
    }

    static getCount(key) {
        let values = DB.getValue(key);
        if(values instanceof Array)
            return values.length;

        return 0;
    }


    /**
     * 
     * @param {*} collectionName 
     * @param {*} filter 
     * @param {*} select 
     * @param {*} limit 
     * @param {*} pageCount 
     */
    static getValue(collectionName, filter = {}, select = [], limit = false, pageCount = false) {
        let ob = null;
        this.Init();

        if(collectionName == "") {
            this.mongoClient.close();
            return false;
        }

        let collection = db.collection(collectionName);
        let request = [filter];

        if(select.length > 0) {
            let arSelect = {};
            for (let key of select) {
                arSelect[key] = 1;
            }
            request.push(arSelect);
        }

        ob = collection.find(...request).limit(limit);

        this.mongoClient.close();
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
     * @param {*} collectionName 
     * @param {*} props 
     * @returns 
     */
    static setValue(collectionName, props = {}) {
        let id = 0;
        this.Init();

        if(Object.keys(props).length == 0 || collectionName == "") {
            this.mongoClient.close();
            return false;
        }
        
        id = this.db[collectionName].insertOne(props);
        this.mongoClient.close();
        return id;
    }

    static removeValue(key) {
        //this.Init();
        if(confirm('Удалить?')) 
            window.localStorage.removeItem(key);

            //this.mongoClient.close();
    }
}