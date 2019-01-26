/**
 * Created by sirius on 10/17/17.
 */
const nodemailer    = require('nodemailer');
const chalk         = require('chalk');
const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'barriercontroller@gmail.com',
        pass: 'pic18f4553'
    }
});

module.exports = mailer;
/*
 let mailOptions = { // test mail
 from: 'barriercontroller@gmail.com',
 to: 'avet.sargsyan@gmail.com',
 subject: 'Testing Node.js mailsender',
 html: '<h1>Please confirm registration ;)</h1><p>That was easy!</p><a href="heroku.com"></a>'
 };

 mailer.sendMail(mailOptions, (err, info) => { // sending test mail
 if (err) {
 console.log(chalk.red('Failed to send mail -> '+err));
 } else {
 console.log(chalk.greenBright('Email sent: '+info.response));
 }
 });
 */