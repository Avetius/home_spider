let broker = require('../../broker/mosca');

exports.action = (req, res, next) => {
    let message = {
        topic: 'Gate/sub',
        payload: req.params.number, // or a Buffer
        qos: 0, // 0, 1, or 2
        retain: false // or true
    };
    broker.publish(message, function() {
        console.log('Gate/sub -> '+req.params.number+' sent');
        res.send('OK');
    });
};

exports.renderUser = (req, res, next) => {
    res.send({
        user : req.user // get the user out of session and pass to template
    });
};

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};