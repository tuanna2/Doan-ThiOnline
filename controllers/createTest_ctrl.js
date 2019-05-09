const TestModel = require('../models/test_model');
const QuestionModel = require('../models/question_model');

class CreateTestController {
    constructor() {
        this.testModel = new TestModel();
        this.questionModel = new QuestionModel();
    }
    createTest(req,res){
        res.render('create_test/create_test',{user:req.session.idUser});
    }

    async addQuestion(req,res){
        const rs = await this.testModel.get({id:req.params.id,id_parent:req.session.idUser});
        if(typeof rs !== "undefined") {
            const questions = await this.questionModel.getMany({id_test:req.params.id});
            res.render('create_test/all_question',{data:questions,permission:rs.permission,test:req.params.id});
        } 
        else res.redirect('/');
    }
    async infoQuestion(req,res){
        const rs = await this.testModel.get({id:req.params.id,id_parent:req.session.idUser});
        if(typeof rs !== "undefined"){
            const questions = await this.questionModel.getMany({id_test:req.params.id});
            res.render('create_test/info_question',{data:rs,user:req.session.idUser,count:questions.length})
        }
        else res.redirect('/');
    }
    async editQuestion(req,res){
        const rs = await this.testModel.get({id:req.params.id,id_parent:req.session.idUser});
        if(typeof rs !== "undefined") {
            const question = await this.questionModel.get({id:req.params.question});
            res.render('create_test/edit_question',{data:question});
        } 
        else res.redirect('/');
    }
    async created(req,res){
        const rs = await this.testModel.getMany({id_parent:req.session.idUser,permission:1});
        console.log(rs)
        res.render('create-test/created.ejs',{data:rs});
    }
    async creating(req,res){
        const rs = await this.testModel.getTestByCategory([1,2,3])
        // const rs = await this.testModel.getTestCreating({id_parent:req.session.idUser,permission:0},{id_parent:req.session.idUser,permission:null});
        console.log(rs);
        // res.render('create-test/created.ejs',{data:rs});
    }
}
module.exports = CreateTestController;