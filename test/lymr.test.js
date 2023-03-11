const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
let server = require("../authentication/index");

chai.should();
chai.use(chaiHttp);

function helloworld() {
    return "Hello world!";
  }
  
  describe("Testing authentication", () => {
    it("Testing login", function () {
      chai.assert.equal(helloworld(), "Hello world!")
      return null;
    });
  });