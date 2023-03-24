const {User}= require('../models/index')

module.exports ={
    show(req,res,next){
      if (req.user.id === req.post.userId || User.isAdmin(req.user.roles)){
          next();
      }  else{
          res.status(401).json({msg: "NO estàs autorizado"})
      }
    },

    update(req,res,next){
      if (req.user.id === req.post.userId || User.isAdmin(req.user.roles)){
          next();
      }  else{
          res.status(401).json({msg: "NO estàs autorizado"})
      }
    },

    delete(req,res,next){
      if (req.user.id === req.post.userId || User.isAdmin(req.user.roles)){
          next();
      }  else{
          res.status(401).json({msg: "NO estàs autorizado"})
      }
    },
}