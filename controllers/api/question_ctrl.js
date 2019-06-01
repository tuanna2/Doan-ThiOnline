const QuestionModel = require('../../models/question_model');
const BaseApiCtrl = require('./base_api_ctrl');

class QuestionController extends BaseApiCtrl{
    constructor() {
        super(QuestionModel);
        this.questionModel = new QuestionModel();
    }
    async getQuestionsByTest(req,res){
        const rs = req.query.test !== undefined ?
            await this.questionModel.getMany({id_test:req.query.test})
            : await this.questionModel.getAll();
        (typeof rs !== "undefined") ?
            res.json({ message: 'success', data: [].concat(rs)}) :
            res.json({ message: 'success', data: []});
    }
}
module.exports = QuestionController;