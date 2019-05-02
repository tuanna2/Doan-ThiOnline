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
        res.render('create-test',{user:req.session.idUser});
    }

    async questionManager(req,res){
        const rs = await this.testModel.get({id:req.params.id,id_parent:req.session.idUser})
        if(typeof rs !== "undefined") {
            const ques = await this.questionModel.get({id_test:req.params.id});
            res.render('add_question',{data:ques});
        } 
        else res.redirect('/');
    }

    isLoggedIn(req,res,next){
        req.session.idUser ? next() 
        : res.redirect('/login'); 
    }
    
}
module.exports = HomeController;