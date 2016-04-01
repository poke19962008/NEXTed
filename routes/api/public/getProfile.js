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
router.get('/student', function (req, res, next){
  var id;

  if(req.query.ID != undefined)
    id = req.query.ID;
  else throw true;

  Student.findOne({
    studentID: id
  }, "name", function(err, doc){
    if((err) || (doc == null)) {res.status(404).send("Inv. parameter");}
    else{
      var name = doc.name;

      StudentDetail.findOne({
        studentID: id
      },
      "studentID bio designation personalInfo skills competition award", function(err, doc){
        if(err || doc == undefined) throw true;
        doc.name = name;
        res.send({name: name, detail: doc});
      });
    }
  });

});

/**
** Teachers Get Profile
** QUERY: ID
** RESPONSE:
** Success: bio designation personalInfo skills competition award name studentID
** Failed
**/
router.get('/teacher', function (req, res){
  var id;
    if(req.query.ID != undefined)
      id = req.query.ID;
    else throw true;

    Teacher.findOne({
      teacherID: id
    }, "name", function(err, doc){
      if((err) || (doc == null)) {res.status(404).send("Inv. parameter");}
      else{
        var name = doc.name;

        TeacherDetail.findOne({
          teacherID: id
        },
        "teacherID bio designation personalInfo experience qualification award skills", function(err, doc){

          if(err || doc == undefined) throw true;
          doc.name = name;
          res.send({name: name, detail: doc});
        });
      }
    });

});

module.exports = router;
