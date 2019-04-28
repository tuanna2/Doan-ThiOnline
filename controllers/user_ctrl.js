const UserModel = require('../models/user_model');

class UserController {
    constructor() {
        this.userModel = new UserModel();
    }

    loginGet(req, res) {
        if(req.session.username){
            res.redirect('/');
        }
        else{
            res.render('login',{err:''});
        }
    }
    loginPost(req,res){
        this.userModel.get({email:req.body.email,password:req.body.password})
        .then(data=>{
            if(typeof data !== "undefined"){
                req.session.idUser = data.id;
                res.redirect('/');
            }
            else{
                res.render('login',{err:'Tài khoản hoặc mật khẩu không chính xác'})
            }
        },err => res.render('login',{err:err})
        )
    }
    signupGet(req, res) {
        if(req.session.idUser){
            res.redirect('/');
        }
        else{
            res.render('register',{err:''});
        }
    }
    signupPost(req,res){
            this.userModel.add({username:req.body.username,email:req.body.email,password:req.body.password})
            .then(data=>{
                req.session.idUser = data[0];
                res.redirect('/')
            },err => res.render({err:'Email đã có người sử dụng'}))
    }
    logout(req,res){
        req.session.destroy();
        res.redirect("/");
    }
}
module.exports = UserController;