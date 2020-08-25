const TestModel = require('../../models/test_model');
const BaseApiCtrl = require('./base_api_ctrl');
const StoreModel = require('../../models/store_model');
const QuestionModel = require('../../models/question_model');
const HistoryModel = require('../../models/history_model');

class TestController extends BaseApiCtrl{
    constructor() {
        super(TestModel);
        this.testModel = new TestModel();
        this.storeModel = new StoreModel();
        this.questionModel = new QuestionModel();
        this.historyModel = new HistoryModel;
    }
    async createTest(req, res) {
        try{
            if(req.session.admin){
                req.body.id_parent = 1;
                req.body.status = 1;
                if(typeof req.body.store === "undefined"){
                    const level = req.body.level;
                    if(typeof level === "undefined"){
                        res.status(500).send("Error");
                    }
                    const qs_lv1 = level.level_1 <= 0 || level.level_1 == null ? [] : await this.storeModel.getRandom(1, req.body.id_tag, level.level_1);
                    const qs_lv2 = level.level_2 <= 0 || level.level_2 == null ? [] : await this.storeModel.getRandom(2, req.body.id_tag, level.level_2);
                    const qs_lv3 = level.level_3 <= 0 || level.level_3 == null ? [] : await this.storeModel.getRandom(3, req.body.id_tag, level.level_3);
                    req.body.store = ([].concat(qs_lv1).concat(qs_lv2).concat(qs_lv3)).map(e => e.id).toString();
                    delete req.body.level;
                }
                const rs = await this.testModel.add(req.body);
                res.json({ message: 'success', data: rs});
            }
            else {
                req.body.id_parent = req.session.idUser;
                req.body.status = null;
                const rs = await this.testModel.add(req.body);
                res.json({ message: 'success', data: rs});
            }
        } catch(e){
            console.log(e);
            res.status(500).send(e);
        }
    }

    async getListTest(req, res) {
        const category = req.query.category;
        let tests;
        category ? tests = await this.testModel.getTestByCategory([category])
            : tests = await this.testModel.getTestByCategory([1,2,3,4,5,6,7]);
        res.json({ message: 'success', data: {tests}});
    }
    async getDetailTest(req, res) {
        const info = req.userInfo;
        const test = await this.testModel.getTestInfo({'tests.id': req.params.id});
        let history = await this.historyModel.getMany({id_user: info.id, id_test: req.params.id});
        history.forEach(e => {
            e.selected = e.selected.split(",");
        })
        res.json({ message: 'success', data: {test, history}});
    }
    async getTestSaved(req, res) {
        const info = req.userInfo;
        const tests = await this.testModel.getTestInfo({'saved.id_user': info.id});
        res.json({ message: 'success', data: {tests}});   
    }
    async getTestDid(req, res) {
        const info = req.userInfo;
        const tests = await this.testModel.getTestInfo({'history.id_user': info.id});
        res.json({ message: 'success', data: {tests}});   
    }
    async studentPlayTest(req, res){
        const test = await this.testModel.getTestInfo({'tests.id': req.params.id});
        if(!test.length){
            return res.status(500).send({message:'falled', error:"Test not found"});
        }
        const questions = test[0].id_parent == 1 ?
            await this.storeModel.getIn(test[0].store.split(","))
            : await this.questionModel.getMany({id_test:req.params.id});
        if(test[0].status != 1 || !questions.length){
            res.status(500).send({message:'falled', error:e});
        }
        res.json({ message: 'success', data: {test, questions}});   
    }
    async studentSubmitTest(req, res) {
        try{
            const info = req.userInfo;
            const selected = req.body.selected;
            if(typeof selected === "undefined" || typeof req.body.time === "undefined"){
                return res.status(500).send({message:'falled', error: "Invalid input params"});
            }
            const test = await this.testModel.getMany({id: req.params.id});
            if(!test.length){
                return res.status(500).send({message:'falled', error:"Test not found"});
            }
            const questions =  test[0].id_parent == 1 ?
                    await this.storeModel.getIn(test[0].store.split(","))
                    : await this.questionModel.getMany({id_test:req.params.id});
            let correct = 0;
            selected.forEach((e,i) => {
                e == questions[i].correct ? correct++ : correct;
            })
            const data = {
                id_test:req.params.id,
                id_user:info.id,
                point:correct,
                selected:selected.toLocaleString(),
                submit_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                time:req.body.time,
            };
            const rs = await this.historyModel.add(data);
            data.selected = data.selected.split(",");
            res.json({
                message:"success",
                data: {...data, id: rs[0]},
            })
        } catch(e){
            return res.status(500).send({message:'falled', error: e});
        }
    }
    
}
module.exports = TestController;