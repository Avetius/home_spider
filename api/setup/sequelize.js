/**
 * Created by sirius on 5/15/17.
 */

const Sequelize = require('sequelize');
const db = require('../config/db.js')[devMode];

const sequelize = new Sequelize(db.dbName,db.username,db.password,{ // alternative way sequelize = new Sequelize(connectionString); const connectionString = db.dbType+'://'+db.username+':'+db.password+'@'+db.hostname+':'+db.port+'/'+db.dbName; // like 'mysql://root:root@localhost:3306/ralf_jos10'
    host: db.hostname,
    dialect: db.dbType,
    logging: false, // print in console log when true
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: true,     // Do Not add created_at and updated_at
        //freezeTableName: true, // force not to change table name to multiple
        underscored: true      // use snake_case rather than camelCase
    }
});

sequelize
    .authenticate()
    .then((err) => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    });

// heroku pg:credentials
module.exports = sequelize;
