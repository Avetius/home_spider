/**
 * Created by sirius on 8/29/17.
 */
let broker = require('../../broker/mosca');

exports.action = (req, res, next) => {
    console.log("req.body -> ",req.body);
    console.log("req -> ",req);
};