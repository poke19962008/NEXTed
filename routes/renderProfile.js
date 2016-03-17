var express = require('express');
var router = express.Router();

/** Self Profile rendering [Session Revelant]
** Sets the meta tags
**/
router.get('/student', function(req, res){
  if(req.session.ID == undefined || req.session.IDType != "student") res.redirect('../login');
  else{
    res.render('profile/student/self', {
      ID: req.session.ID
    });
  }
});

/** External Profile rendering [Session Irrevelant]
** Sets the meta tags
** <meta type="student" ID="--studentID--">
**/
router.get('/student/:id', function(req, res){
  res.render('profile/student/other', {
    ID: req.params.id
  });
});

/** Self Profile rendering [Session Revelant]
** Sets the meta tags
**/
router.get('/teacher', function(req, res){
  if(req.session.ID == undefined || req.session.IDType != "teacher") res.redirect('../login');
  else{
    res.render('profile/teacher/self', {
      ID: req.session.ID
    });
  }
});

/** External Profile rendering [Session Irrevelant]
** Sets the meta tags
** <meta type="student" ID="--teacherID--">
**/
router.get('/student/:id', function(req, res){
  res.render('profile/teacher/other', {
    ID: req.params.id
  });
});


module.exports = router;
