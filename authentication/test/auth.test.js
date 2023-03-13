process.env.NODE_ENV = 'test';
const { dbInstance } = require("../config/database");
const express = require('express');
const app = express();
const chai = require('chai');
let chaiHttp = require('chai-http');
const request = require('supertest');
let should = chai.should();
chai.use(chaiHttp);
/*
  * Test the /POST login route
  */
describe('POST auth the registered user', () => {
    it('should auth user for the registered user',(done)=>{
        // let  username= "ahoneywood4";
        // let password = "VvvAr5kn";
         let  username= "nouser";
        let password = "12345";
        request(app)
        .post('/login')
        .send({username, password})
        .expect(200)
        .then((res) => {
         expect(res.headers.location).to.be.eql('/login');
        });
         // more validations can be added here as required
    });
});