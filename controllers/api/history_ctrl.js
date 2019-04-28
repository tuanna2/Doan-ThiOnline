const SavedModel = require('../../models/saved_model');
const BaseApiCtrl = require('./base_api_ctrl');

class SavedController extends BaseApiCtrl{
    constructor() {
        super(SavedModel);
    }
}
module.exports = SavedController;