const jwt = require('../../utils/jwt');

class Middleware{
    constructor(){}

    adminLogged(req, res, next){
        req.session.admin ? next()
        : res.json({message:"failed",err:"Not authenticated !"});
    }
    userLogged(req, res, next){
        req.session.idUser ? next()
        : res.json({message:"failed",err:"Not authenticated !"});
    }
    checkToken(req, res, next){
        let token =  req.headers.authorization || '';
        const data = jwt.checkToken(token);
        if(!data){
            return res.json({message:"failed",err:"Not authenticated !"});
        }
        req.userInfo = data;
        return next();
    }
}
module.exports = Middleware;