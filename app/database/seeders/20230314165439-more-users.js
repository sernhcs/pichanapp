'use strict';

const { User, Role }=require('../../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(req,res) {

        let role_user = await Role.findOne({
            where: {
                role: 'user'
            }
        });
        let role_admin = await Role.findOne({
            where: {
                role: 'admin'
            }
        });
        let role_supervisor = await Role.findOne({
            where: {
                role: 'supervisor'
            }
        });
        let role_guest = await Role.findOne({
            where: {
                role: 'guest'
            }
        });

        return Promise.all([
            User.create({
                name:"she",
                lastname:"cas",
                username:"se",
                email:"shee@ver.veas11",
                password:bcrypt.hashSync("123456",+authConfig.rounds),
            }).then(async user => {

                await user.addRole(role_user);
                await user.reload();

                res.json({
                    user: user,
                });
            }),

            User.create({
                name:"and",
                lastname:"re",
                username:"andr",
                email:"and@ver.veas11",
                password:bcrypt.hashSync("123456",+authConfig.rounds),
            }).then(async user => {

                await user.addRole(role_admin);
                await user.reload();

                res.json({
                    user: user,
                });
            }),

            User.create({
                name:"sil",
                lastname:"sila",
                username:"silq",
                email:"sil@ver.veas11",
                password:bcrypt.hashSync("123456",+authConfig.rounds),
            }).then(async user => {

                await user.addRole(role_guest);
                await user.reload();

                res.json({
                    user: user,
                });
            }),

            User.create({
                name:"ahr",
                lastname:"ahrq",
                username:"aheqq",
                email:"ahq@ver.veas11",
                password:bcrypt.hashSync("123456",+authConfig.rounds),
            }).then(async user => {

                await user.addRole(role_supervisor);
                await user.reload();

                res.json({
                    user: user,
                });
            }),

            User.create({
                name:"ahr",
                lastname:"ahrq",
                username:"aheqq",
                email:"a@a.a",
                password:bcrypt.hashSync("123456",+authConfig.rounds),
            }).then(async user => {

                await user.addRole(role_supervisor);
                await user.reload();

                res.json({
                    user: user,
                });
            }),

        ]

    )},
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {}),
        await queryInterface.bulkDelete('roles', null, {})
    }
};