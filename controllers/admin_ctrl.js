const UserModel = require('../models/user_model');
const TestModel = require('../models/test_model');
const bcrypt = require("bcrypt");
const CategoryModel = require('../models/category_model');

class AdminController{
    constructor(){
        this.userModel = new UserModel();
        this.testModel = new TestModel();
        this.categoryModel = new CategoryModel();
    }
    async index(req,res){
        const info = await this.userModel.get({email:'admin'});
        const countTesting = await this.testModel.count({permission:0});
        const users = await this.userModel.getAll();
        res.render('admin/index',{info,data:users,countTesting});
    }

    async tested(req,res){
        const info = await this.userModel.get({email:'admin'});
        const tests = await this.testModel.getTestInfo({permission:1});
        const category = await this.categoryModel.getAll();
        const countTesting = await this.testModel.count({permission:0});
        res.render('admin/tested',{info,category,data:tests,countTesting});
    }
    async testing(req,res){
        const info = await this.userModel.get({email:'admin'});
        const tests = await this.testModel.getTestInfo({permission:0});
        const category = await this.categoryModel.getAll();
        const countTesting = await this.testModel.count({permission:0});
        res.render('admin/testing',{info,category,data:tests,countTesting});
    }

    loginView(req,res){
        req.session.admin ? res.redirect('/admin')
        :    res.render('admin/login',{err:0});
    }
    async login(req,res){
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
    isLoggedIn(req,res,next){
        req.session.admin ? next()
            : res.redirect('/admin/login');
    }

    
}
module.exports = AdminController;