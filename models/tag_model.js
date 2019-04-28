const BaseModel = require('./base_model');
const TABLE = 'tag';
class TagModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = TagModel