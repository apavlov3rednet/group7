const express = require('express');
const morgan = require('morgan');
const path = require('path');
//const mogoose = require('mongoose');
const MongoDB = require('./public/js/mongodb');
const { ObjectId } = require('mongodb');
const { readFile } = require('fs');
const { nextTick } = require('process');

const app = express();
const router = express.Router();

const PORT = 8000;

//Init DB driver
const mdb = new MongoDB;
mdb.Init();

const createPath = (page, dir = 'views', ext = 'html') => {
    return path.resolve(__dirname, dir, `${page}.html`)
};

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
// app.set('views', 'views');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(`public`));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // SELECT ID, NAME, PICTURE FROM table.name WHERE ID=1
    // SELECT * FROM table.name WHERE ID=1
    res.setHeader('Access-Control-Allow-Method', 'GET'); //PUSH PULL UPDATE PUT
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    //res.nextTick();
    next();
});

//GET Request
app.get('/', async (req, res) => {
    let menu = await mdb.getValue('menu');
    let list = await mdb.getValue('brands');

    let data = {
        menu: menu,
        table: list
    };

    res.end(JSON.stringify(data));
   //res.end(JSON.stringify(list));
   //res.end();
});

// app.get('/index.html', (req, res) => {
//     res.redirect('/');
// });

app.get('/:section/', async (req, res) => {
    let list = await mdb.getValue(req.params.section);
    res.end(JSON.stringify(list));
});

// app.get('/views/:page.html', (req, res) => {

// });

//POST Request
app.post('/:section/', async (req, res) => {
    const model = require('./models/' + req.params.section);
    let id = await mdb.setValue(req.params.section, req.body);

    if(id.insertedId instanceof ObjectId) {
        res.redirect(req.url + '?success=Y');
    }
    else {
        res.redirect(req.url + '?success=N');
    }
});

//Обработка ошибок должен идти в конце
app.use((req, res) => {
    res
        .status(404)
        .sendFile(createPath(404));
});

app.listen(PORT, (error) => {
    (error) ? console.log(error) : console.log('Server start listen on port '+ PORT );
});