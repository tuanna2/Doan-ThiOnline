const TestModel = require('../../models/test_model');
const BaseApiCtrl = require('./base_api_ctrl');

class TestController extends BaseApiCtrl{
    constructor() {
        super(TestModel);
    }
}
module.exports = TestController;