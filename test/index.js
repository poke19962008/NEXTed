var supertest = require("supertest");
var should = require("should");

var addr = process.env.IP || "0.0.0.0";
var port = process.env.PORT || 3000;
var server = supertest.agent(addr + ":" + port);

describe("Sample API test", function(){
  it("Should return Welcome", function(done){
    server
      .get('/api')
      .expect(200, done) // THis is HTTP response
  });
});
