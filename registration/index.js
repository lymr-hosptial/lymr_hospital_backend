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
      db.collection('employee').find({"email":"m.a@gmail.com"}).toArray()
        .then(results => {
          // console.log(results)
          res.json(results); // sending the data in json format
        })
        .catch(error => console.error(error))
  });

  app.get('/getallpatients', (req, res)=>{
    db.collection('patient').find({"email":"m.a@gmail.com"}).toArray()
      .then(results => {
        // console.log(results)
        res.json(results);
      })
      .catch(error => console.error(error))
  });
    
})
// app.use(cors());

app.get('/registration', (req, res) => res.send('lymr Registration, API!'));


app.listen(port, () => console.log(`Registration API listening on port ${port}!`));