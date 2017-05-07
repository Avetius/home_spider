let mosca = require('mosca'),
    settings = {port: 1883},
    broker = new mosca.Server(settings);

module.exports = broker;



