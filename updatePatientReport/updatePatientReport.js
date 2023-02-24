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

MongoClient.connect(uri) //connect to the server
  .then(client => {
    const dba = client.db('hospitaldb'); //select the datbase

    app.post('/patient/reports/update/', async function(req, res){    
      
      //get email, new description and token from the API request
      const rep_id = req.query.id.toString();
      const new_desc = req.query.desc.toString();
      const token = req.query.token;
      const us = jwt_token.verify(token,key); //verify the token and get the username

      const role = await dba.collection('employee').find({'username':us.username}).toArray();    //get the role from the employee collection in the DB
      const access = await dba.collection('acl').find({'role':role[0].role}).toArray();      //get the access right from the acl collection in the DB
      const roleAccess= access[0].access;

      //check if the username is authorized to update patient data
      if ((!roleAccess.includes('referral')) || (!roleAccess.includes('treatment_plan')) || (!roleAccess.includes('diagnosis')) || (!roleAccess.includes('discharge'))) {     
        res.json({'Error':'User not authorised'})   //User is not authorized
      }else {
          //contruct the query in JSON
          const query = {_id: new ObjectId(rep_id)}
          const update_value = { $set: {description: new_desc} }

          dba.collection('report').updateOne(query, update_value) //updating the report
          .then(results => {
              res.send(results); // sending the respone
            })
            .catch(error => res.send(error))
        }
  });
    
})

app.listen(port, () => console.log(`Listening on port ${port}...`));