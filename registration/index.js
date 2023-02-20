const server = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
require('dotenv').config();

const port = process.env.SERVERPORT || 3000;
const app = server();
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://makram:makram@cluster0.uhuavyj.mongodb.net/";
MongoClient.connect(uri)
  .then(client => {
    const db = client.db('hospitaldb');
    // const employeeCollection = db.collection('employee');
    // console.log(quotesCollection);
    // API for to get all employees
    app.get('/getAllEmployees', (req, res)=>{
      db.collection('employee').find({"email":"gbrownlow1a@posterous.com"}).toArray()
        .then(results => {
          // console.log(results)
          res.json(results); // sending the data in json format
        })
        .catch(error => console.error(error))
  });

  app.get('/getallpatients', (req, res)=>{
    db.collection('patient').find().toArray()
      .then(results => {
        // console.log(results)
        res.json(results);
      })
      .catch(error => console.error(error))
  });
  app.post('/newpatient', (req, res)=>{
    //get values from API request
    const first_name =req.query.fn.toString();
    const last_name =req.query.ln.toString();  
    const phone =req.query.ph.toString();  
    const gender =req.query.ge.toString();  
    const address =req.query.ad.toString();  
    const bloodtype =req.query.bt.toString();    
    const status =req.query.st.toString();  
    const email =req.query.em.toString();  
    const date_of_birth = new Date(req.query.dob);  

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

    db.collection('patient').insertOne(query)
      .then(results => {
      // console.log(results)
        res.send(results);
      })
      .catch(error => console.error(error))
   });  
});
// app.use(cors());

app.get('/registration', (req, res) => res.send('lymr Registration, API!'));


app.get('/newemployee', (req, res)=>{
  res.send('new employee is created in lymr database!');
})
app.listen(port, () => console.log(`Registration API listening on port ${port}!`));