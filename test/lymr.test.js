const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
let server = require("../authentication/index");

chai.should();
chai.use(chaiHttp);

//Test authentication
describe("Testing Authentication Module", () => {
    
      it("Checking for response", (done) => {
        try {
          let login = {
          "username": "ahoneywood4",
          "password": "VvvAr5kn"
          }
          chai
          .request("http://localhost:3000")
          .post("/api/v1/login")
          .send(login)
          .end((err, response) => {
            var result = JSON.parse(JSON.stringify(response.body));
            
            console.log(result.message);
            result.message.should.be.eq('logged in successfull')
            //response.body.should.be.a('object')
            
          });
        } catch(e){console.log('Failed')}
        done()
      }); 
    
  });