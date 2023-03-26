const server = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const filesystem = require("fs");
const path = require("path");
const jwt_token = require("jsonwebtoken");
const dotenv = require("dotenv");
const authRoutes = require("./routes/regroutes");
const port = process.env.SERVERPORT || 3000;
const BASE_URL = `/api/${process.env.VERSION || "v1"}`;
dotenv.config();
const app = server();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(server.json(), cors());
//CORS-HEADERS- Required for cross origin and cross server communication
app.use((req, res, next) => {
  res.setHeader("Access-Control_Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "PATCH",
    "DELETE",
    "OPTIONS"
  );
  next();
});
app.get("/", (req, res) => res.send("lymr Registration, API!"));


filesystem.readdir(path.join(__dirname, "routes"), (err, files) => {
  if (err) console.error("error in index readdir" + err);

  files.forEach((file) => {
    console.log("LYMR Registration index");
    app.use(BASE_URL, require(`./routes/${file}`));
  });
});
module.exports = app.listen(port, () =>
  console.log(`Registration API listening on port ${port}!`)
);

