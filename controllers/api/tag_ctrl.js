const TagModel = require('../../models/tag_model');
const BaseApiCtrl = require('./base_api_ctrl');

class TagController extends BaseApiCtrl{
    constructor() {
        super(TagModel);
        this.tagModel = new TagModel();
    }
    async getTag(req,res){
        const rs = req.query.category !== undefined ?
            await this.tagModel.getByCategory(req.query.category)
            : await this.tagModel.getAll();
        (typeof rs !== "undefined") ?
            res.json({ message: 'success', data: [].concat(rs)}) :
            res.json({ message: 'success', data: []});
    }
}
module.exports = TagController;