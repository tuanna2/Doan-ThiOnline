const BaseRouter = require('./base_router');
const AdminController = require('../controllers/admin_ctrl');

class AdminRouter extends BaseRouter{
    constructor(){
        super();
    }
    config(){
        const adminCtrl = new AdminController();
        this.router.get('/login',adminCtrl.loginView);
        this.router.post('/login',adminCtrl.login.bind(adminCtrl));
        this.router.get('/',adminCtrl.isLoggedIn,adminCtrl.index.bind(adminCtrl));
        this.router.get('/tested',adminCtrl.isLoggedIn,adminCtrl.tested.bind(adminCtrl));
        this.router.get('/testing',adminCtrl.isLoggedIn,adminCtrl.testing.bind(adminCtrl));
    }

}

module.exports = AdminRouter;