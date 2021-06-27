require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require('mongoose');
let alert = require("alert");
function verifyToken(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.cookies.jwt_access_token;
    if (token==null) {
      alert("Please login! Session Expired ")
      return res.redirect("/login");
    }
  
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {      
      if (err) {
        alert("Please Login, Your token didn't matched");
        return res.redirect("/login"); 
      }
      // console.log(decoded);
      // if everything is good, save to request for use in other routes
      User.findOne({"_id": decoded.id}, function(err, user){
        if(err){
          alert("Please Login!")
          return res.redirect("/login");
        }
          
          // req.user = user;
          next();
      })
    });
  
}
module.exports = verifyToken;