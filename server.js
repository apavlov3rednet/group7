import express from 'express';
import morgan from 'morgan';
import FetchServer from './back/modules/fetchServer/index.js';
import schema from './back/modules/fetchServer/schema/index.js';
import { ObjectId } from 'mongodb';
import config from './back/params/config.js';

const app = express();
//const router = express.Router();

const PORT = 8000;

app.use(morgan(':method :url :status :res[content-lenght] - :response-time ms'));

// Методы для работы от сервера с публичной частью
//app.set('back', 'back');
app.use(express.urlencoded({ extended: true }));
//app.use(static(`back`));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, DELETE, OPTIONS, HEAD, PUT'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/api/:CollectionName/', async (req, res) => {
    let collectionName = req.params.CollectionName.toLowerCase();

    let result = {};
    let mdb = new FetchServer.MDB(collectionName);

    let filter = {},
        select = [],
        limit = req.query.limit ? req.query.limit : false,
        skip = req.query.skip ? req.query.skip : false;

    if(req.query && req.query.id) {
        filter._id = new ObjectId(req.query.id);
    }

    result = await mdb.getValue(filter, select, limit, skip);

    res.end(JSON.stringify(result));
});

app.get('/api/collection/get/list/', async(req, res) => {
    //console.log(req.params.operation);
    let mdb = new FetchServer.MDB();
    mdb.getCollections();

    res.end();
});

app.get('/api/schema/get/:Name/', async (req, res) => {
    let obSchema = await schema[req.params.Name.toLowerCase()];
    res.end(JSON.stringify(obSchema));
});

//POST REquest
app.post('/api/:CollectionName/', async (req, res) => {
    const collectionName = req.params.CollectionName.toLowerCase();
    let mdb = new FetchServer.MDB(collectionName);

    const result = await mdb.setValue(req.body);

    if(result.acknowledged) {
        let newUrl = config.client + collectionName + '?id=' + String(result.insertedId);
        res.statusCode = 304;
        res.redirect(newUrl);
    }
});

//DELETE request
app.get('/api/:CollectionName/:id/', async (req, res) => {
    let collectionName = req.params.CollectionName.toLowerCase();
    let mdb = new FetchServer.MDB(collectionName);
    mdb.removeValue(req.params.id);
    res.end('deleted');
});

//Обработка ошибок должен идти в конце
app.use((req, res) => {
    console.log('404')
    res
        .status(404).end();
        //.sendFile(createPath(404));
});

app.listen(PORT, (error) => {
    (error) ? console.log(error) : console.log('Server start listen on port '+ PORT );
});