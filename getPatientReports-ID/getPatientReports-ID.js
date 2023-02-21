const server = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
require('dotenv').config();

const port = process.env.SERVERPORT || 3050;
const app = server();
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));

const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://makram:makram@cluster0.uhuavyj.mongodb.net/"; //database server URI

MongoClient.connect(uri) //connect to the server
  .then(client => {
    const db = client.db('hospitaldb'); //select the datbase

    app.get('/patient/reports-id/', (req, res)=>{    
      
      //get patient ID from the API request
      const pat_id = req.query.id.toString();

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
      db.collection('patient').aggregate(query).toArray() //query the databese using MongoDB aggregation
       .then(results => {
          res.send(results); // sending the response
        })
        .catch(error => res.send(error))
  });
    
})

app.listen(port, () => console.log(`Listening on port ${port}...`));