let broker = require('../../broker/mosca');

exports.action = (req, res, next) => {
    let message = {
        topic: 'Light/sub',
        payload: req.params.number, // or a Buffer
        qos: 0, // 0, 1, or 2
        retain: false // or true
    };
    broker.publish(message, function() {
        console.log('Light/sub -> '+req.params.number+' sent');
        res.send('OK');
    });
};