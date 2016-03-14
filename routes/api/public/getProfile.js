var express = require('express');
var router = express.Router();

var Teacher = require('../teacher/model').teacher;
var TeacherDetail = require('../teacher/model').teacherDetail;
var Student = require('../student/model').student
var StudentDetail = require('../student/model').studentDetail;

router.get('/', function(req, res){
  res.send("Welcome To Get Profile Router");
});


/**
** Students Get Profile
** QUERY: ID
** RESPONSE:
** Success: bio designation personalInfo skills competition award name studentID
** Failed
**/
router.get('/student', function (req, res){
  var id;
  var data = {};
  console.log(req.session);
  try{
    if(req.query.ID != undefined)
      id = req.query.ID;
    else throw true;

    data.studentID = id;
    Student.findOne({
      studentID: id
    }, function(err, doc){
      if(err || doc == undefined) throw true;
      var name = doc.name;

      StudentDetail.findOne({
        studentID: id
      },
      "bio designation personalInfo skills competition award", function(err, doc){
        if(err || doc == undefined) throw true;
        data = doc;
        data.name = name;
        console.log(data);
        res.send(data);
      });
    });
  }catch(e){
    res.send({status: 'inv. parmater.'})
  }
});



module.exports = router;
