'use strict';
// set up ========================
let express  = require('express'),
    cookieParser = require("cookie-parser"),
    morgan = require('morgan'),                     // log requests to the console (express4)
    bodyParser = require('body-parser'),            // pull information from HTML POST (express4)
    methodOverride = require('method-override'),    // simulate DELETE and PUT (express4)
    gateRouter = require('../routes/gatesRoute.js'),
    //session = require('express-session'),
    //passport = require('passport'),
    //LocalStrategy = require('passport-local'),
    // Initialize express app =====
    app = express(); // create our app w/ express

//configs =====================
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(cookieParser());                                        // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
//app.use(compression());
//app.use(passport.initialize());
    // Add headers
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
app.use('/gate',gateRouter);
//app.use('/user',userRoutes);
module.exports = app;
