/**
** Student API: index.js
** Author: SAYAN DAS
**/

var updateRouter = require('./update');

// Student & StudentDetail models
var Student = require('./model').student;
var StudentDetail = require('./model').studentDetail;

var express = require('express');
var router = express.Router();

router.use(function (req, res, next){
  var type = req.session.IDType;

  if(type != 'student' && type != undefined) res.send({ 'isValidUser': false });
  else next();
});

function isLogedIn (req, res, next){
  var type = req.session.IDType;
  var ID = req.session.ID;

  if(type == undefined && ID == undefined) res.send({ 'sessionExpired': true });
  else next();
};


router.get('/', function(req, res){
  res.send('Welcome to Student API');
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
    var student = new Student({
      'studentID': ID,
      'password': password
    });

    student.verifyStudent(function(err, doc){
      if(doc.length == 0) res.send({ 'status': 'failed' });
      else if(doc.length == 1) {
        student.updateLoginTS(function (err, doc){
          if(err) { res.send({ 'status': 'ise' }); res.end(); }
        });
        var tStamp = doc[0].loggedIn;

        req.session.IDType = "student";
        req.session.ID = ID;

        res.send({ 'status': 'success', 'tStamp': tStamp });
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

  var studentD = new StudentDetail({
    'studentID': req.session.ID
  });

  if(skill == undefined || skill == "") {
    res.send({'status': 'params missing'});
    res.end();
  }

  studentD.countSkills(skill, function (err, count){
    var found = false;

    if(count != 0) found = true;

    if(found) res.send({'status': 'skill exist'});
    else{
      studentD.addSkill(skill , function(err, doc){
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
**/
router.get('/endorse', isLogedIn, function(req, res){

});


/**
** UPDATE
**/
router.use('/update', updateRouter);


/** CREATE DUMMY USERS (GET)
** Testing Purpose Only
**/
router.get('/createDummyUser', function (req, res){
  var student = new Student({
    studentID: '123testID',
    schoolID: '123SchoolID',
    name: {
      fName: 'Sayan',
      mNae: '',
      lName: 'Das'
    },
    password: '123test',
  });

  var studentDetail =new StudentDetail({
     studentID: '123testID',
     schoolID: '123SchoolID',
     bio: "I am in my Junior year of college in Computer Science and Engineering and looking forward to Internships at a Company where I can work on my skills and do the tasks given to me with my skills and in the pursuit learn many things from Advisers, Seniors and Mentors. I have a strong passion to work on data which is generated all around by different sources. I have this ability to adapt and learn from new environment as quickly as possible.",
     designation: {
       class_: "X",
       section: "D"
     },
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
     competition: [{
       title: "ACM ICPC",
       description: "Provincial competitive programming contest.",
       date: {
         date: 14,
         month: 12,
         year: 2014
       }
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
  });


  studentDetail.save(function (err){
    if(err) console.log(err);
  });
  student.save(function(err){
    if(err) console.log(err);
  });

  res.send('Added Successfully');
});

module.exports = router;
