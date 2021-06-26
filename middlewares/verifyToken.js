require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require('mongoose');

function verifyToken(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.cookies.jwt_access_token;
    if (token==null) 
      return res.status(403).json({auth: false, message: "no token found"});
  
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {      
      if (err) 
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    
      // console.log(decoded);
      // if everything is good, save to request for use in other routes
      User.findOne({"_id": decoded.id}, function(err, user){
        if(err)
          return res.status(404).send({ auth: false, message: 'User not found with same id.' });
          
          // req.user = user;
          next();
      })
    });
  
}
module.exports = verifyToken;