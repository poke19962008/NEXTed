var express = require("express");
var router = express.Router();

// API Child Routers Declaration
var teacher = require('./teacher/index');
var public_  = require('./public/index');
var student = require('./student/index');
var competition = require('./competition/index');

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
router.use('/public', public_);
router.use('/student', student);
router.use('/competition', competition);

// API request routing
router.get('/', function(req, res){
  res.send('Welcome to API module.');
});

module.exports = router;
