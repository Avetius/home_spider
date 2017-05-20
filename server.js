let broker = require('./api/broker/mosca.js'),
    app = require('./api/setup/express.js'),
    chalk = require("chalk"),
    db = require("./api/config/db.js");

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

let preferedPort = 8088,
    port = process.env.PORT || preferedPort;
// listen (start app with node server.js) ==================================
app.listen(port);
console.log(chalk.red('home_spider\t\t\t started'));
console.log(chalk.blue('Port:\t\t\t '+port));
console.log(chalk.yellow('Database:\t\t\t '+db.dbName));

