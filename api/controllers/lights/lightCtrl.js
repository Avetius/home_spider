/**
 * Created by sirius on 7/12/17.
 */
let broker = require('../../broker/mosca');

exports.action = (req, res) => {
    let message = {
        topic: 'Light/sub',
        payload: req.params.action, // or a Buffer
        qos: 0, // 0, 1, or 2
        retain: false // or true
    };
    broker.publish(message, function() {
        console.log('Light/sub -> '+req.params.action+' sent');
        res.send('OK');
    });
};