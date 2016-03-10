var Student = require('./model').student;
var StudentDetail = require('./model').studentDetail;

var express = require('express');
var router = express.Router();

router.use(function (req, res, next){
  var type = req.session.IDType;

  if(!type != 'student' && type != undefined) res.send({ 'isValidUser': false });
  else next();
});

function isLoggedIn (req, res, next){
  var type = req.session.IDType;
  var ID = req.session.ID;

  if(type == undefined && ID == undefined) res.send({ 'sessionExpired': true });
  else next();
};


router.get('/', function(req, res){
  res.send('Welcome to Student API');
});

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
        req.session.IDType = "student";
        req.session.ID = ID;

        res.send({ 'status': 'success' });
      }
      else res.send({ 'status': 'ise' });
    });
});

/**
** CREATE DUMMY USERS (GET)
** Testing Purpose Only
**/
router.get('/createDummyUser', function (req, res){
  var student = new Student({
    studentID: '123testID',
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

  var studentDetail =new StudentDetail({
     studentID: '123testID',
     schoolID: '123SchoolID'
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
