const express = require('express');
const bodyParser =require('body-parser');
const HomeController = require('../controllers/home_ctrl');
const UserController = require('../controllers/user_ctrl');
const CreateTestController = require('../controllers/createTest_ctrl');

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

        const createTestCtrl = new CreateTestController();
        this.router.get('/create-test',homeCtrl.isLoggedIn,createTestCtrl.createTest);
        this.router.get('/test/:id/questions',homeCtrl.isLoggedIn,createTestCtrl.addQuestion.bind(createTestCtrl));
        this.router.get('/test/:id/info/',homeCtrl.isLoggedIn,createTestCtrl.infoQuestion.bind(createTestCtrl));
        this.router.get('/test/:id/questions/:question',homeCtrl.isLoggedIn,createTestCtrl.editQuestion.bind(createTestCtrl));
        this.router.get('/created',homeCtrl.isLoggedIn,createTestCtrl.created.bind(createTestCtrl));
        this.router.get('/creating',homeCtrl.isLoggedIn,createTestCtrl.creating.bind(createTestCtrl));


        const userCtrl = new UserController();
        this.router.get('/login',userCtrl.loginGet);
        this.router.get('/register',userCtrl.signupGet);        
        this.router.post('/login',userCtrl.loginPost.bind(userCtrl));
        this.router.post('/register',userCtrl.signupPost.bind(userCtrl));        
        this.router.get('/logout',userCtrl.logout);
        this.router.get('/profile',homeCtrl.isLoggedIn,userCtrl.profile.bind(userCtrl));
        this.router.get('/profile/follow',homeCtrl.isLoggedIn,userCtrl.following.bind(userCtrl));
        this.router.get('/profile/setting',homeCtrl.isLoggedIn,userCtrl.settingInfo.bind(userCtrl));
        this.router.get('/profile/setting/password',homeCtrl.isLoggedIn,userCtrl.changePass.bind(userCtrl));
        this.router.post('/profile/setting/password',homeCtrl.isLoggedIn,userCtrl.apiChangePass.bind(userCtrl));
        this.router.get('/profile/:id',homeCtrl.isLoggedIn,userCtrl.profileFriend.bind(userCtrl));

    }
}

module.exports = Router;