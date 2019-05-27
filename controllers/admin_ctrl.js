const UserModel = require('../models/user_model');

class AdminController{
    constructor(){
        this.userModel = new UserModel();
    }
    async index(){
        const users = await this.userModel.getAll();
    }
    
}
module.exports = AdminController;