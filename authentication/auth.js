const server = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
require('dotenv').config();
const jwt_token = require("jsonwebtoken");


const port = process.env.SERVERPORT || 3050;
const app = server();
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://makram:makram@cluster0.uhuavyj.mongodb.net/"; //database server URI

MongoClient.connect(uri) //connect to the server
  .then(client => {
    const db = client.db('hospitaldb'); //select the datbase

    app.post("/api/login", (req, res) => {
        
        const username= req.query.user.toString();
        const password = req.query.pass.toString();
        
        //let { username, password } = req.body;
        db.collection("employee")
        .find({ username: username, password:password })
        .toArray()
        .then((results) => {
            console.log(results);
            //res.json(results); // sending the data in json format
            if (results.length != 0) {
            jwt_token.sign({username:username},'lymar',(err, token)=>{
                res.json({username,"user_id":results[0]._id,token,"message":"logged in successfully"});
            });
            }else{
            let userNotExist = {
                message : "User not exist in our system .contact the administrator"
            }
            res.json(userNotExist); //sending user doesn't exist
            }
        })
        .catch((error) => console.error(error));
    });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));