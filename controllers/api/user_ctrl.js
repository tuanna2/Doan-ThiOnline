const UserModel = require('../../models/user_model');
const BaseApiCtrl = require('./base_api_ctrl');
const path = require('path');
const bcrypt = require("bcryptjs");
const sharp = require('sharp');

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
            let name = '/uploads/avatar' + req.session.idUser + '.' + temp[temp.length-1];
            let pathName = path.join(__dirname,'../../public'+name);
            if(avatar.size > 200000){
                await sharp(avatar.data)
                .resize(100,100)
                .toFile(pathName);
            }
            else  await avatar.mv(pathName);
            await this.userModel.update({id:req.session.idUser,avatar:name});
            res.json({status:1,name:name});

        } catch(e){
            return res.status(500).send(e);
        }
    }
    async addUser(req,res){
        try{
            let data = req.body;
            data.password = await bcrypt.hash(req.body.password, 5);
            const rs = await this.userModel.add(data);
            res.json({ message: 'success', data: rs});
        } catch(e){
            res.status(500).send({message:'falled',error:e});
        }

    }
}
module.exports = UserController;