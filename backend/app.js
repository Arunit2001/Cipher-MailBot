require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const Auth = require("./routes/auth");
const {MongoClient} = require("mongodb");
const app = express();
cors = require("cors");
require("./passport");

mongoose.connect(process.env.mongoLink, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
	console.log('Connected to DB!')
}).catch(err => {
	console.log('ERROR:', err.message)
});


app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

let whitelist = ["http://localhost:4200"];

app.use(function (req, res, next) {
  var allowedDomains = ["http://localhost:4200"];
  var origin = req.headers.origin;
  if (allowedDomains.indexOf(origin) !== -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Accept"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  session({
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    secret: "nishu",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res)=>{
  res.json({
    success : true,
    message : "Welcome to superSet backend homepage."
  })
})

app.use("/user", Auth);


app.listen("5000", ()=>{
    console.log("Backend Started ....");
})