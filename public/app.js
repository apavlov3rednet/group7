const { create } = require('domain');
const express = require('express');
const path = require('path');

const app = express();

const PORT = 8082;

const createPath = (page, dir, ext, req) => {
    console.log(req)
    return path.resolve(__dirname, dir, `${page}.${ext}`)
};

app.listen(PORT, (error) => {
    (error) ? console.log(error) : console.log('Server start listen');
});

app.get('/', (req, res) => {
    res.sendFile(createPath('index', 'views', 'html', req));
});