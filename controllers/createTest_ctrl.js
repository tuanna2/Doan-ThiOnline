const TestModel = require('../models/test_model');
const QuestionModel = require('../models/question_model');
const UserModel = require('../models/user_model');

class CreateTestController {
    constructor() {
        this.testModel = new TestModel();
        this.questionModel = new QuestionModel();
        this.userModel = new UserModel();
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
        const info = await this.userModel.get({id:req.session.idUser});
        const tests = await this.testModel.getTestInfo({id_parent:req.session.idUser,permission:1});
        console.log(tests)
        res.render('create_test/created.ejs',{info,tests});
    }
    async creating(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        const TestNull = await this.testModel.getTestInfo({id_parent:req.session.idUser,permission:null})
        const Testing =  await this.testModel.getTestInfo({id_parent:req.session.idUser,permission:0})
        const tests = [].concat(TestNull).concat(Testing);
        res.render('create_test/creating.ejs',{info,tests});
    }
}
module.exports = CreateTestController;