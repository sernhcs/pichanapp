const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const {verify} = require("jsonwebtoken");
const {User} = require('../models/index');

module.exports=(req,res,next)=>{


    if (!req.headers.authorization){
        res.status(401).json({msg:"acceso no autorizado"})
    }else{
        // comprobar la validez
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,authConfig.secret, (err,decoded)=>{
            if (err){
                res.status(500).json({msg: "problema al decodificado el token"})
            }else {
                User.findByPk(decoded.user.id,{include:"roles"}).then(user =>{

                    req.user = user;

                    next();

                })
            }
        })

    }

};




















