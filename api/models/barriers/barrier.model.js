/**
 * Created by sirius on 10/12/17.
 */
const bcrypt        = require('bcrypt-nodejs');
const Sequelize     = require('../../setup/sequelize.js');
const BarrierSchema    = require('./barrier.schema.js');

const Barrier = Sequelize.define( 'Barrier', BarrierSchema);

Barrier.beforeCreate((barrier, options) => {
    barrier.password = bcrypt.hashSync(barrier.password);//, bcrypt.genSaltSync(8), null);
    return barrier;
});

Barrier.sync({force: true})
    .then(() => {
        /*return Barrier;*/
        return Barrier.create({
            name: "barrier_naftihayat1",
            password: 'pic16f84a',
            button0name: "Հանրապետության 58",
            button1name: "",
            button2name: "Վարդանանց 14/1 բացել",
            button3name: "Վարդանանց 14/1 փակել",
            willTopic: 'barrier_naftihayat1/will',
            subTopic: 'barrier_naftihayat1/sub',
            longitude: '40.176851',
            latitude: '44.518069',
            altitude: '3'
        })
});

module.exports = Barrier;