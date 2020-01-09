class Middleware{
    constructor(){}

    adminLogged(req,res,next){
        req.session.admin ? next()
        : res.json({message:"failed",err:"Not authenticated !"});
    }
    userLogged(req,res,next){
        req.session.idUser ? next()
        : res.json({message:"failed",err:"Not authenticated !"});
    }
}
module.exports = Middleware;