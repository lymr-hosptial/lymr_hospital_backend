const server = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path:'../.env'});
const jwt_token = require("jsonwebtoken");


const port = process.env.SERVERPORT;
const key = process.env.KEY;
const app = server();
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://makram:makram@cluster0.uhuavyj.mongodb.net/"; //database server URI

MongoClient.connect(uri) //connect to the server
  .then(client => {
    const db = client.db('hospitaldb'); //select the database

    app.post("/api/login", (req, res) => {
        
        //get username and password
        const username= req.query.user.toString();
        const password = req.query.pass.toString();

        //get the username and password from the collection
        db.collection("employee")
        .find({ username: username, password:password })
        .toArray()
        .then((results) => {
            if (results.length != 0) {          //if username and password are correct
            jwt_token.sign({username:username},key,(err, token)=>{          //get token
                res.json({username,"user_id":results[0]._id,token,"message":"logged in successfully"});
            });
            }else{
                res.json({message : "Authentication failed"});          //sending response
            }
        })
        .catch((error) => console.error(error));
    });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));