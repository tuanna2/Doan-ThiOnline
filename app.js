const express = require('express');
const app = express();
const Router = require('./router/router');
const session = require('express-session');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000*60*60*24*30 } // session song 1 thang
}));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/',new Router().getRouter());

app.listen(3000, () => console.log(`App listening on port 3000!`));