const {Feed}=require('../models/index');
const { body } = require('express-validator/check')
const { validationResult } = require('express-validator/check');

module.exports={
    // validate(method){
    //     switch (method) {
    //         case 'createFeed': {
    //             return [
    //                 body('name', "name doesn't exists").exists(),
    //                 body('description', "description doesn't exists").exists(),
    //                 body('latitud', "latitud doesn't exists").exists(),
    //                 // body('adress', "adress doesn't exists").exists(),
    //                 // body('longitud', "longitud doesn't exists").exists(),
    //                 // body('latitud', "latitud doesn't exists").exists(),
    //                 // body('status', "status doesn't exists").exists(),
    //
    //             ]
    //         }
    //     }
    // },

    async find(req,res,next){
        let feed = await Feed.findByPk(req.body.id);
        if(!feed){
            res.status(404).json({msg:"Publicaciòn no encontrada"});
        }else {
            req.feed = feed;
            next();
        }
    },

    async index(req,res){
        let feeds = await Feed.findAll();
        res.json({feedData:feeds})
    },

    // create
    async create(req, res) {
        try {

            await Feed.create({
                feed: req.body.feed,
            }).then((result) => {
                    res.status(201).json({
                        message: "Publicaciòn realizad satisfactoriamente", data: result,
                    });
                });
        } catch(err) {
            return next(err)
        }

    },


// //     show
//     async show(req, res){
//         res.json(req.sport_ground);
//     },
//

// //     update
//     async update(req, res){
//         try {
//             //validar datos
//             const errors = validationResult(req); // Encuentra los errores de validación en esta solicitud y los envuelve en un objeto resultante de una práctica función
//
//             if (!errors.isEmpty()) {
//                 res.status(422).json({ errors: errors.array() });
//                 return;
//             }
//
//             // actualizaciòn
//
//             req.sport_ground.name = req.body.name;
//             req.sport_ground.description = req.body.description;
//             req.sport_ground.adress = req.body.adress;
//             req.sport_ground.latitud = req.body.latitud;
//             req.sport_ground.longitud = req.body.longitud;
//             req.sport_ground.photo = req.body.photo;
//             req.sport_ground.status = req.body.status;
//
//             req.sport_ground.save().then(sport_ground =>{
//                 res.json(sport_ground);
//             })
//         } catch(err) {
//             return next(err)
//         }
//
//
//     },
//

//     delete
    async delete(req, res){

        req.feed.destroy().then(feed=>{
            res.json({success:true, msg:"La publicaciòn ha sido eliminada"});
        })

    },
}















