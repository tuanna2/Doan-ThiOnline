const BaseModel = require('./base_model');
const TABLE = 'questions';
class QuestionModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = QuestionModel