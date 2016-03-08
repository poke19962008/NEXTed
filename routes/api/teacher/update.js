/**
** Update Router: update.js
** Author: SAYAN DAS
** NOTE: All the request are POST requests
** and Header: application/json
**/


var router = require('express').Router();

// All the Teacher models
var Teacher = require('./model').teacher;
var TeacherDetail = require('./model').teacherDetail;

// Checks if person is logged in.
var isLoggedIn = function isLogedIn (req, res, next){
  var type = req.session.IDType;
  var ID = req.session.ID;

  if(type == undefined && ID == undefined) res.send({ 'sessionExpired': true });
  else next();
};

router.get('/', isLoggedIn, function(req, res){
  res.send('Welcome to Teacher Update Module');
});


/**
** SUBJECT UPDATE (POST)
** PARAMETERS -> add, remove
** BODY -> {
    subjects: [{
      subjectCode: String,
      subName: String
    }]
  }
** RESPONSE
** Success -> { status: success }
** Internal Server Error -> { status: ise }
** Invalid Routing -> { status: inv. routing }
**/
router.post('/:id/subjects', isLoggedIn, function (req, res){
  var opr = req.params.id;
  var teacherID  = req.session.ID;
  var data = req.body;
  var verified = false;

  // Body Verification
  if(data.subjects != undefined){
    verified = true;
    for (var i = 0; i < data.subjects.length; i++) {
      var subject = data.subjects[i];

      if(subject.subjectCode == undefined ||
         subject.subName == undefined){
           verified = false;
           break;
         }
    }
  }

  // Update Process
  var teacherDetail = new TeacherDetail({
    'teacherID': teacherID
  });
  var subjects = data['subjects'];

  if(verified){
    if(opr == "add")
      for (var i = 0; i < subjects.length; i++) {
        teacherDetail.addSubject(subjects[i], function (err, doc){
          if(err == "already exist") res.send({ status: err});
          else if(err) res.send({ status: 'ise' });
          else res.send({ status: 'success' });
        });
      }
    else if(opr == "remove")
      for (var i = 0; i < subjects.length; i++) {
        console.log(subjects[i]);
        teacherDetail.removeSubjects(subjects[i], function (err, doc){
          if(err == "does not exist") res.send({ status: err });
          else if(err) res.send({ status: 'ise' });
          else res.send({ status: 'success' });
        });
      }
    else res.send({ status: 'inv. routing' });
  }

});

router.post('/email', isLoggedIn, function (req, res){
  var teacherID  = req.session.ID;
  var data = req.body;
  var verified = false;

  // Body Verification
});

router.post('/qualification', isLoggedIn, function (req, res){

});

router.post('/experience', isLoggedIn, function (req, res){

});

router.post('/awards', isLoggedIn, function (req, res){

});

module.exports = router;
