/**
 * Created by sirius on 5/12/17.
 */
const express           = require('express');
const morgan            = require('morgan');                            // logger
const bodyParser        = require('body-parser');                       // add req.body object to req
const methodOverride    = require('method-override');                   // simulate DELETE and PUT
const compression       = require('compression');                   // compress req & res to gzip (increases speed and security)
const helmet            = require('helmet');
const path              = require('path');
const routes            = require('../routes/index.js');
const response          = require("../helpers/response.js");
const app               = express();
const pubDir            = path.join(__dirname , '../../public/v3');

//================================ Configs =========================================================================================================
app.use(express.static(pubDir));// set the static files location /public/img will be /img for users
/*app.set('view engine', 'ejs');
app.set('views', path.join( __dirname, '../../views'));*/
app.use(morgan('dev'));                                                 // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));                    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                             // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));         // parse application/vnd.api+json as json
app.use(methodOverride());
//================================ Helmet =========================================================================================================
// Use helmet to secure Express headers
//app.use(helmet.xframe());
//app.use(helmet.nosniff());
//app.use(helmet.ienoopen());
//app.use(compression());
app.use(helmet.xssFilter());
app.disable('x-powered-by');
//=============================== Add Headers ======================================================================================================
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');/*Website you wish to allow to connect*/
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); /*Request methods you wish to allow*/
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); /*Request headers you wish to allow*/
    res.setHeader('Access-Control-Allow-Credentials', true); /*Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)*/
    next(); /*Pass to next layer of middleware*/
});
//=============================== Add Routes ================================================================
// todo remove all routes and leave only 2 one for static file server 2nd for dynamic starting with /api
app.use('/api', routes);
app.get('/*', function(req,res){ // /.+/
    res.sendFile(pubDir+'/index.html');
    // load the single HTML file (react or angular will handle the page changes on the front-end)
});
//==========================Routes for 404, 500===============================================================
// Assume 404 since no middleware responded
app.use(function(req, res) {
    response(res, 404, {url: req.originalUrl, error: 'Page not found'},"Page not found");
});
app.use(function(err, req, res, next) {
    if (!err) return next();
    console.error(err.stack);
    response(res, 500, {url: req.originalUrl, error: 'Internal Server Error'},"Internal Server Error");
});

module.exports = app;