const SelectedModel = require('../../models/selected_model');
const BaseApiCtrl = require('./base_api_ctrl');

class SelectedController extends BaseApiCtrl{
    constructor() {
        super(SelectedModel);
    }
}
module.exports = SelectedController;