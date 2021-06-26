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
const isNotLoggedIn = require("./middlewares/isNotLoggedIn");
const isLoggedIn = require("./middlewares/isLoggedIn.js");
const app = express();
require("./passport");

mongoose.connect(process.env.mongoLink, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
	console.log('Connected to DB!')
}).catch(err => {
	console.log('ERROR:', err.message)
});


app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));


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

app.use(express.static("assets"));

app.use(function(req, res, next){
	res.locals.nowUser = req.user
	res.locals.isAuth = req.user ? true:false
  next()
})

app.get("/", (req, res)=>{
    res.render("landing.ejs");
})

app.get("/login", (req, res)=>{
    res.render("signin.ejs")
})
app.get("/signup", (req, res)=>{
    res.render("signup.ejs");
})



app.use("/user", Auth);


app.listen(process.env.PORT || "5000", ()=>{
    console.log("Backend Started ....");
})