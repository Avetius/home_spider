let Sequelize = require('sequelize'),
    db = require('./../config/db.js'),
    sequelize = new Sequelize(db.dbName,db.username,db.password,{
        host: db.hostname,
        dialect: db.dbType,
        logging: false, // print in console log when true
        define: {
            timestamps: true,     // Do Not add created_at and updated_at
            freezeTableName: true, // force not to change table name to multiple
            underscored: true      // use snake_case rather than camelCase
        }
    });

    sequelize
        .authenticate()
        .then((err) => {
            if(err){
                console.log('Error : ', err);
            }else{
                console.log('Connection has been established successfully.');
            }
        });
// heroku pg:credentials
module.exports = sequelize;
