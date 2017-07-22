/**
 * Created by sirius on 7/20/17.
 */
const Sequelize   = require('sequelize');
module.exports = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    ownerId:{

    },
    adminIds:{

    },
    nodeIds:{

    },
    userIds:{

    }
};