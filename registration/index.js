const server = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
require('dotenv').config();
// var mongoose = require('mongoose');
const port = process.env.SERVERPORT || 3000;

// const routes = require('./routes/index');
const app = server();

app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));
// app.use(cors());

app.get('/registration', (req, res) => res.send('lymr Registration, API!'));

app.listen(port, () => console.log(`Registration API listening on port ${port}!`));