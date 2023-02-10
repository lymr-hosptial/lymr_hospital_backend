const server = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
// var mongoose = require('mongoose');
const port = process.env.SERVERPORT || 5500;

// const routes = require('./routes/index');
const app = server();

app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));
app.use(cors());
app.use('/', (req, res)=>{
    console.log("lymr API ");
    res.send('lymr backend API working!')
});

app.listen(port, ()=>{
    console.info(`lmyr backend server running sucessfully on port ${port}`);
})
