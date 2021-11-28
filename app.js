require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const Email = require("./models/email");
const History = require("./models/history");
const Auth = require("./routes/auth");
const email = require("./routes/email");
const {MongoClient} = require("mongodb");
const isNotLoggedIn = require("./middlewares/isNotLoggedIn");
const isLoggedIn = require("./middlewares/isLoggedIn.js");
const verifyToken = require("./middlewares/verifyToken.js");
const moment = require("moment");
const { isMoment } = require("moment");
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

app.get("/login", isNotLoggedIn, (req, res)=>{
    res.render("signin.ejs")
})
app.get("/signup", isNotLoggedIn, (req, res)=>{
    res.render("signup.ejs");
})
app.get("/dashboard/home", isLoggedIn, verifyToken, async (req, res)=>{
  await Email.find({'from.id' : req.user.id, 'recurring' : true}, (err, scheduleEmail)=>{
    if(err){
      console.log(err);
      return;
    }
    console.log(scheduleEmail);
    res.render("dashboardHome.ejs", {scheduleEmail : scheduleEmail, moment: moment});
  })
})
app.get("/dashboard/history", isLoggedIn, verifyToken, async (req, res)=>{
  await History.find({'from.id': req.user.id}, (err, emailArr)=>{
    if(err){
      console.log(err);
      return;
    }
    console.log(emailArr);
    res.render("dashboardHistory.ejs", {emailArr : emailArr, moment : moment});
  })
})
app.get("/dashboard/create", isLoggedIn, verifyToken, (req, res)=>{
  res.render("dashboardCreate.ejs", {moment : moment});
})


app.use("/user", Auth);
app.use("/schedule", email);



app.listen(process.env.PORT || "5000", ()=>{
    console.log("Backend Started ....");
})