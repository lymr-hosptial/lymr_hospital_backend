const server = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path: '../.env'});
const jwt_token = require('jsonwebtoken')

const port = process.env.SERVERPORT;
const key = process.env.KEY;
const app = server();
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));

const {MongoClient, ObjectId} = require('mongodb');
const { JsonWebTokenError } = require('jsonwebtoken');
const uri = "mongodb+srv://makram:makram@cluster0.uhuavyj.mongodb.net/"; //database server URI



MongoClient.connect(uri).then(client => {;    //connect to the server
    const dba = client.db('hospitaldb');      //select the datbas
    
    app.get('/patient/reports-id/', async function(req, res){    
      
      //get patient ID and token from the API request
      const pat_id = req.query.id.toString();
      const token = req.query.token;
      const us = jwt_token.verify(token,key); //verify the token and get the username
      
      const role = await dba.collection('employee').find({'username':us.username}).toArray();    //get the role from the employee collection in the DB
      const access = await dba.collection('acl').find({'role':role[0].role}).toArray();      //get the access right from the acl collection in the DB
      const roleAccess= access[0].access;
        

      if (!roleAccess.includes('patient_data')) {     //check if the username is authorized to access patient data
          res.json({'Error':'User not authorised'})   //User is not authorized
      }else {                                      //user is authorized
          //contruct the query in JSON
          const query = [
            {
              '$match': {
                '_id': new ObjectId(pat_id)
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
          dba.collection('patient').aggregate(query).toArray() //query the databese using MongoDB aggregation
            .then(results => {
              res.send(results); // sending the response
            })
            .catch(error => res.send(error))
      }
    });

});

app.listen(port, () => console.log(`Listening on port ${port}...`));