const BaseModel = require('./base_model');
const TABLE = 'category';
class CategoryModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = CategoryModel