const BaseModel = require('./base_model');
const TABLE = 'followed';
class FollowedModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = FollowedModel;