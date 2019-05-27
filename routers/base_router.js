const express = require('express');
const bodyParser =require('body-parser');

class BaseRouter{
    constructor(){
        this.router = express.Router();
        this.router.use(bodyParser.urlencoded({ extended: false }));
        this.router.use(bodyParser.json());
        this.config();
    }
    getRouter() {
        return this.router;
    }
    config(){}
}

module.exports = BaseRouter;