const fs                = require('fs');
const http              = require('http');
const https             = require('https');
const chalk             = require("chalk");

const privateKey        = fs.readFileSync('./sslcert/certificate.key', 'utf8');
const certificate       = fs.readFileSync('./sslcert/certificate.crt', 'utf8');
const app               = require('./api/setup/express.js');
const credentials       = {key: privateKey, cert: certificate};

const httpServer        = http.createServer(app);
const httpsServer       = https.createServer(credentials, app);

const broker            = require('./api/broker/mosca.js');
const db                = require("./api/config/db.js");

broker.on('clientConnected', function(client) {
    console.log('client connected is ', client.id);
});

// fired when a message is received
broker.on('published', function(packet) {
    console.log('Published is ', packet);
    console.log('Client is ', packet.payload);
});

// fired when the mqtt server is ready
broker.on('ready', () => {
    console.log('Mosca server is up and running');
});

//httpPort    = process.env.PORT || 80,
let httpsPort   = process.env.PORT || 8088;
// listen (start app with node server.js) ==================================
//httpServer.listen(httpPort);
httpsServer.listen(httpsPort);

console.log(chalk.red('home_spider\t\t\t started'));
console.log(chalk.blue('Port:\t\t\t\t ' + httpsPort));
console.log(chalk.yellow('Database:\t\t\t ' + db.dbName));
