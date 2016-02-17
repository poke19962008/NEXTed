var Teacher = require('./model').teacher;
var TeacherDetail = require('./model').teacherDetail;

var express = require('express');
var router = express.Router();

router.get('/', function (req, res){
  res.send('Welcome to teacher.');
});

module.exports = router;
