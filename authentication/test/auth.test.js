process.env.NODE_ENV = "test";
const express = require("express");
const app = express();
let server = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);
// let { dbInstance } = require("../config/database");
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhdmFuMjAiLCJpYXQiOjE2NzkwNjA5Mzh9.-5xw1bj9yapsNERNzrTPIv8KJ6c_9j5u5Cftce5a7H8';
/*
 * Test the /POST login route
 */
// describe("POST /login", () => {
//     it("should return 200 OK", (done) => {
//       let name = "lavan20";
//       let pass = "123456";
//       console.log({ name, pass });
//       chai
//         .request(server)
//         .post("api/v1/login")
//         .send({ username:name, password:pass})
//         .end((err, response) => {
//         //   response.should.have.status(404);
//         console.log(response);
//         console.log(err);
//         //   response.body.should.have
//         //     .property("message")
//         //     .eql("logged in successfully");
//         });
//       done();
//     });
//   });

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
             .eql("logged in successfully");
        });
        done();
    });

   
    // it('should auth a new user', (done) => {
    //       request(server)
    //       .post('/comments')
    //       .send({
    //           content: "first comment",
    //           user: user._id
    //        })
    //       .end((err, res) => {
    //         comment = res.body
    //         expect(res.status).to.eq(200);
    //         expect(res.body.content).to.eq('first comment');
    //         done()
    //       })
    //     })

    it('should add new employee', (done)=>{
        let employee ={
                "first_name": "Peter",
                "last_name": "Woods",
                "email": "joe@ucoz.com",
                "gender": "M",
                "phone": "8204241999",
                "address": "961 Vidon Terrace",
                "username": "peterwoods",
                "password": "123456",
                "date_of_birth": "1982-03-08T20:00:00.000Z",
                "date_of_join": "1971-12-07T20:00:00.000Z",
                "role": "nurse",
                "position": "senior",
                "active": true
        };

        chai
        .request(server)
        .post("/api/v1/addemployee")
        .set({ "Authorization": `Bearer ${token}` })
        .send(employee)
        .end((err, res)=>{
            res.should.have.status(200);
            // res.body.should.be.a('object'
            res.body.should.have
             .property("message")
             .eql("New Employee Add Successfully");
            done();
        });
        
    });
});
