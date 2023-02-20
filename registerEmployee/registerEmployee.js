const server = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.SERVERPORT || 3050;
const app = server();
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://makram:makram@cluster0.uhuavyj.mongodb.net/"; //database server URI

MongoClient.connect(uri) //connect to the server
  .then(client => {
    const db = client.db('hospitaldb'); //select the datbase

    app.post('/register/employee/', (req, res)=>{    
      
      //get values from the API request
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
      db.collection('employee').insertOne(query) //inserting the JSON file in the collection 'employee'
       .then(results => {
          res.send(results); // sending the respone
        })
        .catch(error => console.error(error))
  });
    
})

app.listen(port, () => console.log(`Listening on port ${port}...`));