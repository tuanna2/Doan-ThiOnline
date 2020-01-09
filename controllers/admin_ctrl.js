const UserModel = require('../models/user_model');
const TestModel = require('../models/test_model');
const bcrypt = require("bcryptjs");
const CategoryModel = require('../models/category_model');
const TagModel = require('../models/tag_model');
const StoreModel = require('../models/store_model');

class AdminController{
    constructor(){
        this.userModel = new UserModel();
        this.testModel = new TestModel();
        this.categoryModel = new CategoryModel();
        this.tagModel = new TagModel();
        this.storeModel = new StoreModel();
    }
    async index(req, res){
        const info = await this.userModel.get({email:'admin'});
        const countTesting = await this.testModel.count({status: 0});
        const users = await this.userModel.getAll();
        res.render('admin/index',{info,data:users,countTesting});
    }

    async tested(req, res){
        const info = await this.userModel.get({email:'admin'});
        const tests = await this.testModel.getTestInfo({status: 1});
        const category = await this.categoryModel.getAll();
        const countTesting = await this.testModel.count({status: 0});
        res.render('admin/tested',{info,category,data:tests,countTesting});
    }
    async testing(req, res){
        const info = await this.userModel.get({email:'admin'});
        const tests = await this.testModel.getTestInfo({status: 0});
        const category = await this.categoryModel.getAll();
        const countTesting = await this.testModel.count({status: 0});
        res.render('admin/testing',{info,category,data:tests,countTesting});
    }
    async tag(req, res){
        const info = await this.userModel.get({email:'admin'});
        const tag = await this.tagModel.getAllTag();
        const category = await this.categoryModel.getAll();
        const countTesting = await this.testModel.count({status: 0});
        res.render('admin/tag',{info,category,data:tag,countTesting});
    }

    loginView(req, res){
        req.session.admin ? res.redirect('/admin')
        :    res.render('admin/login',{err:0});
    }
    async login(req, res){
        if(req.body.user !== "admin"){
            return res.render('admin/login',{err:1})
        }
        const rs = await this.userModel.get({email:'admin'});
        let checkPass = await bcrypt.compare(req.body.pass, rs.password);
        if(checkPass){
            req.session.idUser = rs.id;
            req.session.admin = true;
            res.redirect('/admin');
        }
        else res.render('admin/login',{err:1})
    }
    isLoggedIn(req, res, next){
        req.session.admin ? next()
            : res.redirect('/admin/login');
    }
    async createTest (req ,res){
        const info = await this.userModel.get({email:'admin'});
        const countTesting = await this.testModel.count({status: 0});
        const category = await this.categoryModel.getAll();
        res.render('admin/create_test', {info, countTesting, category});
    }
    async store(req, res){
        const info = await this.userModel.get({email:'admin'});
        const countTesting = await this.testModel.count({status: 0});
        const category = await this.categoryModel.getAll();
        const store = await this.storeModel.getStore();
        res.render('admin/store', {info, countTesting, data: store, category})
    }
    async createStore(req, res){
        const info = await this.userModel.get({email:'admin'});
        const countTesting = await this.testModel.count({status: 0});
        const category = await this.categoryModel.getAll();
        res.render('admin/create_store', {info, countTesting, category});
    }
    async editStore(req, res){
        const data = await this.storeModel.getOne(req.params.id);
        if(typeof data ==="undefined") {
            return res.render('error')
        }
        const info = await this.userModel.get({email:'admin'});
        const countTesting = await this.testModel.count({status: 0});
        const category = await this.categoryModel.getAll();
        res.render('admin/edit_store', {data, info, countTesting, category});
    }

    
}
module.exports = AdminController;