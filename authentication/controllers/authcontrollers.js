const login = (req, res, next)=>{
    let { username, password } = req.body;
    db.collection("employee")
    .find({ username: username, password:password })
    .toArray()
    .then((results) => {
      console.log(results);
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
    res.send('new login');
};


module.exports=({
    login,
});