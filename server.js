global.devMode          = require('./api/config/env');
const chalk             = require("chalk");
const fs                = require('fs');

const db                = require("./api/config/db.js")[devMode];
const app               = require('./api/setup/express.js');
const broker            = require('./api/broker/mosca');
const mailer            = require('./api/helpers/mailSender');

let port;
if(devMode === "heroku"){
    port                    = process.env.PORT || 8088;
    const http              = require('http');
    const httpServer        = http.createServer(app);
    broker.attachHttpServer(httpServer);
    httpServer.listen(port); // httpPort, 'localhost'
}else{
    port                    = process.env.PORT || 8089; // 8089
    /*const privateKey        = fs.readFileSync('./sslcert/certificate.key', 'utf8');
    const certificate       = fs.readFileSync('./sslcert/certificate.crt', 'utf8');
    const credentials       = {key: privateKey, cert: certificate};
    const https             = require('https');*/
    const http              = require('http');
    const httpsServer       = http.createServer(app); // https.createServer(credentials, app);
    httpsServer.listen(port);
}

//==================================
console.log(chalk.red('home_spider\t\t\t started'));
console.log(chalk.blue('Port:\t\t\t\t ' + port));
console.log(chalk.yellow('Database:\t\t\t ' + db.dbName));
