'use strict';
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

const port = process.env.PORT || 5000;
const nav = [{
    link: '/books',
    text: 'Books'
}, {
    link: '/authors',
    text: 'Authors'
}];
const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');

app.engine('.hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: 'src/views/layouts',
    partialsDir: 'src/views/partials'
}));
app.set('view engine', '.hbs');

app.use('/books', bookRouter);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Library App',
        nav: nav
    });
});

app.listen(port, (err) => {

});