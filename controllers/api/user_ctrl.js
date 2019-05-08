const UserModel = require('../../models/user_model');
const BaseApiCtrl = require('./base_api_ctrl');
const path = require('path');

class UserController extends BaseApiCtrl{
    constructor() {
        super(UserModel);
        this.userModel = new UserModel();
    }
    async upload(req,res){
        if (Object.keys(req.files).length == 0 || !req.session.idUser) {
            return res.status(400).send('No files were uploaded or not in session.');
        }
        try{
            let avatar = req.files.file;
            let temp = avatar.name.split('.');
            let name = '/uploads/' + avatar.md5 +'.' + temp[temp.length-1];
            let pathName = path.join(__dirname,'../../public'+name)
            await avatar.mv(pathName);
            await this.userModel.update({id:req.session.idUser,avatar:name})
            res.json({status:1,name:name});

        } catch(e){
            return res.status(500).send(e);
        }
    }
}
module.exports = UserController;