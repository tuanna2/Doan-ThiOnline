const BaseModel = require('./base_model');
const TABLE = 'saved';
class SavedModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = SavedModel