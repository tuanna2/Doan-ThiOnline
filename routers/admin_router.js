const BaseRouter = require('./base_router');
const AdminController = require('../controllers/admin_ctrl');

class AdminRouter extends BaseRouter{
    constructor(){
        super();
    }
    config(){
        const adminCtrl = new AdminController();
        // this.router.get('/',homeCtrl.index.bind(homeCtrl));
    }

}

module.exports = AdminRouter;