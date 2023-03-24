const {User}= require('../models/index')

module.exports ={
    // create(req,res,next){
    //     if (req.user.id === req.sport_ground.userId || User.isAdmin(req.user.roles)){
    //         next();
    //     }  else{
    //         res.status(401).json({msg: "NO estàs autorizado"})
    //     }
    // },
    show(req,res,next){
        if (req.user.id === req.sport_ground.userId || User.isAdmin(req.user.roles)){
            next();
        }  else{
            res.status(401).json({msg: "NO estàs autorizado"})
        }
    },

    update(req,res,next){
        if (User.isAdmin(req.user.roles)){
            next();
        }  else{
            res.status(401).json({msg: "NO estàs autorizado"})
        }
    },

    delete(req,res,next){
        if (req.user.id === req.sport_ground.userId || User.isAdmin(req.user.roles)){
            next();
        }  else{
            res.status(401).json({msg: "NO estàs autorizado"})
        }
    },
}