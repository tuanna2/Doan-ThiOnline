const UserModel = require('../../models/user_model');
const BaseApiCtrl = require('./base_api_ctrl');
const path = require('path');
const bcrypt = require("bcryptjs");
const sharp = require('sharp');
const jwt = require('../../utils/jwt');

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
            const checkUser = await this.userModel.get({email:data.email});
            if(typeof checkUser !== "undefined"){
                return res.status(500).json({err:'Tài khoản đã tồn tại'});
            }
            data.password = await bcrypt.hash(req.body.password, 5);
            const id = await this.userModel.add(data);
            const rs = await this.userModel.get({id: id[0]});
            const user = {id: rs.id, email: rs.email, role: rs.role};
            const token = jwt.sign(user);
            res.json({ message: 'success', data: {token}});
        } catch(e){
            res.status(500).send({message:'falled', error:e});
        }
    }
    async loginUser(req, res){
        const rs = await this.userModel.get({email:req.body.email});
        if(typeof rs === "undefined"){
            return res.status(500).json({err:'Tài khoản đã bị khoá hoặc không tồn tại trong hệ thống'});
        }
        let checkPass = await bcrypt.compare(req.body.password, rs.password);
        if(checkPass){
            const user = {id: rs.id, email: rs.email, role: rs.role};
            const token = jwt.sign(user);
            res.json({ message: 'success', data: {token}});
        }
        else res.status(500).json({err:'Tài khoản hoặc mật khẩu không chính xác'});
    }
}
module.exports = UserController;