const express = require('express');
const app = express();
const session = require('express-session');
const Router = require('./router/router');
const ApiRouter = require('./router/api_router');
const morgan = require('morgan');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000*60*60*24*30 }
}));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(morgan('dev'));

app.use('/api',new ApiRouter().getRouter());

app.use('/',new Router().getRouter());

app.listen(3000, () => console.log(`App listening on port 3000!`));