/**
 * Created by sirius on 10/11/17.
 */

const mosca = require('mosca');
const chalk = require('chalk');
const authenticate = require('./mqtt_auth').authenticate;
const authorizePublish = require('./mqtt_auth').authorizePublish;
const authorizeSubscribe = require('./mqtt_auth').authorizeSubscribe;
const settings = {
  port: 1883,
  http: {
    port: 1884,
    bundle: true,
    static: './'
  }
};
const server = new mosca.Server({});
/*---------------------------------------*/

// fired when a client connects
server.on('clientConnected', function(client) {
    console.log(chalk.cyanBright('Client connected \t->\t\t' + client.id));
});

// fired when a message is received
server.on('published', function(packet) {
    console.log(chalk.redBright('Message \t\t->\t\t' + packet.payload.toString('utf8')));
    console.log(chalk.blueBright('MessageID \t\t->\t\t' + packet.messageId));
    console.log(chalk.yellowBright('Publish Topic \t\t->\t\t' + packet.topic));
    console.log(chalk.gray('-----------------------------------------------------------------'));
});

// fired when a client disconnects
server.on('clientDisconnected', function(client) {
    console.log(chalk.magenta('Client Disconnected \t->\t\t' + client.id));
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    server.authenticate = authenticate;
    server.authorizePublish = authorizePublish;
    server.authorizeSubscribe = authorizeSubscribe;
    console.log(chalk.green('Mosca server is up and running'));
}

module.exports = server;
