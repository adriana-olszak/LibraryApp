'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
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
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

//Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'library',
    resave: true,
    saveUninitialized: true
}));

require('./src/config/passport')(app);

app.set('views', './src/views');

app.engine('.hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: 'src/views/layouts',
    partialsDir: 'src/views/partials'
}));
app.set('view engine', '.hbs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Library App',
        nav: nav
    });
});

app.listen(port, (err) => {

});