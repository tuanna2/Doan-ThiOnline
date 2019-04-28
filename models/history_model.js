const BaseModel = require('./base_model');
const TABLE = 'history';
class HistoryModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = HistoryModel;