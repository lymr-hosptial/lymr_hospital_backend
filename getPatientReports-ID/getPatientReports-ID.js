const server = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
require('dotenv').config();
const jwt_token = require('jsonwebtoken')

const port = process.env.SERVERPORT || 3050;
const app = server();
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));

const {MongoClient, ObjectId} = require('mongodb');
const { JsonWebTokenError } = require('jsonwebtoken');
const uri = "mongodb+srv://makram:makram@cluster0.uhuavyj.mongodb.net/"; //database server URI

const client = MongoClient.connect(uri); //connect to the server
const dba = client.db('hospitaldb'); //select the datbase


function getRole(username){

  const role = dba.collection('acl').find({'username':username})
  console.log(role)

}

app.get('/patient/reports-id/', (req, res)=>{    
  
  //get patient ID from the API request
  const pat_id = req.query.id.toString();
  const token = req.query.token;
  const us = jwt_token.verify(token,'lymar');
  console.log(us);

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
});

app.listen(port, () => console.log(`Listening on port ${port}...`));