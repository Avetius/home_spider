/**
 * Created by sirius on 10/13/17.
 */
const Sequelize   = require('sequelize');
module.export = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: Sequelize.STRING
};