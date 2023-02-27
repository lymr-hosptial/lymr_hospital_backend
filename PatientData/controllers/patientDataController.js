const { dbInstance } = require("../config/database");
const jwt_token = require("jsonwebtoken");
const dotenv = require("dotenv");
const { access } = require("fs");
const MongoClient = require("mongodb")

dotenv.config();
const port = process.env.SERVERPORT;
const key = process.env.KEY;

const getPatientReportEmail= async(req, res)=>{
//get email and token from the API request
const email = req.query.em.toString();
const token = req.token;
const us = jwt_token.verify(token,key); //verify the token and get the username
// var roleAccess="";
dbInstance(async(db)=>{
    const role = await db.collection('employee').find({'username':us.username}).toArray();    //get the role from the employee collection in the DB
    const access = await db.collection('acl').find({'role':role[0].role}).toArray();      //get the access right from the acl collection in the DB
    console.log(access);
    var roleAccess= access[0].access;
    if (!roleAccess.includes('patient_data')) {     //check if the username is authorized to access patient data
       return res.json({'Error':'User not authorised'})   //User is not authorized
    }else {                                      //user is authorized
        //contruct the query in JSON
        const query = [
          {
            '$match': {
              'email': email
            }
          }, {
            '$lookup': {
              'from': 'report', 
              'localField': '_id', 
              'foreignField': 'patient_id', 
              'as': 'report(s)'
            }
          }
        ]
        const results = await db.collection('patient').aggregate(query).toArray() //query the databese using MongoDB aggregation
            .then(results => {
                return res.send(results); // sending the response
              })
              .catch(error =>{
                return res.send(error);
              } );
        
    }
},res);


};

const getPatientReportID = async (req,res)=>{

    //get id and token from the API request
const pat_id = req.query.id.toString();
const token = req.token;
const us = jwt_token.verify(token,key); //verify the token and get the username

dbInstance(async(db)=>{
    console.log("line 60");
    const role = await db.collection('employee').find({'username':us.username}).toArray();    //get the role from the employee collection in the DB
    const access = await db.collection('acl').find({'role':role[0].role}).toArray();      //get the access right from the acl collection in the DB
    // console.log(access);
    var roleAccess= access[0].access;
    if (!roleAccess.includes('patient_data')) {     //check if the username is authorized to access patient data
       return res.json({'Error':'User not authorised'})   //User is not authorized
    }else {                                      //user is authorized
        //contruct the query in JSON
        const query = [
          {
            '$match': {
               '_id': new MongoClient.ObjectId(pat_id)
            }
          }, {
            '$lookup': {
              'from': 'report', 
              'localField': '_id', 
              'foreignField': 'patient_id', 
              'as': 'report(s)'
            }
          }
        ]
        console.log("line 83");
        const results = await db.collection('patient').aggregate(query).toArray(); //query the databese using MongoDB aggregation
            if(results) {
                return res.send(results); // sending the response
              }
              else{
                return res.send(error);
              }
        
    }
    
},res);
    
}

module.exports = {
    getPatientReportEmail,
    getPatientReportID
}