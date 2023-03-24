const {User}= require('../models/index')

module.exports ={
    show(req,res,next){
        console.log(req.user);

      if (User.isAdmin(req.user.roles)){
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
      if ( User.isAdmin(req.user.roles)){
          next();
      }  else{
          res.status(401).json({msg: "NO estàs autorizado"})
      }
    },
}