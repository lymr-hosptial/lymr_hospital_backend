const { dbInstance } = require("../config/database");
const jwt_token = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.SERVERPORT
const key = process.env.KEY

const registerPatient=async(req,res)=>{
    //get values and token from API request
    const first_name =req.query.fn.toString();
    const last_name =req.query.ln.toString();  
    const phone =req.query.ph.toString();  
    const gender =req.query.ge.toString();  
    const address =req.query.ad.toString();  
    const bloodtype =req.query.bt.toString();    
    const status =req.query.st.toString();  
    const email =req.query.em.toString();  
    const date_of_birth = new Date(req.query.dob);  
    
    const token = req.token;
    const us = jwt_token.verify(token,key); //verify the token and get the username
    dbInstance(async(db)=>{
        const arole = await db.collection('employee').find({'username':us.username}).toArray();    //get the role from the employee collection in the DB
        const access = await db.collection('acl').find({'role':arole[0].role}).toArray();      //get the access right from the acl collection in the DB
        const roleAccess= access[0].access;

        if (!roleAccess.includes('registration')) {     //check if the username is authorized to register new employees
          res.json({'Error':'User not authorized'})   //User is not authorized
        } else {
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

        const results = await db.collection('patient').insertOne(query)  //inserting the JSON file in the collection 'patient'
          if (results){
            res.send(results);
          }else {
          res.send(error)
        }
  }
 } ,res);
}
const registerEmployee = async(req, res) => {
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
  const token = req.token;
  const us = jwt_token.verify(token,key); //verify the token and get the username
  dbInstance(async(db)=>{
  const arole = await db.collection('employee').find({'username':us.username}).toArray();    //get the role from the employee collection in the DB
  const access = await db.collection('acl').find({'role':arole[0].role}).toArray();      //get the access right from the acl collection in the DB
  const roleAccess= access[0].access;

  if (!roleAccess.includes('registration')) {     //check if the username is authorized to register new employees
    res.json({'Error':'User not authorized'})   //User is not authorized
  }else {
  
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
    
}
},res);
}

module.exports = {
 registerEmployee,
  registerPatient
};
// sample code changes