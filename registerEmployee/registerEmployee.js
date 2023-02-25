const server = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path: '/home/akabawi/Documents/DevOps/lymr-hospital/lymr_hospital_backend/.env'});
const jwt_token = require('jsonwebtoken')

const port = process.env.SERVERPORT;
const key = process.env.KEY;
const app = server();
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));

const {MongoClient} = require('mongodb');
const { JsonWebTokenError } = require('jsonwebtoken');
const uri = "mongodb+srv://makram:makram@cluster0.uhuavyj.mongodb.net/"; //database server URI

MongoClient.connect(uri) //connect to the server
  .then(client => {
    const dba = client.db('hospitaldb'); //select the datbase

    app.post('/register/employee/', async function(req, res){    
      
      //get values and token from the API request
      const email = req.query.em.toString();
      const first_name = req.query.fn.toString();
      const last_name = req.query.ln.toString();
      const gender = req.query.ge.toString();
      const phone = req.query.ph.toString();
      const addr = req.query.ad.toString();
      const username = req.query.un.toString();
      const password = req.query.pw.toString();
      const dob = new Date(req.query.dob);
      const doj = new Date (req.query.doj);
      const role = req.query.role.toString();
      const pos = req.query.pos.toString();

      const token = req.query.token;
      const us = jwt_token.verify(token,key); //verify the token and get the username

      const arole = await dba.collection('employee').find({'username':us.username}).toArray();    //get the role from the employee collection in the DB
      const access = await dba.collection('acl').find({'role':arole[0].role}).toArray();      //get the access right from the acl collection in the DB
      const roleAccess= access[0].access;

      if (!roleAccess.includes('registration')) {     //check if the username is authorized to register new employees
        res.json({'Error':'User not authorised'})   //User is not authorized
      }else {
          //contruct the query in JSON
          const query = {
            "email": email, 
            "first_name": first_name,
            "last_name": last_name,
            "gender": gender,
            "phone": phone,
            "address": addr,
            "username": username,
            "password": password,
            "date_of_birth": dob,
            "date_of_join": doj,
            "role": role,
            "position": pos,
            "active":true
          }
          dba.collection('employee').insertOne(query) //inserting the JSON file in the collection 'employee'
          .then(results => {
              res.send(results); // sending the respone
            })
            .catch(error => res.send(error))
        }
    });
    
})

app.listen(port, () => console.log(`Listening on port ${port}...`));