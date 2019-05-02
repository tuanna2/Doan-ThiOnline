const express = require('express');
const bodyParser =require('body-parser');
const HomeController = require('../controllers/home_ctrl');
const UserController = require('../controllers/user_ctrl');

class Router{
    constructor(){
        this.router = express.Router();
        this.router.use(bodyParser.urlencoded({ extended: false }));
        this.router.use(bodyParser.json());
        this.config();
    }
    getRouter() {
        return this.router;
    }
    config(){
        const homeCtrl = new HomeController();
        this.router.get('/',homeCtrl.index.bind(homeCtrl));
        this.router.get('/create-test',homeCtrl.isLoggedIn,homeCtrl.createTest);
        this.router.get('/test/:id/questions',homeCtrl.isLoggedIn,homeCtrl.questionManager.bind(homeCtrl));
        

        const userCtrl = new UserController();
        this.router.get('/login',userCtrl.loginGet);
        this.router.get('/register',userCtrl.signupGet);        
        this.router.post('/login',userCtrl.loginPost.bind(userCtrl));
        this.router.post('/register',userCtrl.signupPost.bind(userCtrl));        
        this.router.get('/logout',userCtrl.logout);
    }
}

module.exports = Router;