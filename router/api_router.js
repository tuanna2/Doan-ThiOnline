const express = require('express');
const bodyParser =require('body-parser');
const CategoryController = require('../controllers/api/category_ctrl');
const TagController = require('../controllers/api/tag_ctrl');
const TestController = require('../controllers/api/test_ctrl');
const QuestionController = require('../controllers/api/question_ctrl');
const SavedController = require('../controllers/api/saved_ctrl')
const HistoryController = require('../controllers/api/history_ctrl')
const SelectedController = require('../controllers/api/selected_ctrl')

class ApiRouter{
    constructor(){
        this.router = express.Router();
        this.router.use(bodyParser.urlencoded({ extended: false }));
        this.router.use(bodyParser.json());
        this.config();
    }
    getRouter() {
        return this.router;
    }
    config(){
        const categoryCtrl = new CategoryController();
        this.router.get('/category',categoryCtrl.getAll.bind(categoryCtrl));
        this.router.get('/category/:id',categoryCtrl.get.bind(categoryCtrl))
        this.router.post('/category',categoryCtrl.add.bind(categoryCtrl));
        this.router.put('/category',categoryCtrl.update.bind(categoryCtrl));
        this.router.delete('/category/:id',categoryCtrl.delete.bind(categoryCtrl));

        const testCtrl = new TestController();
        this.router.get('/test',testCtrl.getAll.bind(testCtrl));
        this.router.get('/test/:id',testCtrl.get.bind(testCtrl))
        this.router.post('/test',testCtrl.add.bind(testCtrl));
        this.router.put('/test',testCtrl.update.bind(testCtrl));
        this.router.delete('/test/:id',testCtrl.delete.bind(testCtrl));

        const questionCtrl = new QuestionController();
        this.router.get('/question',questionCtrl.getAll.bind(questionCtrl));
        this.router.get('/question/:id',questionCtrl.get.bind(questionCtrl))
        this.router.post('/question',questionCtrl.add.bind(questionCtrl));
        this.router.put('/question',questionCtrl.update.bind(questionCtrl));
        this.router.delete('/question/:id',questionCtrl.delete.bind(questionCtrl));

        const tagCtrl = new TagController();
        this.router.get('/tag',tagCtrl.getAll.bind(tagCtrl));
        this.router.get('/tag/:id',tagCtrl.get.bind(tagCtrl))
        this.router.post('/tag',tagCtrl.add.bind(tagCtrl));
        this.router.put('/tag',tagCtrl.update.bind(tagCtrl));
        this.router.delete('/tag/:id',tagCtrl.delete.bind(tagCtrl));

        const savedCtrl = new SavedController();
        this.router.get('/saved',savedCtrl.getAll.bind(savedCtrl));
        this.router.get('/saved/:id',savedCtrl.get.bind(savedCtrl))
        this.router.post('/saved',savedCtrl.add.bind(savedCtrl));
        this.router.put('/saved',savedCtrl.update.bind(savedCtrl));
        this.router.delete('/saved/:id',savedCtrl.delete.bind(savedCtrl));

        const historyCtrl = new HistoryController();
        this.router.get('/history',historyCtrl.getAll.bind(historyCtrl));
        this.router.get('/history/:id',historyCtrl.get.bind(historyCtrl))
        this.router.post('/history',historyCtrl.add.bind(historyCtrl));
        this.router.put('/history',historyCtrl.update.bind(historyCtrl));
        this.router.delete('/history/:id',historyCtrl.delete.bind(historyCtrl));

        const selectedCtrl = new SelectedController();
        this.router.get('/selected',selectedCtrl.getAll.bind(selectedCtrl));
        this.router.get('/selected/:id',selectedCtrl.get.bind(selectedCtrl))
        this.router.post('/selected',selectedCtrl.add.bind(selectedCtrl));
        this.router.put('/selected',selectedCtrl.update.bind(selectedCtrl));
        this.router.delete('/selected/:id',selectedCtrl.delete.bind(selectedCtrl));
    }
}

module.exports = ApiRouter;