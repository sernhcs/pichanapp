const {SportGround}=require('../models/index');
const { body } = require('express-validator/check')
const { validationResult } = require('express-validator/check');

module.exports={
    validate(method){
        switch (method) {
            case 'createSportGround': {
                return [
                    body('name', "name doesn't exists").exists(),
                    body('description', "description doesn't exists").exists(),
                    body('latitud', "latitud doesn't exists").exists(),
                    body('adress', "adress doesn't exists").exists(),
                    body('longitud', "longitud doesn't exists").exists(),
                    body('latitud', "latitud doesn't exists").exists(),
                    body('status', "status doesn't exists").exists(),

                ]
            }
        }
    },
    async find(req,res,next){
        let sport_ground = await SportGround.findByPk(req.params.id);
        if(!sport_ground){
            res.status(404).json({msg:"Cancha no encontrada"});
        }else {
            req.sport_ground = sport_ground;
            next();
        }
    },

    async index(req,res){
        // trae solo los del status 1, evita que al utilizar el delete se borre la info completa
        let sport_grounds = await SportGround.findAll({where:{status:1}});
        return res.json({sportGroundData:sport_grounds})
    },

    // create
    async create(req, res) {
        try {
            const errors = validationResult(req); // Encuentra los errores de validación en esta solicitud y los envuelve en un objeto resultante de una práctica función

            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });
                return;
            }

            await SportGround.create({
                name: req.body.name,
                description: req.body.description,
                adress: req.body.adress,
                latitud: req.body.latitud,
                longitud: req.body.longitud,
                photo: req.body.photo,
                status: req.body.status,
            }).then((result) => {
                    res.status(201).json({
                        message: "sportground successful created", data: result,
                    });
                });
        } catch(err) {
            return next(err)
        }
    },


//     show
    async show(req, res){
        res.json(req.sport_ground);
    },

//     update
    async update(req, res){
        try {
            //validar datos
            const errors = validationResult(req); // Encuentra los errores de validación en esta solicitud y los envuelve en un objeto resultante de una práctica función

            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });
                return;
            }

            // actualizaciòn

            req.sport_ground.name = req.body.name;
            req.sport_ground.description = req.body.description;
            req.sport_ground.adress = req.body.adress;
            req.sport_ground.latitud = req.body.latitud;
            req.sport_ground.longitud = req.body.longitud;
            req.sport_ground.photo = req.body.photo;
            req.sport_ground.status = req.body.status;

            req.sport_ground.save().then(sport_ground =>{
                res.json(sport_ground);
            })
        } catch(err) {
            return next(err)
        }


    },

//     delete
    async delete(req, res){
        req.sport_ground.status =0;

        req.sport_ground.save().then(sport_ground=>{
            res.json({success:true, msg:"Sport ground eliminado"});

        }).catch(error=>{
            res.status(400).json({success:false, msg:"Error inesperado", error});
        })

    },
}














