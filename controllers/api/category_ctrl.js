const CategoryModel = require('../../models/category_model');
const BaseApiCtrl = require('./base_api_ctrl');

class CategoryController extends BaseApiCtrl{
    constructor() {
        super(CategoryModel);
    }
}
module.exports = CategoryController;