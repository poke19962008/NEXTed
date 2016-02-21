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
** Verification Failure -> { status: success }
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


router.get('/update', isLogedIn, function (req, res){

});


router.get('/addSkill', isLogedIn, function(req, res){

});


router.get('/endorse', isLogedIn, function (req, res){

});


router.get('/changePasword', isLogedIn, function (req, res){

});


router.get('/updateClasses', isLogedIn, function (req, res){

});

/**
**  Testing purpose only.
**/
// router.get('/test', function (req, res){
//   var teacher = new Teacher({
//     teacherID: '123test',
//     name: {
//       fName: 'Sayan',
//       mNae: 'Kr.',
//       lName: 'Das'
//     },
//     classes: [{
//       class_: 'X'
//     }],
//     password: '123test'
//   });
//
//   teacher.save();
//
//   res.send(req.session);
// });

module.exports = router;
