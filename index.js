const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const dateFormat = require("dateformat");
const fs = require('fs');
const helmet = require("helmet");
const https = require('https');
const http = require('http');

require('./models/admin/mongo.db');
require('./models/admin/admin.db');

const authentication = require("./authentication");
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');

// const httpsOptions = {
//   key: fs.readFileSync(process.env.SSL_KEY_PATH),
//   cert: fs.readFileSync(process.env.SSL_CERT_PATH)
// } 


var app = express();
app.use(helmet());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,app-id,x-access-token,hash"
  );
  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Welcome");
});

app.use("/auth", authentication.checkAppId, authRoutes);
app.use("/admin", authentication.checkToken, adminRoutes);


http.createServer(app).listen(process.env.PORT, () => {
  let dateTime = dateFormat(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    }),
    "yyyy-mm-dd H:MM:ss"
  );

  let serverData = ({
    type: process.env.SERVER,
    port: process.env.PORT,
    name: process.env.name,
    dateTime: dateTime
  })
  console.log(serverData);
})