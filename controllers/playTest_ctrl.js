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
        res.render('play_test/test',{info,test,history});
    }
    async playTest(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        const test = await this.testModel.getTestInfo({'tests.id':req.params.id});
        let questions = await this.questionModel.getMany({id_test:req.params.id});
        if(test[0].permission != 1 || !questions.length){
            return res.redirect('/');
        }
        let rules = [];
        for(let i = questions.length -1;i >= 0;i--){
            let random = Math.floor(Math.random() * (i+1));
            rules.push(random);
            [questions[i],questions[random]] =  [questions[random],questions[i]]
        } 
        res.render('play_test/playing',{info,test,questions,rules});
    }
    async submitTest(req,res){
        try{
            const info = await this.userModel.get({id:req.session.idUser});
            const questions = await this.questionModel.getMany({id_test:req.params.id});
            let selected = req.body.selected;
            const rules = req.body.rules.split(',');
            if(typeof selected === "undefined" || typeof info ==="undefined" || rules.length != questions.length){
                return res.status(403).send({message:"falled"});
            }
            for(let i = 0;i < selected.length;i++){
                let rule = rules[selected.length - i -1];
                [selected[i],selected[rule]] =  [selected[rule],selected[i]];
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
                    submit_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    time:req.body.time,
                    rules:req.body.rules
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
        let questions = await this.questionModel.getMany({id_test:req.params.id});
        const history = await this.historyModel.get({id:req.params.histories});
        let selected = history.selected.split(',');
        const rules = history.rules.split(',');
        if(test[0].permission != 1  || rules.length != questions.length || typeof history === "undefined" || !questions.length || history.id_user != req.session.idUser){
            return res.redirect('/');
        }
        for(let i = questions.length -1;i >= 0;i--){
            let rule = parseInt(rules[questions.length -i -1]);
            [questions[i],questions[rule]] =  [questions[rule],questions[i]];
            [selected[i],selected[rule]] =  [selected[rule],selected[i]];
        }
        res.render('play_test/history',{info,test,questions,history,selected});
    }
    async allHistory(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        const tests = await this.testModel.getTestInfo({'history.id_user':req.session.idUser});
        res.render('play_test/all_history',{info,tests});
    }
}

module.exports = PlayTestController;