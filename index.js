// Start the server on appropriate port

var app = require('./server');

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = process.env.IP || "0.0.0.0";
  var port = process.env.PORT || 3000;
  var preprocess = require('./preprocess');

  console.log("Listening at ", addr + ":" + port);

  // Update skill sets
  preprocess.addSkills();
});
