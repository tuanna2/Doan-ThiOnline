const QuestionModel = require('../../models/question_model');
const BaseApiCtrl = require('./base_api_ctrl');

class QuestionController extends BaseApiCtrl{
    constructor() {
        super(QuestionModel);
    }
}
module.exports = QuestionController;