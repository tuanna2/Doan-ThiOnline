class Middleware{
    constructor(){}

    adminIsLogged(req,res,next){
        req.session.admin ? next()
        : res.json({message:"failed",err:"Not authenticated !"});
    }
    userIsLogged(req,res,next){
        req.session.idUser ? next()
        : res.json({message:"failed",err:"Not authenticated !"});
    }
}
module.exports = Middleware;