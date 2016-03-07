var router = require('express').Router();


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

router.post('/subjects', isLoggedIn, function (req, res){

});

router.post('/email', isLoggedIn, function (req, res){

});

router.post('/qualification', isLoggedIn, function (req, res){

});

router.post('/experience', isLoggedIn, function (req, res){

});

router.post('/awards', isLoggedIn, function (req, res){

});

module.exports = router;
