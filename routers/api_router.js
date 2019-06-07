const BaseRouter = require('./base_router');
const UserController = require('../controllers/api/user_ctrl');
const CategoryController = require('../controllers/api/category_ctrl');
const TagController = require('../controllers/api/tag_ctrl');
const TestController = require('../controllers/api/test_ctrl');
const QuestionController = require('../controllers/api/question_ctrl');
const SavedController = require('../controllers/api/saved_ctrl')
const HistoryController = require('../controllers/api/history_ctrl')
const Middleware = require('../controllers/api/middleware');
class ApiRouter extends BaseRouter{
    constructor(){
        super();
    }
    config(){
        const middleware = new Middleware();
        const userCtrl = new UserController();
        this.router.get('/user',middleware.adminIsLogged,userCtrl.getAll.bind(userCtrl));
        this.router.get('/user/:id',userCtrl.get.bind(userCtrl))
        this.router.post('/user',middleware.adminIsLogged,userCtrl.addUser.bind(userCtrl));
        this.router.put('/user',middleware.userIsLogged,userCtrl.update.bind(userCtrl));
        this.router.delete('/user/:id',middleware.adminIsLogged,userCtrl.delete.bind(userCtrl));

        this.router.post('/upload',middleware.userIsLogged,userCtrl.upload.bind(userCtrl));

        const categoryCtrl = new CategoryController();
        this.router.get('/category',categoryCtrl.getAll.bind(categoryCtrl));
        this.router.get('/category/:id',categoryCtrl.get.bind(categoryCtrl))
        this.router.post('/category',middleware.adminIsLogged,categoryCtrl.add.bind(categoryCtrl));
        this.router.put('/category',middleware.adminIsLogged,categoryCtrl.update.bind(categoryCtrl));
        this.router.delete('/category/:id',middleware.adminIsLogged,categoryCtrl.delete.bind(categoryCtrl));

        const testCtrl = new TestController();
        this.router.get('/test',testCtrl.getAll.bind(testCtrl));
        this.router.get('/test/:id',testCtrl.get.bind(testCtrl))
        this.router.post('/test',middleware.userIsLogged,testCtrl.add.bind(testCtrl));
        this.router.put('/test',middleware.userIsLogged,testCtrl.update.bind(testCtrl));
        this.router.delete('/test/:id',middleware.userIsLogged,testCtrl.delete.bind(testCtrl));

        const questionCtrl = new QuestionController();
        this.router.get('/question',questionCtrl.getQuestionsByTest.bind(questionCtrl));
        this.router.get('/question/:id',questionCtrl.get.bind(questionCtrl))
        this.router.post('/question',middleware.userIsLogged,questionCtrl.add.bind(questionCtrl));
        this.router.put('/question',middleware.userIsLogged,questionCtrl.update.bind(questionCtrl));
        this.router.delete('/question/:id',middleware.userIsLogged,questionCtrl.delete.bind(questionCtrl));

        const tagCtrl = new TagController();
        this.router.get('/tag',tagCtrl.getTag.bind(tagCtrl));
        this.router.get('/tag/:id',tagCtrl.get.bind(tagCtrl))
        this.router.post('/tag',middleware.adminIsLogged,tagCtrl.add.bind(tagCtrl));
        this.router.put('/tag',middleware.adminIsLogged,tagCtrl.update.bind(tagCtrl));
        this.router.delete('/tag/:id',middleware.adminIsLogged,tagCtrl.delete.bind(tagCtrl));

        const savedCtrl = new SavedController();
        this.router.get('/saved',savedCtrl.getAll.bind(savedCtrl));
        this.router.get('/saved/:id',savedCtrl.get.bind(savedCtrl))
        this.router.post('/saved',middleware.userIsLogged,savedCtrl.add.bind(savedCtrl));
        this.router.put('/saved',middleware.userIsLogged,savedCtrl.update.bind(savedCtrl));
        this.router.delete('/saved/:id',middleware.userIsLogged,savedCtrl.delete.bind(savedCtrl));

        const historyCtrl = new HistoryController();
        this.router.get('/history',historyCtrl.getAll.bind(historyCtrl));
        this.router.get('/history/:id',historyCtrl.get.bind(historyCtrl))
        this.router.post('/history',middleware.userIsLogged,historyCtrl.add.bind(historyCtrl));
        this.router.put('/history',middleware.userIsLogged,historyCtrl.update.bind(historyCtrl));
        this.router.delete('/history/:id',middleware.userIsLogged,historyCtrl.delete.bind(historyCtrl));
    }

}

module.exports = ApiRouter;