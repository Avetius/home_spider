/**
 * Created by sirius on 10/12/17.
 */
const Sequelize   = require('sequelize');
module.exports = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name : {type: Sequelize.STRING},
    password : {type: Sequelize.STRING},
    willTopic : {type: Sequelize.STRING},
    subTopic : {type: Sequelize.STRING},
    button0name : { type: Sequelize.STRING},
    button1name : { type: Sequelize.STRING},
    button2name : { type: Sequelize.STRING},
    button3name : { type: Sequelize.STRING},
    longitude: { type: Sequelize.STRING},
    latitude: { type: Sequelize.STRING},
    altitude: { type: Sequelize.STRING}
};