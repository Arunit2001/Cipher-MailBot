const passport = require('passport');
const Email = require('../models/email');
let alert = require("alert");


async function isOwner(req, res, next) {
    await Email.findById(req.params.id, (err, email)=>{
        if(err){
          alert('Given email id does not exist');
          res.redirect("/dashboard/home");
        }
        if (email.from.id!=req.user.id) {
          // req.session = null;
          alert('You are unauthorized');
          res.redirect("/dashboard/home");
        } else {
          next();
        }
    })
  } 

  module.exports = isOwner;