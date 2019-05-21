const UserModel = require('../models/user_model');
const TestModel = require('../models/test_model');
const SavedModel = require('../models/saved_model');
const HistoryModel = require('../models/history_model');
const QuestionModel = require('../models/question_model');

class PlayTestController{
    constructor(){
        this.testModel = new TestModel();
        this.userModel = new UserModel();
        this.savedModel = new SavedModel();
        this.historyModel = new HistoryModel();
        this.questionModel = new QuestionModel();
    }
    async suggestion(req,res){
        res.redirect('/');
    }
    async saved(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        const tests = await this.testModel.getTestInfo({'saved.id_user':req.session.idUser});
        res.render('play_test/saved',{info,tests});
    }
    async test(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        const test = await this.testModel.getTestInfo({'tests.id':req.params.id});
        if(test[0].permission != 1){
            return res.redirect('/');
        }
        const history = await this.historyModel.getMany({id_user:req.session.idUser,id_test:req.params.id});
        const lastHistory = typeof history !== "undefined" ? history[history.length-1] : null;
        res.render('play_test/test',{info,test,history:lastHistory});
    }
    async playTest(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        const test = await this.testModel.getTestInfo({'tests.id':req.params.id});
        if(test[0].permission != 1){
            return res.redirect('/');
        }
        const questions = await this.questionModel.getMany({id_test:req.params.id});
        res.render('play_test/playing',{info,test,questions});
    }
    async submitTest(req,res){
        try{
            const info = await this.userModel.get({id:req.session.idUser});
            const questions = await this.questionModel.getMany({id_test:req.params.id});
            const selected = req.body.selected;
            if(typeof selected === "undefined" || typeof info ==="undefined"){
                res.status(403).send({message:"falled"});
            }
            let correct = 0;
            selected.forEach((e,i) => {
                e == questions[i].correct ? correct++ : correct;
            })

            const rs = await this.historyModel.add(
                {
                    id_test:req.params.id,
                    id_user:info.id,
                    point:correct,
                    selected:selected.toLocaleString(),
                    submit_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                })
            res.json({
                message:"success",
                data:rs
            })
        } catch(e){
            res.status(500).send(e);
        }
    }
    async history(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        const test = await this.testModel.getTestInfo({'tests.id':req.params.id});
        const questions = await this.questionModel.getMany({id_test:req.params.id});
        const history = await this.historyModel.getMany({id_user:req.session.idUser,id_test:req.params.id});
        const lastHistory = typeof history !== "undefined" ? history[history.length-1] : null;
        if(test[0].permission != 1 || lastHistory == null){
            return res.redirect('/');
        }
        res.render('play_test/history',{info,test,questions,history:lastHistory});
    }
    async allHistory(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        const tests = await this.testModel.getTestInfo({'history.id_user':req.session.idUser});
        res.render('play_test/all_history',{info,tests});
    }
}

module.exports = PlayTestController;