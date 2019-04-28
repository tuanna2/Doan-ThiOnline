const BaseModel = require('./base_model');
const TABLE = 'tests';
class TestModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = TestModel