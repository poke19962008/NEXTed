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
var mongoConfig = require('./config').mongo;

var app = express();

// Routes Declaration
var api = require("./routes/api/index.js");

// Session/Cookie Middlewares
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({        // Session configs
  secret: sessConfig.key,
  saveUninitialized: true,
  resave: true,

  cookie: {                  // Cookie configs
    expires: new Date(Date.now() + sessConfig.expiration),
    maxAge: sessConfig.expiration,
  },

  store: new mongoStore({     // Mongo Store configs
    url: mongoConfig.uri,
    autoRemove: 'native', // Remove all the expired sessions
    collection: 'session', // Collection name
  }),
}));

// Router Middlewares
app.use("/api", api);


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = process.env.IP || "0.0.0.0";
  var port = process.env.PORT || 3000;
  var preprocess = require('./preprocess');

  console.log("Listening at ", addr + ":" + port);

  // Update skill sets
  preprocess.addSkills();
});
