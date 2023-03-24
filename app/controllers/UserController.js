const {User}=require('../models/index');
const bcrypt = require("bcrypt");
const authConfig = require("../../config/auth");
const { Op } = require("sequelize");

module.exports={
    async find(req,res,next){
        let user = await User.findByPk(req.params.id,{
            attributes: [
                'id','name','username','lastname','phone','document_number','email'
            ],
        });

        if(!user){
            res.status(404).json({msg:"User no encontrado"});
        }else {
            // el userModel, se tenìa con user normal pero se cruzaba con el user de auth se cambia el nombre para evitar confusiòn
            req.userModel = user;
            next();
        }
    },

    async index(req,res){
        let users = await User.findAll({where:{status:1}});
        res.json({userData:users})
    },

    async create(req, res){
        let userModel = await new User();
        if (!req.body.lastname){
            res.json({msg:"Campo lastname es obligatorio"});
        }else{
            let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
            userModel.name = req.body.name;
            userModel.lastname = req.body.lastname;
            userModel.username = req.body.username;
            userModel.email = req.body.email;
            userModel.phone = req.body.phone;
            userModel.password = password;
            userModel.document_number = req.body.document_number;
            userModel.status = 1;
            userModel.score = req.body.score;

            userModel.save().then(user =>{
                res.json(user);
            })
        }
    },
    async show(req, res){
        res.json(req.userModel);
    },

//     update
    async update(req, res){
        if (!req.userModel.lastname){
            res.json({msg:"Campo lastname es obligatorio"});
        }else{
            // verificar errores de datos ya registrados, si es del mismo usuario no lo trae como errore
            let exist_user  = await User.findOne({
                where:{
                    phone:req.body.phone,
                    id: {[Op.not]:req.body.id}
                }
            });
            if(exist_user){
                return res.status(400).json({status:false,message:'el numero ya esta registrado'});
            }
            // trae los campos ya registrados
            req.userModel.name = req.body.name;
            req.userModel.lastname = req.body.lastname;
            req.userModel.username = req.body.username;
            req.userModel.email = req.body.email;
            req.userModel.phone = req.body.phone;
            req.userModel.document_number = req.body.document_number;
            req.userModel.status = req.body.status;
            req.userModel.score = req.body.score;

            // guarda la modificaciòn de user
            req.userModel.save().then(user =>{
                res.json(user);
            })
                // trae los errores
                .catch(error=>{
                console.log(error);
                res.status(400).json({status:false,message:'error inesperado',error});
            })
        }
    },

//     delete
    async delete(req, res){

        req.userModel.status =0;
        req.userModel.save().then(user=>{
            // se conjuga con el ngoninit o onview para refrescar la pàgina
            res.json({success:true, msg:"User ha sido eliminado"});
        }).catch(error=>{
            // devuelve el error 
            res.status(400).res.json({success:false, msg:"Error inesperado", error});
        })
    },
}













