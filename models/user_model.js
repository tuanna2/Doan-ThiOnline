const BaseModel = require('./base_model');
const TABLE = 'users';
class UserModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = UserModel