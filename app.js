const express = require('express');
const morgan = require('morgan');
const path = require('path');
//const mogoose = require('mongoose');
const MongoDB = require('./public/js/mongodb');
const { ObjectId } = require('mongodb');
const { readFile } = require('fs');

const app = express();

const PORT = 3000;

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

app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));

//GET Request
app.get('/', (req, res) => {
    const title = 'Home';
    
    res.sendFile(createPath('index'), {title});
    //res.sendFile(App.render(readFile(index)));
});

app.get('/index.html', (req, res) => {
    res.redirect('/');
});

app.get('/:section/', async (req, res) => {
    const title = req.params.section;
    let list = await mdb.getValue(req.params.section,);
    //console.log(list);
    res.sendFile(createPath(req.params.section), {title});
});

app.get('/views/:page.html', (req, res) => {
    res.sendFile(createPath(req.params.page));
});

//POST Request
app.post('/:section/', async (req, res) => {
    //console.log(req.body);

    const model = require('./models/' + req.params.section);

    //let data = controllModel(req.body, model);

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
    (error) ? console.log(error) : console.log('Server start listen');
});