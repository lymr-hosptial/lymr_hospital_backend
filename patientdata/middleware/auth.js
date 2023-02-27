const authToken = (req, res, next)=> {
    //get auth token header value
    const bearerToken = req.headers["authorization"];
    if (typeof bearerToken !== "undefined") {
      const bearer = bearerToken.split(" ");
      console.log(bearer);
      const token = bearer[1];
      req.token = token;
      next();//nodejs 
    } else {
      res.sendStatus(403);
    }
};

module.exports = { authToken }