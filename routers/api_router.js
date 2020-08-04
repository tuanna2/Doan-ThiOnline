const BaseRouter = require('./base_router');
const UserController = require('../controllers/api/user_ctrl');
const CategoryController = require('../controllers/api/category_ctrl');
const TagController = require('../controllers/api/tag_ctrl');
const TestController = require('../controllers/api/test_ctrl');
const QuestionController = require('../controllers/api/question_ctrl');
const SavedController = require('../controllers/api/saved_ctrl');
const HistoryController = require('../controllers/api/history_ctrl');
const StoreController = require('../controllers/api/store_ctrl');
const Middleware = require('../controllers/api/middleware');

class ApiRouter extends BaseRouter {
    constructor() {
        super();
    }
    config() {
        const middleware = new Middleware();
        const userCtrl = new UserController();
        this.router.post('/login', userCtrl.loginUser.bind(userCtrl));
        this.router.post('/signup', userCtrl.addUser.bind(userCtrl));
        this.router.get('/user', middleware.adminLogged, userCtrl.getAll.bind(userCtrl));
        this.router.get('/user/:id', middleware.adminLogged, userCtrl.get.bind(userCtrl));
        this.router.post('/user', middleware.adminLogged, userCtrl.addUser.bind(userCtrl));
        this.router.put('/user', middleware.userLogged, userCtrl.update.bind(userCtrl));
        this.router.delete('/user/:id', middleware.adminLogged, userCtrl.delete.bind(userCtrl));
        this.router.post('/upload', middleware.userLogged, userCtrl.upload.bind(userCtrl));

        const categoryCtrl = new CategoryController();
        this.router.get('/category', categoryCtrl.getAll.bind(categoryCtrl));
        this.router.get('/category/:id', categoryCtrl.get.bind(categoryCtrl))
        this.router.post('/category', middleware.adminLogged, categoryCtrl.add.bind(categoryCtrl));
        this.router.put('/category', middleware.adminLogged, categoryCtrl.update.bind(categoryCtrl));
        this.router.delete('/category/:id', middleware.adminLogged, categoryCtrl.delete.bind(categoryCtrl));

        const testCtrl = new TestController();
        this.router.get('/test', testCtrl.getAll.bind(testCtrl));
        this.router.get('/test/:id', testCtrl.get.bind(testCtrl))
        this.router.post('/test', middleware.userLogged, testCtrl.createTest.bind(testCtrl));
        this.router.put('/test', middleware.userLogged, testCtrl.update.bind(testCtrl));
        this.router.delete('/test/:id', middleware.userLogged, testCtrl.delete.bind(testCtrl));

        const questionCtrl = new QuestionController();
        this.router.get('/question', questionCtrl.getQuestionsByTest.bind(questionCtrl));
        this.router.get('/question/:id', questionCtrl.get.bind(questionCtrl))
        this.router.post('/question', middleware.userLogged, questionCtrl.add.bind(questionCtrl));
        this.router.put('/question', middleware.userLogged, questionCtrl.update.bind(questionCtrl));
        this.router.delete('/question/:id', middleware.userLogged, questionCtrl.delete.bind(questionCtrl));

        const tagCtrl = new TagController();
        this.router.get('/tag', tagCtrl.getTag.bind(tagCtrl));
        this.router.get('/tag/:id', tagCtrl.get.bind(tagCtrl))
        this.router.post('/tag', middleware.adminLogged, tagCtrl.add.bind(tagCtrl));
        this.router.put('/tag', middleware.adminLogged, tagCtrl.update.bind(tagCtrl));
        this.router.delete('/tag/:id', middleware.adminLogged, tagCtrl.delete.bind(tagCtrl));

        const savedCtrl = new SavedController();
        this.router.get('/saved', savedCtrl.getAll.bind(savedCtrl));
        this.router.get('/saved/:id', savedCtrl.get.bind(savedCtrl))
        this.router.post('/saved', middleware.userLogged, savedCtrl.add.bind(savedCtrl));
        this.router.put('/saved', middleware.userLogged, savedCtrl.update.bind(savedCtrl));
        this.router.delete('/saved/:id', middleware.userLogged, savedCtrl.delete.bind(savedCtrl));

        const historyCtrl = new HistoryController();
        this.router.get('/history', historyCtrl.getAll.bind(historyCtrl));
        this.router.get('/history/:id', historyCtrl.get.bind(historyCtrl))
        this.router.post('/history', middleware.userLogged, historyCtrl.add.bind(historyCtrl));
        this.router.put('/history', middleware.userLogged, historyCtrl.update.bind(historyCtrl));
        this.router.delete('/history/:id', middleware.userLogged, historyCtrl.delete.bind(historyCtrl));

        const storeCtrl = new StoreController();
        this.router.get('/store', middleware.adminLogged, storeCtrl.getStores.bind(storeCtrl));
        this.router.get('/store/:id', middleware.adminLogged, storeCtrl.get.bind(storeCtrl))
        this.router.post('/store', middleware.adminLogged, storeCtrl.add.bind(storeCtrl));
        this.router.put('/store',  middleware.adminLogged, storeCtrl.update.bind(storeCtrl));
        this.router.delete('/store/:id', middleware.adminLogged, storeCtrl.delete.bind(storeCtrl));
    }

}

module.exports = ApiRouter;