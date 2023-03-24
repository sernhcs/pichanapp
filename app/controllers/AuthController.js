const {User, Token, Role} = require('../models/index');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const sendEmail = require("../utils/sendEmail");


module.exports = {
    //Login
    signIn(req, res) {
        let {email, password} = req.body;
        //     buscar usuario
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (!user) {
                res.status(404).json({msg: "usuario no encontrado"})
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    // creamos token
                    let token = jwt.sign({user: user}, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.json({
                        user: user,
                        token: token
                    });
                    //     devolvemos token
                } else {
                    res.status(401).json({msg: "contraseña incorrecta"})
                }
            }
        }).catch(err => {
            res.status(500).json(err);

        })


    },
    //signup
    // Registro
    async signUp(req, res) {

        // Encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        let role_user = await Role.findOne({
            where: {
                role: 'user'
            }
        });
        // Crear un usuario
        User.create({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password,
        },{include:'roles'}).then(async user => {

            await user.addRole(role_user);
            await user.reload();
            // Creamos el token
            let token = jwt.sign({user: user}, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                token: token
            });

        }).catch(err => {
            res.status(500).json(err);
        });

    },

    // restaurar contraseña
    async passwordReset(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (!user)
                return res.status(400).send("user with given email doesn't exist");

            let token = await Token.findOne({
                where:{userId: user.id}
            });
            if (!token) {
                token = await new Token({
                    userId: user.id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
            }
            // genera el link
            const link = `${process.env.BASE_URL}/password-reset/${user.id}/${token.token}`;
            // envìa el correo
            await sendEmail(user.email, "Password reset", link);

            res.json({
                status: true,
                message: 'password reset link sent to your email account'
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: 'An error occured'
            });
        }
    },

    async passwordResetToken(req, res) {
        try {
            const user = await User.findByPk(req.params.userId);
            if (!user) return res.status(400).send("invalid link or expired");

            const token = await Token.findOne({
                userId: user.id,
                token: req.params.token,
            });
            if (!token) return res.status(400).send("Invalid link or expired");

            user.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

            await user.save();
            await token.destroy();

            res.send("password reset sucessfully.");


        } catch (error) {
            res.send("An error occured");
            console.log(error);
        }
    }
}
