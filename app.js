const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const PORT = 3000;

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

app.get('/', (req, res) => {
    const title = 'Home';
    res.sendFile(createPath('index'), {title});
});

app.get('/index.html', (req, res) => {
    res.redirect('/');
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