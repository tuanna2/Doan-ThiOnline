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
            res.render('home_logged',{info,tests,category:0})
        }
        else{
            const tests = await this.testModel.getTestByCategory([1,2,3,4,5,6,7]);
            res.render('home',{tests});
        }
    }
    async testOfCategory(req,res){
        const category = req.params.category;
        const tests = await this.testModel.getTestInfo({'category.id':category,status: 1 });
        if(req.session.idUser){
            const info = await this.userModel.get({id:req.session.idUser});
            res.render('home_logged',{info,tests,category})
        }
        else {
            res.render('home',{tests});
        }
    }
    async search(req,res){
        const valueSearch = req.query.value;
        const tests = await this.testModel.search(valueSearch);
         if(req.session.idUser){
            const info = await this.userModel.get({id:req.session.idUser});
            res.render('home_logged',{info,tests,category:-1,valueSearch})
        }
        else {
            res.render('home',{tests,valueSearch});
        }
    }

    isLoggedIn(req,res,next){
        req.session.idUser ? next() 
        : res.redirect('/login'); 
    }
    
}
module.exports = HomeController;