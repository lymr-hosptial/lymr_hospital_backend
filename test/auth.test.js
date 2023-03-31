process.env.NODE_ENV = "test";
const express = require("express");
const app = express();
let server = require("./authentication");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9iYXJ3b29kNSIsImlhdCI6MTY3OTMzMDA2NH0.8Zra1vBGvz5T2Sm-FCKNjuNa7ezgmVsiq0nV8Rdbdsc";
/*
 * Test the /POST login route
 */
server.app();
describe('GET root api', () => {
    it('should console the base url', (done) => {
        chai
        .request(server)
        .get("/")
        .end((err,res)=>{
            res.should.have.status(200);
        });
        done();
    });

    it('should auth the user', (done)=>{
        let name = "lavan20";
        let pass = "123456";
        chai
        .request(server)
        .post("/api/v1/login")
        .send({username:name, password:pass})
        .end((err, res)=>{
            res.should.have.status(200);
              res.body.should.have
             .property("message")
             .eql("Logged in successfully");
        });
        done();
    });
});
