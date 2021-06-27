const passport = require('passport');
let alert = require("alert");

function isNotLoggedIn(req, res, next) {
    if (!req.user) {
      // req.session = null;
      next();
    } else {
      alert('You are already logged in.')
      res.redirect("/")
    }
  } 

  module.exports = isNotLoggedIn;