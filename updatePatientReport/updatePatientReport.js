const server = require('express');
const bodyParser = require('body-parser');
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

    app.post('/patient/reports/update/', async function(req, res){    
      
      //get email and new description from the API request
      const rep_id = req.query.id.toString();
      const new_desc = req.query.desc.toString();

      //contruct the query in JSON
      const query = {_id: new ObjectId(rep_id)}
      const update_value = { $set: {description: new_desc} }

      const result = await db.collection('report').updateOne(query, update_value);
      res.send(result); // sending the response
  });
    
})

app.listen(port, () => console.log(`Listening on port ${port}...`));