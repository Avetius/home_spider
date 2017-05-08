let broker = require('../broker/mosca');

exports.action = (req, res) => {
    let message = {
        topic: '/Gate/sub',
        payload: toString(req.params.number), // or a Buffer
        qos: 0, // 0, 1, or 2
        retain: false // or true
    };

    broker.publish(message, function() {
        console.log('/Gate/sub -> '+req.params.number+' sent');
        res.send('OK').sendStatus(200);
    });
};