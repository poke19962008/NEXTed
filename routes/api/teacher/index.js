/**
** Teacher API: index.js
** Author: SAYAN DAS
**/

// Child Routers
var updateRouter = require('./update');

// Teacher & TeacherDetail models
var Teacher = require('./model').teacher;
var TeacherDetail = require('./model').teacherDetail;

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
** Query -> ID & password
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
** LOGOUT
** RESPONSE
** Success -> { status: succcess }
** Internal Server Error -> { status; ise }
**/
router.get('/logout', function (req, res){
  req.session.destroy(function (err){
    if(err) res.send({ status: 'ise' });
    else res.send({ status: 'success'});
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
      fName: 'Sayan',
      mName: '',
      lName: 'Das'
    },
    password: '123test',
  });

  var teacherDetail =new TeacherDetail({
     teacherID: '123testID',
     schoolID: '123SchoolID',
     bio: "I am in my Junior year of college in Computer Science and Engineering and looking forward to Internships at a Company where I can work on my skills and do the tasks given to me with my skills and in the pursuit learn many things from Advisers, Seniors and Mentors. I have a strong passion to work on data which is generated all around by different sources. I have this ability to adapt and learn from new environment as quickly as possible.",
     designation: "HOD",
     personalInfo: {
       dateOfBirth: {
         date: 16,
         month: 12,
         year: 1996
       },
       address: "Qno. 69/Type IV/ Sector VA, BHEL Society",
       email: "poke19962008@gmail.com",
       blog: "sayandas.xyz",
       phone: "9176046XXX"
     },
     skills: [{
         skill: "C++",
         counter: 1,
         endorser: [{
             name: {
                 fName: "Sanjib",
                 mName: "Kr.",
                 lName: "Das"
             },
             timeStamp: 1234123,
             ID: {
               IDtype: "teacher",
               ID: "123testID"
             },
             schoolID: "123test12",
         }]
     }],
     qualification: [{
       degree: "ACM ICPC",
       course: "Provincial competitive programming contest.",
       institute: "IIT B"
     }],
     award: [{
         title: "Table Tennis Gold",
         description: "Inter School Table Tennis competition",
         date: {
             date: 12,
             month: 12,
             year: 2013
         }
     }],
     experience: [{
         title: "Table Tennis Gold",
         description: "Inter School Table Tennis competition",
         date: {
             date: 12,
             month: 12,
             year: 2013
         }
     }],
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
