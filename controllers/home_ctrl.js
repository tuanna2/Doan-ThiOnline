// const RequestModel = require('../models/request_model');

class HomeController {
    constructor() {
        // this.requestModel = new RequestModel();
    }

    async index(req, res) {
        // const branchs = await this.branchModel.getAll();
        // const status = await this.requestStatusModel.getAll();
        if(req.session.idUser){
            res.render('home_logged');
        }
        else{
            res.render('home');
        }
    }
    
}
module.exports = HomeController;