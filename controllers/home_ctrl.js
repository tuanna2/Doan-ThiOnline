const UserModel = require('../models/user_model');

class HomeController {
    constructor() {
        this.userModel = new UserModel();
    }

    async index(req, res) {
        if(req.session.idUser){
            const info = await this.userModel.get({id:req.session.idUser});
            typeof info !== "undefined" ? res.render('home_logged',{info:info})
            : res.redirect('/logout');
        }
        else{
            res.render('home');
        }
    }
    
}
module.exports = HomeController;