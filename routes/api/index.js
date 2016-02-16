var express = require("express");
var router = express.Router();

// API Routers Declaration
var teacher = require('./teacher/index');

// API request logger
router.use(function(req, res, next) {
  /**
  ** TODO: Change to Winston logger during production stage
  **/
    console.log(req.method, "/api" + req.url);
    next();
});

// API Router Middleware
router.use('/teacher', teacher);

// API request routing
router.get('/', function(req, res){
  res.send('Welcome to API module.');
});

module.exports = router;
