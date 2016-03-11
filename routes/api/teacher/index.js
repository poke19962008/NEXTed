/**
** Teacher API: index.js
** Author: SAYAN DAS
**/

var Teacher = require('./model').teacher;
var TeacherDetail = require('./model').teacherDetail;

var updateRouter = require('./update');

var express = require('express');
var router = express.Router();


/**
  Session Details:
    IDType => 'teacher'
    ID => teacherID

  Cookies:
   None
*/

// Teacher Router middleware checks if IDType is valid
router.use(function (req, res, next){
  var type = req.session.IDType;
  console.log(req.session);
  if(type != 'teacher' && type != undefined ) res.send({ 'isValidUser': false });
  else next();
});


// Checks if person is logged in.
function isLogedIn (req, res, next){
  var type = req.session.IDType;
  var ID = req.session.ID;

  if(type == undefined && ID == undefined) res.send({ 'sessionExpired': true });
  else next();
};


router.get('/', function (req, res){
  res.send('Teacher\'s API Module');
});


/**
** LOGIN (GET)
** Query -> teacherID & password
** RESPONSE
** Success -> { status: success }
** Verification Failure -> { status: failed }
** Internal Server Error -> { status: ise }
**/
router.get('/login', function (req, res, next){

  var password = req.query.password;
  var ID = req.query.ID;

  // TODO: Encrypt when database is encrypted
  // password = auth.encrypt(password);
  var teacher = new Teacher({
    'teacherID': ID,
    'password': password
  });

  teacher.verifyTeacher(function(err, doc){
    var tStamp;

    if(doc.length == 0) res.send({ 'status': 'failed' });
    else if(doc.length == 1) {
      if(doc[0].loggedIn == -1) {
        teacher.updateLoginTS(function(err, doc){
          if(err) { res.redirect('/login'); res.end(); }
          else tStamp = -1;
        });
      }else tStamp = doc[0].loggedIn;

      req.session.IDType = "teacher";
      req.session.ID = ID;

      res.send({ 'status': 'success', 'tStamp':  tStamp});
    }
    else res.send({ 'status': 'ise' });
  });

});



/**
** ADD SKILL (POST)
** TODO: Verify With In Built Skill data sets
** BODY -> {
  skill: String
}
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

  if(skill == undefined || skill == "") {
    res.send({'status': 'params missing'});
    res.end();
  }

  teacherD.countSkills(skill, function (err, count){
    var found = false;

    if(count != 0) found = true;

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
** ENDORSE (GET)
** QUERY -> endorseeID, skill
** RESPONSE
** Invalid Routing -> { status: inv routing }
** Success -> { status: success }
** Permission Denied -> { status: permissionDenied }
** Internal Server Error -> { status: ise }
** TODO: Skill regex Verification
**       Check multiple endorsement from one user
**/
router.get('/endorse', isLogedIn, function (req, res){
  var endorseeID = req.session.ID;
  var endorserID = req.query.endorseeID;
  var skill = req.query.skill;

  var teacherDetail = new TeacherDetail({
    'teacherID': endorseeID
  });
  var teacher = new Teacher({
    'teacherID': endorserID
  });

  teacher.getDetails(function (err, endorser){
      teacherDetail.endorse(endorser, skill, function (err, doc){
        if(err == 'already endorsed') res.send({ status: err });
        else if(err) res.send({ status: 'ise'});
        else if(doc == 'already endorsed')
          res.send({status: 'already endorsed'});
        else res.send({ status: 'success' });
      });
  });

});


/**
** UPDATE
**/
router.use('/update', updateRouter);


/**
** CREATE DUMMY USERS (GET)
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
router.get('/test/:id', function (req, res){
  res.send(req.params.id);
});

module.exports = router;
