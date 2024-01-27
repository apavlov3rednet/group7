//Подключаем нативный модуль http
const http = require('http');
//Подключаем модуль файловой системы
const fs = require('fs');
//Подключаем модуль маршрутизации
const path = require('path');

const PORT = 8080;

const server = http.createServer(async function(req, res) { //request, response
    console.log('Server request');
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html');
    res.write('<head><meta charset="UTF-8" /></head>');

    // res.write('<h1>Test</H1>');
    // res.write('<p>Some text</p>');

    //JSON API
    // res.setHeader('Content-Type', 'application/json');

    // const data = JSON.stringify([
    //     {name: "Ivan", age: 46},
    //     {name: "Artur", age: 15}
    // ]);

    // res.write(data);
    //end 

    //механизм реализации
    // if(req.url == '/') {
    //     fs.readFile('index.html', (err, data) => {
    //         if(err) {
    //             console.log(err);
    //             res.end();
    //         }
    //         else {
    //             res.write(data);
    //             res.end();
    //         }
    //     });
    // }
    // else {
    //     res.end();
    // }

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.tmpl`);

    let basePath = '';

    switch(req.url) {
        case '/':
            basePath = 'index.html';
            res.statusCode = 200;
        break;

        case '/index.html': 
            res.statusCode = 301; //Контролируемый редирект
            res.setHeader('Location', '/');
        break;

        case '/brands':
            basePath = createPath('brands');
            res.statusCode = 200;
        break;

        case '/cards':
            basePath = createPath('cards');
            res.statusCode = 200;
        break;

        case '/models':
            basePath = createPath('models');
            res.statusCode = 200;
        break;

        case '/owners':
            basePath = createPath('owners');
            res.statusCode = 200;
        break;

        case '/services':
            basePath = createPath('services');
            res.statusCode = 200;
        break;

        case '/404':
            basePath = createPath('404');
            res.statusCode = 404;
        break;

        default:
            basePath = createPath('404');
            res.statusCode = 404;
        break;
    }

    fs.readFile(basePath, (err, data) => {
        if(err) {
            console.log(err);
            res.statusCode = 500;
            res.end();
        }
        else {
            res.write(data);
            res.end();
        }
    });
    
});

server.listen(PORT, "localhost", function(err) {
    err ? console.log(err) : console.log('Server start listen');
});