const server = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path: '../.env'});
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
    

  app.post('/newpatient', async function(req, res){
    //get values and token from API request
    const first_name =req.query.fn.toString();
    const last_name =req.query.ln.toString();  
    const phone =req.query.ph.toString();  
    const gender =req.query.ge.toString();  
    const address =req.query.ad.toString();  
    const bloodtype =req.query.bt.toString();    
    const status =req.query.st.toString();  
    const email =req.query.em.toString();  
    const date_of_birth = new Date(req.query.dob);  
    
    const token = req.query.token;
    const us = jwt_token.verify(token,key); //verify the token and get the username

    const arole = await dba.collection('employee').find({'username':us.username}).toArray();    //get the role from the employee collection in the DB
    const access = await dba.collection('acl').find({'role':arole[0].role}).toArray();      //get the access right from the acl collection in the DB
    const roleAccess= access[0].access;

    if (!roleAccess.includes('registration')) {     //check if the username is authorized to register new employees
      res.json({'Error':'User not authorized'})   //User is not authorized
    } else {
    //construct query in JSON
    const query ={ 
      "first_name": first_name,
      "last_name" : last_name,
      "email": email,
      "gender": gender,
      "phone": phone,
      "address": address,
      "date_of_birth" : date_of_birth,
      "status": status,
      "bloodtype": bloodtype}
      console.log(query);

    dba.collection('patient').insertOne(query)  //inserting the JSON file in the collection 'patient'
      .then(results => {
        res.send(results);
      })
      .catch(error => console.error(error))
    }
  });
  
})

app.listen(port, () => console.log(`Listening on port ${port}...`));