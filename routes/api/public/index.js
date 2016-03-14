var express = require('express');
var router = express.Router();

var getProfileRouter = require('./getprofile');

var Teacher = require('../teacher/model').teacher;

router.get('/', function (req, res){
  res.send('Welcome to Public API');
});

router.get('/limitedSearch', function (req, res){
  var teacher = new Teacher();
  var result = {};
  teacher.limitedSearch(function (err, doc){
    result['teacher'] = doc;
    res.send(result);
  });
});

router.use('/getProfile', getProfileRouter);

module.exports = router;
