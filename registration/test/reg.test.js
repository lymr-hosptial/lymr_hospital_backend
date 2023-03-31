process.env.NODE_ENV = "test";
const express = require("express");
const app = express();
let server = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9iYXJ3b29kNSIsImlhdCI6MTY3NzU4NjM5NH0.KWNtYFrsryETBSscod4vi0g4fL_OXvr-wtKW2X_xO-Y";
/*
 * Test the /POST login route
 */
describe("POST employee api", () => {
  it("should add new employee", (done) => {
    let employee = {
      first_name: "lavanuser",
      last_name: "Woods",
      email: "newuser@ucoz.com",
      gender: "M",
      phone: "8204241999",
      address: "961 Vidon Terrace",
      username: "lavanuser",
      password: "lymar",
      date_of_birth: "1982-03-08T20:00:00.000Z",
      date_of_join: "1971-12-07T20:00:00.000Z",
      role: "nurse",
      position: "senior",
      active: true,
    };

    chai
      .request(server)
      .post("/api/v1/registeremployee")
      .set({ Authorization: `bearer ${token}` })
      .send(employee)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("New Employee Add Successfully");
        done();
      });
  });
});

describe("POST patient api", () => {
  //test the create a new patient
  it("should add new patient", (done) => {
    chai
      .request(server)
      .post("/api/v1/registerpatient")
      .set({ Authorization: `bearer ${token}` })
      .query({
        fn: "Pooja",
        ln: "Sharma",
        em: "pooja@gmail.com",
        ge: "F",
        ad: "961 Vidon Terrace",
        ph: 8201207890,
        dob: "1997-12-19",
        st:"active",
        bt:'B+'

      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("New Patient Add Successfully");
        done();
      });
  });
});

