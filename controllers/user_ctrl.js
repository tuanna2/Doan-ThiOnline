const UserModel = require('../models/user_model');
const CategoryModel = require('../models/category_model');
const TestModel = require('../models/test_model');
const HistoryModel = require('../models/history_model');

class UserController {
    constructor() {
        this.userModel = new UserModel;
        this.categoryModel = new CategoryModel();
        this.testModel = new TestModel();
        this.historyModel = new HistoryModel();
    }

    loginGet(req, res) {
        req.session.username ? 
            res.redirect('/')
        :   res.render('login',{err:''});
    }
    async loginPost(req,res){
            const rs = await this.userModel.get(req.body);
            if(typeof rs !== "undefined"){
                req.session.idUser = rs.id;
                res.redirect('/');
            }
            else res.render('login',{err:'Tài khoản hoặc mật khẩu không chính xác'})
    }
    signupGet(req, res) {
        req.session.idUser ?
            res.redirect('/')
        :   res.render('register',{err:''});
    }
    async signupPost(req,res){
        try{
            const data = await this.userModel.add({username:req.body.username,email:req.body.email,password:req.body.password});
            req.session.idUser = data[0];
            res.redirect('/')
        } catch(e){
            res.render('register',{err:'Email đã có người sử dụng'});
        }
    }
    logout(req,res){
        req.session.destroy();
        res.redirect("/");
    }
    async profile(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        const categoryFollow = info.category_followed ? 
            await this.categoryModel.getIn(info.category_followed.split(','))
        :   null;
        const created = await this.testModel.getTestInfo({id_parent:req.session.idUser});
        const played = await this.testModel.getTestInfo({'history.id_user':req.session.idUser});
        res.render('profile/profile',{info,categoryFollow,created,played});
    }
    async following(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        res.render('profile/category_follow',{info});
    }
    async settingInfo(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        res.render('profile/setting',{info})
    }
    async changePass(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        res.render('profile/changePass',{info})
    }
    async apiChangePass(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        if(req.body.oldpass !== info.password){
            return res.status(403).send('Mật khẩu cũ không chính xác !')
        }
        if(req.body.newpass !== req.body.repass){
            return res.status(403).send('Mật khẩu và nhập lại mật khẩu không khớp !')
        }
        try{
            await this.userModel.update({id:req.session.idUser,password:req.body.newpass});
            res.status(200).send('Đổi mật khẩu thành công');
        } catch(e){
            res.status(403).send(e);
        }  
    }
    async profileFriend(req,res){
        const info = await this.userModel.get({id:req.session.idUser});
        const friend = await this.userModel.get({id:req.params.id});
        if(typeof friend === "undefined"){
            return res.redirect('/')
        }
        const categoryFollow = info.category_followed ? 
            await this.categoryModel.getIn(info.category_followed.split(','))
        :   null;
        const created = await this.testModel.getTestInfo({id_parent:req.params.id});
        const played = await this.testModel.getTestInfo({'history.id_user':req.params.id});
        res.render('profile/profileFriend',{info,friend,categoryFollow,created,played});
    }
}
module.exports = UserController;