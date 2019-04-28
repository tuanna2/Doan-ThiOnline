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
        // const optionCtrl = new OptionController();
        // this.router.get('/option',optionCtrl.getAllOption.bind(optionCtrl));
        // this.router.get('/option/:id',optionCtrl.getOption.bind(optionCtrl))
        // this.router.post('/option',optionCtrl.addOption.bind(optionCtrl));
        // this.router.put('/option',optionCtrl.updateOption.bind(optionCtrl));
        // this.router.delete('/option/:id',optionCtrl.deleteOption.bind(optionCtrl));
        const homeCtrl = new HomeController();
        this.router.get('/',homeCtrl.index);
        

        const userCtrl = new UserController();
        this.router.get('/login',userCtrl.loginGet);
        this.router.get('/register',userCtrl.signupGet);        
        this.router.post('/login',userCtrl.loginPost.bind(userCtrl));
        this.router.post('/register',userCtrl.signupPost.bind(userCtrl));        
        this.router.get('/logout',userCtrl.logout);
    }
}

module.exports = Router;