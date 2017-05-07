let broker = require('api/broker'),
    app = require('config/express'),



broker.on('clientConnected', function(client) {
    console.log('client connected is ', client.id);
});

// fired when a message is received
broker.on('published', function(packet) {
    console.log('Published is ', packet);
    console.log('Client is ', packet.payload);
});

broker.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}

