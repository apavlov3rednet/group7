class DB
{
    static #PORT = '80';
    static #LOCATION = 'mongodb://localhost';
    static #LOGIN;
    static #PSSWD;
    static #DBNAME = 'mongo';

    constructor() {}

    Init() {
        let db = MongoDB.init(DB.#LOCATION, DB.#PORT, DB.#LOGIN, DB.#PSSWD);
        let dbName = db.getDataBase(DB.#DBNAME);

        this.db = dbName;
    }

    Close() {
        this.db.close();
    }

    static getValue(key) {
        //this.Init();

        let value  = window.localStorage.getItem(key);

        if(this.isJson(value))
            return JSON.parse(value);

        return value;
    }

    isJson(value) {
        try {
            JSON.parse(value);
        }
        catch(error) {
            return false;
        }

        return true;
    }

    static setValue(key, value) {
        //this.Init();
        if(typeof value === undefined || typeof value === null || value === '')
                this.removeValue(key);
 
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    static removeValue(key) {
        //this.Init();
        if(confirm('Удалить?')) 
            window.localStorage.removeItem(key);
    }
}