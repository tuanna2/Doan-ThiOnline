const UserModel = require('../../models/user_model');
const BaseApiCtrl = require('./base_api_ctrl');

class UserController extends BaseApiCtrl{
    constructor() {
        super(UserModel);
    }
}
module.exports = UserController;