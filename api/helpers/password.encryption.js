/**
 * Created by sirius on 5/20/17.
 */

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    hash : function (myPlaintextPassword = '', rounds = saltRounds) {
        return bcrypt.hash(myPlaintextPassword , rounds).then((hashed) => {
            return hashed;
        })
    },
    compare : function(myPlaintextPassword = '', hash = ''){
        return bcrypt.compare(myPlaintextPassword , hash).then((res) => {
            return res;
        })
    }
};