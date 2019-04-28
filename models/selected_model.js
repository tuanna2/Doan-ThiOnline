const BaseModel = require('./base_model');
const TABLE = 'selected';
class SelectedModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = SelectedModel;