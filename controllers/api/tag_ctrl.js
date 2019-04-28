const TagModel = require('../../models/tag_model');
const BaseApiCtrl = require('./base_api_ctrl');

class TagController extends BaseApiCtrl{
    constructor() {
        super(TagModel);
    }
}
module.exports = TagController;