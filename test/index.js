var supertest = require("supertest");
var should = require("should");

var addr = process.env.IP || "0.0.0.0";
var port = process.env.PORT || 3000;
var server = supertest.agent(addr + ":" + port);

describe("Sample API test", function(){
  var app = require('../server');
  beforeEach(function(){
    app.listen(3000);
  });

  it("GET /", function(){
    server
    .get("/")
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });

});
