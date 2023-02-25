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
  
  app.get('/registration', (req, res) => res.send('lymr PatientData, API!'));


  app.get('/newemployee', (req, res)=>{
  res.send('new employee is created in lymr database!');
})
app.listen(port, () => console.log(`Registration API listening on port ${port}!`));