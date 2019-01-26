/**
 * Created by sirius on 10/13/17.
 */
const Sequelize     = require('../../setup/sequelize.js');
const User = require('../users/user.model.js');
const Barrier = require('../barriers/barrier.model.js');
const UsersBarriersSchema = require('./relation.schema');

const UsersBarriers = Sequelize.define('UsersBarriers', UsersBarriersSchema);

User.belongsToMany(Barrier, { through: 'UsersBarriers' });
Barrier.belongsToMany(User, { through: 'UsersBarriers' });

/*
UsersBarriers.sync({force: true})
    .then(() => {
    console.log('UsersBarriers are synched...');
        return UsersBarriers.create({

				});
    });
*/

module.exports = UsersBarriers;