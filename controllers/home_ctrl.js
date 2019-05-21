const UserModel = require('../models/user_model');
const TestModel = require('../models/test_model');


class HomeController {
    constructor() {
        this.userModel = new UserModel();
        this.testModel = new TestModel();
    }

    async index(req, res) {
        if(req.session.idUser){
            const info = await this.userModel.get({id:req.session.idUser});
            if(typeof info === "undefined"){
                return res.redirect('/logout');
            }
            else if(info.category_followed == null){
                return res.render('profile/category_follow',{info,data:null});
            }
            let arrayFollow = info.category_followed.split(',');
            const tests = await this.testModel.getTestByCategory(arrayFollow);
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