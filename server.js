var http = require('http');
var express = require('express');

var app = express();

// Routes Declaration
var api = require("./routes/api/index.js");

// Middlewares
app.use(express.static(__dirname + '/public'));
app.use("/api", api);

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = process.env.IP || "0.0.0.0";
  var port = process.env.PORT || 3000;
  
  console.log("Listening at ", addr + ":" + port);
});
