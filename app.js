const express = require('express');
const app = express();
const session = require('express-session');
const Router = require('./routers/router');
const ApiRouter = require('./routers/api_router');
const AdminRouter = require('./routers/admin_router')
const morgan = require('morgan');
const FileStore = require('session-file-store')(session);
const fileUpload = require('express-fileupload');

app.use(fileUpload());

app.use(session({
    store: new FileStore,
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge:1000*60*60*24*30 }
}));

app.use(express.static('public'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/api',new ApiRouter().getRouter());
app.use('/',new Router().getRouter());

app.use('/admin',new AdminRouter().getRouter());


app.listen(3000, () => console.log(`App listening on port 3000!`));