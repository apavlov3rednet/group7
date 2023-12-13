class Routing {

    /**
     * 
     * @param {*} url important
     * @param {method = GET*|POST, type = sync*|async, options } params options
     */
    static ajax(url, params = {}) {
        let xhr = new XMLHttpRequest();

        //Метод запроса к серверу
        if(params.method != 'GET')
            xhr.open(params.method, url, params.type === 'async');
        else
            xhr.open('GET', url, params.type === 'async');

        //Ожидаемый от сервера тип данных
        if(params.responseType)
            xhr.responseType = params.responseType; //json, html, php

        //Заголовки запроса
        //xhr.setRequestHeader('Content-Type', 'aaplication/json');

        if(Object.keys(params.data).length > 0) {
            xhr.send(params.data);
        }
        else {
            xhr.send();
        }

        //Прогресс запроса
        xhr.oprogress = function(event) {
            
        }

        //Результат запроса к серверу
        xhr.onload = function() {
            /**
             * 10* - ошибки которые происходят на стороне сервера или железа
             * 200 - всегда успех
             * 300 - перенаправления
             * 400 - ошибки которые возникают на стороне клиента
             * 500 - ошибки сервера
             */
            if(xhr.status != 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // 404: Not found
            }
            else {
                console.log(xhr.response);
                return xhr.response;
            }
        }

        //Ошибка запроса
        xhr.onerror = function(event) {
            console.error('Какая то ошибка');
            console.log(event);
        }
    }
}
