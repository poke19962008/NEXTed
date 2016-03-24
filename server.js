/***
** Contains all the express app configurations
** and Server start codes.
**
** APP CONFIG DETAILS
** Port: 3000 || process.env.IP
** IP: localhost || process.env.IP
**
** Author: SAYAN DAS & SAURABH GARG
**/

var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var sessConfig = require('./config').session;
var bodyParser = require('body-parser');

// Mongoose Connection
var mongoose = require('mongoose');
var mongoConfig = require('./config').mongo.uri;
mongoose.connect(mongoConfig);
exports.mongoose = mongoose;

var app = express();

// Routes Declaration
var api = require("./routes/api/index.js");
var getProfile = require("./routes/renderProfile");

// Session/Cookie Middlewares
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());  // JSON encoded body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Set the View Engine
app.use(session({        // Session configs
  secret: sessConfig.key,
  saveUninitialized: true,
  resave: true,

  cookie: {                  // Cookie configs
    expires: new Date(Date.now() + sessConfig.expiration),
    maxAge: sessConfig.expiration,
  },

  store: new mongoStore({     // Mongo Store configs
    url: mongoConfig,
    autoRemove: 'native', // Remove all the expired sessions
    collection: 'session', // Collection name
  }),
}));

// Router Middlewares
app.use("/profile", getProfile);
app.use("/api", api);

module.exports = app;
