//Подключаем нативный модуль http
const http = require('http');
//Подключаем модуль файловой системы
const fs = require('fs');

const server = http.createServer(function(request, response) {
    if(request.url === 'http://group7/') {
        fs.readFile(`${__dirname}/index.html`, (err, content) => {
            if(!err) {
                //Устанавливаем тип заголовка
                response.setHeader('Content-Type', 'text/html');
                //response.setHeader('Title', 'Some Title');
                //Устанавливаем контент
                response.write(content);
            }
            else {
                response.statusCode = 500;
                response.write('Some error 500');
            }

            response.end();
        });
    }
    else {
        response.write('Привет');
        response.end();
    }
});

server.listen(80, "127.0.0.1", function() {
    console.log('Server start listen')
});