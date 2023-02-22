const server = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const jwt_token = require("jsonwebtoken");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authroutes");
const port = process.env.SERVERPORT || 3000;
const uri = "mongodb+srv://makram:makram@cluster0.uhuavyj.mongodb.net/";

dotenv.config();

const app = server();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(server.json(), cors());
let db = "";
MongoClient.connect(uri).then((client) => {
  db = client.db("hospitaldb");
});
function authToken(req, res, next) {
  //get auth token header value
  const bearerToken = req.headers["authorization"];
  if (typeof bearerToken !== "undefined") {
    const bearer = bearerToken.split(" ");
    console.log(bearer);
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
}
app.get("/auth", (req, res) => res.send("lymr authentication, API!"));
app.post("/api/login", (req, res) => {
  let { username, password } = req.body;
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
app.post("/api/newemployee", authToken, (req, res) => {
  jwt_token.verify(req.token, 'lymar', (err, decoded) => {
    if (!err) {
      let {
        first_name,
        last_name,
        email,
        gender,
        phone,
        address,
        username,
        password,
        date_of_birth,
        date_of_join,
        role,
        position,
        active,
      } = req.body;
      console.log(req.body);
      let query = {
        "first_name" :first_name,
        "last_name" :last_name,
        "email":email,
        "gender":gender,
        "phone":phone,
        "address":address,
        "username":username,
        "password":password,
        "date_of_birth":date_of_birth,
        "date_of_join":date_of_join,
        "role":role,
        "position":position,
        "active":active
      }
      db.collection('employee').insertOne(query)
      .then(results => {
      // console.log(results)
        res.send(results);
      })
      .catch(error => console.error(error)); 
    }else{
      res.sendStatus(403);
    } 
  }); 

});

app.listen(port, () =>
  console.log(`Authentication API listening on port ${port}!`)
);
