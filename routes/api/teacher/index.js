var Teacher = require('./model').teacher;
var TeacherDetail = require('./model').teacherDetail;

var express = require('express');
var router = express.Router();

router.get('/', function (req, res){
    res.send("Teacher's API")
});

/**
** LOGIN
** Parameters -> teacherID & password
** RESPONSE
** Succes -> { status: success }
** Verification Failure -> { status: success }
** Internal Server Error -> { status: ise }
**/
router.get('/login', function (req, res){
  var password = req.query.password;
  var ID = req.query.ID;

  // TODO: Encrypt when database is encrypted
  // password = auth.encrypt(password);
  var teacher = new Teacher({
    'teacherID': ID,
    'password': password
  });

  teacher.verifyTeacher(function(err, doc){
    if(doc.length == 0) res.send( { 'status': 'failed' });
    else if(doc.length == 1) {
      req.session.IDType = "teacher";
      req.session.ID = ID;

      res.send( { 'status': 'success' });
    }
    else res.send( { 'status': 'ise' });
  });

});

/**
**  Testing purpose only.
**/
router.get('/test', function (req, res){
  res.send(req.session);
});

module.exports = router;
