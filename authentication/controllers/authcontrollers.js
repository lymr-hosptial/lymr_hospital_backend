const { dbInstance } = require("../config/database");
const jwt_token = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const userNotExist = {
  message: "User does not exist in our system. Please contact the administrator",
};
const login = (req, res) => {
  let { username, password } = req.body;

  dbInstance(async (db) => {
    const results = await db
      .collection("employee")
      .find({ username: username, password: password })
      .toArray();
    //console.log(results);
    if (results) {
      jwt_token.sign(
        { username: username },
        process.env.KEY,
        (err, token) => {
          console.log();
          return res.status(200).json({
            username,
            user_id: results[0]._id,
            token,
            message: "logged in successfully",
          });
        }
      );
    } else {
      console.log('No result')
      return res.status(404).json(userNotExist); //sending user doesn't exist
    }
  }, res);
};

const addEmployee = (req, res) => {
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
  jwt_token.verify(req.token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (!err) {
      let query = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
        phone: phone,
        address: address,
        username: username,
        password: password,
        date_of_birth: new Date(date_of_birth),
        date_of_join: new Date(date_of_join),
        role: role,
        position: position,
        active: active,
      };
      console.log(query);
      dbInstance(async (db) => {
        const results = await db.collection("employee").insertOne(query);
        console.log(results);
        if (results) {
          let success_message = {
            employee_id : results.insertedId,
            status: results.acknowledged,
            message:"New Employee Add Successfully"

          }
          return res.status(200).json(success_message);
        } else {
          return res.status(404).json(userNotExist); //send-> user doesn't exist
        }
      }, res);
    } else {
      res.sendStatus(403);
    }
  });
};

module.exports = {
  login,
  addEmployee,
};

