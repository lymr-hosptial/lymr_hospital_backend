process.env.NODE_ENV = 'test';
const { dbInstance } = require("../config/database");
const {authController } = require("../controllers/authcontrollers");
const express = require('express');
const app = express();
const server = require('../index.js');
const chai = require('chai');
var expect = require('chai').expect;
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
/*
  * Test the /POST login route
  */
describe('POST auth the registered user', () => {
    it('should auth user for the registered user',(done)=>{
        let  username= "ahoneywood4";
        let password = "VvvAr5kn";
        //  let  username= "nouser";
        // let password = "12345";
        chai.request(server)
        .post('/api/v1/login')
        .send({username, password})
        .then((err, res) => {
            res.should.have.status(200);
            // res.body.should.be.a('object');
            res.body.book.should.have.property('username');
            res.body.book.should.have.property('password');
            res.body.should.have.property('message').eql('logged in successfully');
            done();
        });
         // more validations can be added here as required
    });
});