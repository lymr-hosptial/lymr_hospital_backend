const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
let server = require("../authentication/index");

chai.should();
chai.use(chaiHttp);

//Test authentication
describe("Testing Authentication Module", () => {
    it("Checking", (done) => {
      let login = {
        "username": "ahoneywood4",
        "password": "VvvAr5kn"
      }
        chai
        .request(server)
        .post("/login")
        .send(login)
        .end((err, response) => {
            console.log(response);
            //response.body.should.be.a('object')
            done();
        });
    });
  });