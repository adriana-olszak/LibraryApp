'use strict';
const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', './src/views');

const handlebars = express('express-handlebars');
app.engine('.hbs', handlebars({extname: '.hbs'}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {

});

app.get('/books', (req, res) => {
    res.send('Hello books');
});

app.listen(port, (err) => {

});