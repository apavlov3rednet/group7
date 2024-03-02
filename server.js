import express from 'express';
import morgan from 'morgan';
//import path from 'path';
//const mogoose = require('mongoose');
import FetchServer from './back/modules/fetchServer/index.js';

const app = express();
//const router = express.Router();

const PORT = 8000;

//Init DB driver
// const mdb = new MongoDB;
// mdb.Init();

// const createPath = (page, dir = 'views', ext = 'html') => {
//     return path.resolve(__dirname, dir, `${page}.html`)
// };

//мидлваре - промежуточная функциональность, 
//в самом начале запроса после сервера, до создания роута

//Логируйщий
// app.use((req, res, next) => {
//     console.log(`path: ${req.path}`);
//     console.log(`method: ${req.method}`);
//     next(); //возвращаем контроль серверу
// });

app.use(morgan(':method :url :status :res[content-lenght] - :response-time ms'));

// Методы для работы от сервера с публичной частью
//app.set('back', 'back');
//app.use(urlencoded({ extended: true }));
//app.use(static(`back`));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, DELETE, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//GET Request
// app.get('/', async (req, res, next) => {
//     // let menu = await mdb.getValue('menu');
//     // let list = await mdb.getValue('brands');

//     // let data = {
//     //     menu: menu,
//     //     table: list
//     // };

//     // res.end(JSON.stringify(data));
//    //res.end(JSON.stringify(list));
//    //res.end();
//    next();
// });

app.get('/api/:CollectionName/', async (req, res) => {
    let collectionName = req.params.CollectionName.toLowerCase();

    let result = {};
    let mdb = new FetchServer.MDB(collectionName);

    let filter = {},
        select = [],
        limit = req.query.limit ? req.query.limit : false,
        skip = req.query.skip ? req.query.skip : false;

    result = await mdb.getValue(filter, select, limit, skip);

    res.end(JSON.stringify(result));
});

//POST REquest
app.post('/api/:CollectionName/', async (req, res) => {
    const collectionName = req.params.CollectionName.toLowerCase();
    const mdb = new FetchServer.MDB;
    const Controll = new FetchServer.Controll(collectionName);
    
    mdb.Init(collectionName);
    const result = await mdb.setValue(Controll.preparePost(req.query));
    res.end();
});

//DELETE request
app.get('/api/:CollectionName/:id/', async (req, res) => {
    let collectionName = req.params.CollectionName.toLowerCase();
    let mdb = new FetchServer.MDB(collectionName);
    mdb.removeValue(req.params.id);
    res.end('deleted');
});

//POST Request
// app.post('/:section/', async (req, res) => {
//     const model = require('./models/' + req.params.section);
//     let id = await mdb.setValue(req.params.section, req.body);

//     if(id.insertedId instanceof ObjectId) {
//         res.redirect(req.url + '?success=Y');
//     }
//     else {
//         res.redirect(req.url + '?success=N');
//     }
// });

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