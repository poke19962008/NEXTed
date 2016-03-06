/**
** Teacher API: index.js
** Author: SAYAN DAS
**/

/**
  Session:
  IDType => 'teacher'
  ID => teacherID
*/

var Teacher = require('./model').teacher;
var TeacherDetail = require('./model').teacherDetail;

var express = require('express');
var router = express.Router();


// Teacher Router middleware checks if IDType is valid
router.use(function (req, res, next){
  var type = req.session.IDType;

  if(type != 'teacher' && type != undefined ) res.send({ 'isValidUser': false });
  else next();
});


// Checks if person is logged in.
function isLogedIn (req, res, next){
  var type = req.session.IDType;
  var ID = req.session.ID;

  if(type != "teacher") res.send({ 'isValidUser': false });
  else if(type == undefined && ID == undefined) res.send({ 'sessionExpired': true });
  else next();
};


router.get('/', function (req, res){
  res.send('Teacher\'s API Module');
});


/**
** LOGIN
** Parameters -> teacherID & password
** RESPONSE
** Success -> { status: success }
** Verification Failure -> { status: failed }
** Internal Server Error -> { status: ise }
**/
router.get('/login', function (req, res, next){
  console.log('in /login');

  var password = req.query.password;
  var ID = req.query.ID;

  // TODO: Encrypt when database is encrypted
  // password = auth.encrypt(password);
  var teacher = new Teacher({
    'teacherID': ID,
    'password': password
  });

  teacher.verifyTeacher(function(err, doc){
    if(doc.length == 0) res.send({ 'status': 'failed' });
    else if(doc.length == 1) {
      req.session.IDType = "teacher";
      req.session.ID = ID;

      res.send({ 'status': 'success' });
    }
    else res.send({ 'status': 'ise' });
  });

});



/**
** ADD SKILL
** TODO: Verify With In Built Skill data sets
** RESPONSE
** Success -> { status: success }
** Parameters Missing -> { status: params missing }
** Internal Server Error -> { status: ise }
**/
router.post('/addSkill', isLogedIn, function (req, res){
  var skill = req.body.skill;

  var teacherD = new TeacherDetail({
    'teacherID': req.session.ID
  });

  teacherD.getSkills(function (err, doc){
    var skills = doc.skills;
    var found = false;

    if(skill == undefined || skill == "") {
      res.send({'status': 'params missing'});
      res.end();
    }

    for (var i = 0; i < skills.length; i++) {
      if(skills[i].skill == skill) found = true;
    }

    if(found) res.send({'status': 'skill exist'});
    else{
      teacherD.addSkill(skill , function(err, doc){
        if(err) res.send({'status': 'ise'});
        else res.send({'status': 'success'});
      });
    }
  });
});



/**
** ENDORSE
** Parameters -> endorserID, skill
** RESPONSE
** Success -> { status: success }
** Permission Denied -> { status: permissionDenied }
** Internal Server Error -> { status: ise }
** TODO: Skill regex Verification
**       Check multiple endorsement from one user
**/
router.get('/endorse', isLogedIn, function (req, res){
  var endorseeID = req.session.ID;
  var idType = req.session.IDType;
  var endorserID = req.query.endorseeID;
  var skill = req.query.skill;

  if(idType == "teacher"){
    var teacherDetail = new TeacherDetail({
      'teacherID': endorseeID
    });
    var teacher = new Teacher({
      'teacherID': endorserID
    });

    teacher.getDetails(function (err, endorser){
      console.log(endorser);
      teacherDetail.endorse(endorser, skill, function (err, doc){
        console.log(doc);
        if(err) res.send({ status: 'ise' });
        else res.send({ status: 'success' });
      });
    });
  }else res.send({ status: 'permissionDenied'});

});


router.get('/changePasword', isLogedIn, function (req, res){

});


router.get('/updateClasses', isLogedIn, function (req, res){

});


/**
** CREATE DUMMY USERS
** Testing Purpose Only
**/
router.get('/createDummyUser', function (req, res){
  var teacher = new Teacher({
    teacherID: '123testID',
    schoolID: '123SchoolID',
    name: {
      fName: 'Sayn',
      mNae: 'Kr.',
      lName: 'Das'
    },
    classes: [{
      class_: 'X'
    }],
    password: '123test',
  });

  var teacherDetail =new TeacherDetail({
     teacherID: '123testID',
     schoolID: '123SchoolID'
  });


  teacherDetail.save(function (err){
    if(err) console.log(err);
  });
  teacher.save(function(err){
    if(err) console.log(err);
  });

  res.send('Added Successfully');
});

/**
**  Testing purpose only.
**/
// router.get('/test', function (req, res){
//
//   var teacher = new Teacher({
//     teacherID: '123test',
//     schoolID: '123School',
//     name: {
//       fName: 'sensei',
//       mNae: 'Kr.',
//       lName: 'Das'
//     },
//     classes: [{
//       class_: 'X'
//     }],
//     password: '123test',
//   });
//
//   teacher.save(function(err){
//     if(err) console.log(err);
//   });
//
//   res.send(req.session);
// });

module.exports = router;
