process.env.NODE_ENV = "test";
const express = require("express");
const app = express();
let server = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);

let token =
  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFob25leXdvb2Q0IiwiaWF0IjoxNjc3NTg5OTc4fQ.rXk3NlKR7EqcmkkwlVRppJEQOA8kpq76lKnJTNjao90"
/*
 * Test the /POST login route
 */
describe("GET patient report email", () => {
  it("should return patient report", (done) => {
    chai
      .request(server)
      .get("/api/v1/getpatientreportbyemail")
      .set({ Authorization: `${token}` })
      .query({em: "lmilsomlv@pbs.org"})
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("GET patient report id ", () => {
  //test the create a new patient
  it("should return patient report", (done) => {
    chai
      .request(server)
      .get("/api/v1/getpatientreportid")
      .set({ Authorization: `${token}` })
      .query({
        id: "63e8b801e4771093a0b0d1c6",
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("UPDATE patient report", () => {
    //test the create a new patient
    it("should update patient record ", (done) => {
      chai
        .request(server)
        .post("/api/v1/updatepatientreport")
        .set({ Authorization: `${token}` })
        .query({
          id: "63ea8867d9e2b44e32807891",
          desc:"Test cases update the patient record successfully"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('acknowledged').to.be.true;
          done();
        });
    });
  });

