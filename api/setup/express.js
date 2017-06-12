/**
 * Created by sirius on 5/12/17.
 */
const express           = require('express');
const morgan            = require('morgan');                            // logger
const bodyParser        = require('body-parser');                       // add req.body object to req
const methodOverride    = require('method-override');                   // simulate DELETE and PUT
const compression       = require('compression');                       // compress req & res to gzip (increases speed and security)
const helmet            = require('helmet');

const userRoutes        = require('../routes/users/usersRoutes.js');
const gateRoutes        = require('../routes/gates/gatesRoutes.js');
const passport          = require('./auth.js').passport;
const validate          = require('../validation/user.validator.js');   //for ajv validator -> require('../validation/user.validator.js'); require('../validation/expressValidator');

let app                 = express();

//================================ Configs =========================================================================================================
app.use(express.static(__dirname + '../../public'));                    // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                                 // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));                    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                             // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));         // parse application/vnd.api+json as json
app.use(methodOverride());
//app.use(compression());

//================================ Helmet =========================================================================================================
// Use helmet to secure Express headers
//app.use(helmet.xframe());
app.use(helmet.xssFilter());
//app.use(helmet.nosniff());
//app.use(helmet.ienoopen());
app.disable('x-powered-by');

//=============================== Add Headers ======================================================================================================
app.use(function (req, res, next) {
    /*Website you wish to allow to connect*/
    res.setHeader('Access-Control-Allow-Origin', '*');
    /*Request methods you wish to allow*/
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    /*Request headers you wish to allow*/
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    /*Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)*/
    res.setHeader('Access-Control-Allow-Credentials', true);
    /*Pass to next layer of middleware*/
    next();
});
//=============================== Add Routes =======================================================================================================
app.use('/', userRoutes);
app.use('/', gateRoutes);
//==========================Routes for 404, 500=======================================================================================================

app.use(function(err, req, res, next) {
    // If the error object doesn't exists
    if (!err) return next();

    // Log it
    console.error(err.stack);

    // Error page
    res.status(500).render('500', {
        error: err.stack
    });
});

// Assume 404 since no middleware responded
app.use(function(req, res) {
    res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not Found'
    });
});
//=============================== Add Passport ===============================
app.use(passport.initialize());
//=============================== Add Form Validation ========================
// ajv middleware ->
app.use(validate());
module.exports = app;