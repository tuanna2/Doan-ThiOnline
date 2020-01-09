const UserModel = require('../models/user_model');
const TestModel = require('../models/test_model');
const SavedModel = require('../models/saved_model');
const HistoryModel = require('../models/history_model');
const QuestionModel = require('../models/question_model');
const StoreModel = require('../models/store_model');
class PlayTestController{
    constructor(){
        this.testModel = new TestModel();
        this.userModel = new UserModel();
        this.savedModel = new SavedModel();
        this.historyModel = new HistoryModel();
        this.questionModel = new QuestionModel();
        this.storeModel = new StoreModel();
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
        const test = await this.testModel.getTestInfo({'tests.id':req.params.id});
        if(test[0].status != 1){
            return res.redirect('/');
        }
        if(!req.session.idUser){
            return res.render('play_test/test',{info:null,test,history:[]});
        }
        const info = await this.userModel.get({id:req.session.idUser});
        const history = await this.historyModel.getMany({id_user:req.session.idUser,id_test:req.params.id});
        res.render('play_test/test',{info,test,history});
    }
    async playTest(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        const test = await this.testModel.getTestInfo({'tests.id':req.params.id});
        const questions = test[0].id_parent == 1 ?
            await this.storeModel.getIn(test[0].store.split(","))
            : await this.questionModel.getMany({id_test:req.params.id});
        if(test[0].status != 1 || !questions.length){
            return res.render('error');
        }
        res.render('play_test/playing',{info,test,questions});
    }
    async submitTest(req,res){
        try{
            const info = await this.userModel.get({id:req.session.idUser});
            const test = await this.testModel.getMany({id: req.params.id});
            const questions =  test[0].id_parent == 1 ?
                    await this.storeModel.getIn(test[0].store.split(","))
                    : await this.questionModel.getMany({id_test:req.params.id});
            const selected = req.body.selected;
            if(typeof selected === "undefined" || typeof info ==="undefined"){
                return res.status(403).send({message:"falled"});
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
                })
            res.json({
                message:"success",
                data:rs
            })
        } catch(e){
            console.log(e)
            res.status(500).send(e);
        }
    }
    async history(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        const test = await this.testModel.getTestInfo({'tests.id': req.params.id});
        const questions = test[0].id_parent == 1 ?
            await this.storeModel.getIn(test[0].store.split(","))
            : await this.questionModel.getMany({id_test:req.params.id});
        const history = await this.historyModel.get({id:req.params.histories});
        const selected = history.selected.split(',');
        if(test[0].status != 1  || typeof history === "undefined" || !questions.length || history.id_user != req.session.idUser){
            return res.render('error');
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