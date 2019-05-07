const UserModel = require('../models/user_model');
const TestModel = require('../models/test_model');
const QuestionModel = require('../models/question_model');

class HomeController {
    constructor() {
        this.userModel = new UserModel();
        this.testModel = new TestModel();
        this.questionModel = new QuestionModel();
    }

    async index(req, res) {
        if(req.session.idUser){
            const info = await this.userModel.get({id:req.session.idUser});
            typeof info !== "undefined" ? res.render('home_logged',{info:info})
            : res.redirect('/logout');
        }
        else{
            res.render('home');
        }
    }
    createTest(req,res){
        res.render('create_test',{user:req.session.idUser});
    }

    async addQuestion(req,res){
        const rs = await this.testModel.get({id:req.params.id,id_parent:req.session.idUser});
        if(typeof rs !== "undefined") {
            const questions = await this.questionModel.getMany({id_test:req.params.id});
            res.render('all_question',{data:questions,permission:rs.permission,test:req.params.id});
        } 
        else res.redirect('/');
    }
    async infoQuestion(req,res){
        const rs = await this.testModel.get({id:req.params.id,id_parent:req.session.idUser});
        if(typeof rs !== "undefined"){
            const questions = await this.questionModel.getMany({id_test:req.params.id});
            res.render('info_question',{data:rs,user:req.session.idUser,count:questions.length})
        }
        else res.redirect('/');
    }
    async editQuestion(req,res){
        const rs = await this.testModel.get({id:req.params.id,id_parent:req.session.idUser});
        if(typeof rs !== "undefined") {
            const question = await this.questionModel.get({id:req.params.question});
            res.render('edit_question',{data:question});
        } 
        else res.redirect('/');
    }

    isLoggedIn(req,res,next){
        req.session.idUser ? next() 
        : res.redirect('/login'); 
    }
    
}
module.exports = HomeController;