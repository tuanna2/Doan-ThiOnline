const TestModel = require('../../models/test_model');
const BaseApiCtrl = require('./base_api_ctrl');
const StoreModel = require('../../models/store_model');

class TestController extends BaseApiCtrl{
    constructor() {
        super(TestModel);
        this.testModel = new TestModel();
        this.storeModel = new StoreModel();
    }
    async createTest(req, res) {
        try{
            if(req.session.admin){
                req.body.id_parent = 1;
                req.body.status = 1;
                if(typeof req.body.store === "undefined"){
                    const level = req.body.level;
                    if(typeof level === "undefined"){
                        res.status(500).send("Error");
                    }
                    const qs_lv1 = level.level_1 <= 0 || level.level_1 == null ? [] : await this.storeModel.getRandom(1, req.body.id_tag, level.level_1);
                    const qs_lv2 = level.level_2 <= 0 || level.level_2 == null ? [] : await this.storeModel.getRandom(2, req.body.id_tag, level.level_2);
                    const qs_lv3 = level.level_3 <= 0 || level.level_3 == null ? [] : await this.storeModel.getRandom(3, req.body.id_tag, level.level_3);
                    req.body.store = ([].concat(qs_lv1).concat(qs_lv2).concat(qs_lv3)).map(e => e.id).toString();
                    delete req.body.level;
                }
                const rs = await this.testModel.add(req.body);
                res.json({ message: 'success', data: rs});
            }
            else {
                req.body.id_parent = req.session.idUser;
                req.body.status = null;
                const rs = await this.testModel.add(req.body);
                res.json({ message: 'success', data: rs});
            }
        } catch(e){
            console.log(e);
            res.status(500).send(e);
        }
    }
}
module.exports = TestController;