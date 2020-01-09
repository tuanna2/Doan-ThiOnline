const StoreModel = require('../../models/store_model');
const BaseApiCtrl = require('./base_api_ctrl');

class StoreController extends BaseApiCtrl{
    constructor() {
        super (StoreModel);
        this.storeModel = new StoreModel();
    }
    async getStores(req, res){
        const rs = req.query.tag ? await this.storeModel.getMany({tag_id: req.query.tag})
             : req.query.list ? await this.storeModel.getIn(req.query.list.split(',')) 
             : await this.storeModel.getAll();
        (typeof rs !== "undefined") ?
            res.json({ message: 'success', data: [].concat(rs)}) :
            res.json({ message: 'success', data: []});
    }
}
module.exports = StoreController;