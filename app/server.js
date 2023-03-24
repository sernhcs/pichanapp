const express = require('express');
const sls = require('serverless-http');
var cors = require('cors')
const expressValidator = require('express-validator')
const app = express();

app.use(cors({
    origin: '*',
    methods: '*',
    optionsSuccessStatus: 200
}))
const {sequelize} = require('./models/index');
// require('./database/associations')

//SETTINGS
const PORT = process.env.PORT||3000;


//MIDDLEWARE
// Para rellenar el re.qbody
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(expressValidator())

//RUTAS
app.use(require('./routes'));


//ARRANCAMOS EL SERVER
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}`);

    //conectarse a bd

    sequelize.authenticate().then(() => {
        console.log('nos hemos conectado a la db');
    }).catch(error => {
        console.log('se ha producido un error',error);
    })
});

module.exports.server = sls(app);
