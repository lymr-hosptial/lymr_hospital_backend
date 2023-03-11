const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
//let server = require("index");

chai.should();
chai.use(chaiHttp);

function helloworld() {
    return "Hello world!";
  }
  
  describe("test / route", () => {
    it("should", function () {
      chai.assert.equal(helloworld(), "Hello world!");
    });
  });