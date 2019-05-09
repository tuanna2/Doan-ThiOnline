const UserModel = require('../models/user_model');
const TestModel = require('../models/test_model');
const FollowedModel = require('../models/followed_model');


class HomeController {
    constructor() {
        this.userModel = new UserModel();
        this.testModel = new TestModel();
        this.followedModel = new FollowedModel();
    }

    async index(req, res) {
        if(req.session.idUser){
            const info = await this.userModel.get({id:req.session.idUser});
            if(typeof info === "undefined"){
                return res.redirect('/logout');
            }
            const follow = await this.followedModel.get({id_user:req.session.idUser});
            console.log(follow)
            if(typeof follow === "undefined"){
                return res.render('category_follow',{info,tests:null});
            }
            const tests = await this.testModel.getTestByCategory(follow);
            res.render('home_logged',{info,tests})
        }
        else{
            res.render('home');
        }
    }

    isLoggedIn(req,res,next){
        req.session.idUser ? next() 
        : res.redirect('/login'); 
    }
    
}
module.exports = HomeController;