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
  var myobj = { 
  first_name:'Makram',
  last_name: 'almasarwa',
  email: 'm.a@gmail.com',
  gender: 'M',
  address: 'mira1',
  phone: '0551111111',
  date_of_birth: new Date("1985-12-30"),
  status: 'active',
  bloodtype: 'A+'	 };
  db.collection('patient').insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
     
})
// app.use(cors());

app.get('/registration', (req, res) => res.send('lymr Registration, API!'));


app.get('/newemployee', (req, res)=>{
  res.send('new employee is created in lymr database!');
})
app.listen(port, () => console.log(`Registration API listening on port ${port}!`));