const UserModel = require('../models/user_model');

class UserController {
    constructor() {
        this.userModel = new UserModel;
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
        res.render('profile',{info:info})
    }
}
module.exports = UserController;