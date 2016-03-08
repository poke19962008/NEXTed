var express = require('express');
var router = express.Router();

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

module.exports = router;
