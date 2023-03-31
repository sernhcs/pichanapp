const express = require('express');
const router =express.Router();


// COntrollers
const AuthController = require('./controllers/AuthController');
const PostController = require('./controllers/PostController');
const UserController = require('./controllers/UserController');
const SportGroundController = require('./controllers/SportGroundController');
const FeedController = require('./controllers/FeedController');

// middlewares
const auth = require('./middlewares/auth');

// Policies
const PostPolicy = require('./policies/PostPolicy');
const UserPolicy = require('./policies/UserPolicy');
const SportGroundPolicy = require('./policies/SportGroundPolicy');
const FeedPolicy = require('./policies/FeedPolicy');

const UploadController = require('./controllers/UploadController')
const { upload } = require('./service/upload.service')


// Rutas
// HOme
router.get('/', (req,res)=>res.json({hello:"world"}));

// rutas de login y registro
// /api/signin y signup
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

// Rutas para posts
router.get('/api/posts',auth, PostController.index);
router.get('/api/posts/:id',auth, PostController.find, PostPolicy.show, PostController.show);
router.patch('/api/posts/:id',auth, PostController.find,PostPolicy.update, PostController.update);
router.delete('/api/posts/:id',auth, PostController.find, PostPolicy.delete,PostController.delete);

//Rutas para control de usuarios
router.all('/api/users', UserController.index);
router.post('/api/users', UserController.create);
router.get('/api/users/:id', UserController.find, UserController.show);
router.post('/api/users/:id', UserController.find, UserController.update);
router.post('/api/users-delete/:id', UserController.find,UserController.delete);

//Rutas para control de canchas(sport_grounds)
router.all('/api/sport_grounds', SportGroundController.index);
router.post('/api/create/sport_grounds', SportGroundController.create);
router.get('/api/sport_grounds/:id', SportGroundController.find, SportGroundController.show);
router.post('/api/sport_grounds/:id', SportGroundController.validate('createSportGround'),  SportGroundController.find, SportGroundController.update);
router.post('/api/delete/sport_grounds/:id', SportGroundController.find, SportGroundController.delete);

//feed (principal view)
router.post('/api/feed', FeedController.index);
router.post('/api/feedUpdate', FeedController.create);
router.post('/api/feedDelete', FeedController.find, FeedController.delete);

// mail send
router.post('/api/password-reset', AuthController.passwordReset);
router.post('/api/password-reset/:userId/:token', AuthController.passwordResetToken);


//UPLOAD IMAGES
router.post('/api/upload', upload.single('image'), UploadController.uploadImage)

module.exports = router;























