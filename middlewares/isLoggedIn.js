const passport = require('passport');
let alert = require("alert");
function isLoggedIn(req, res, next) {
    if (!req.user) {
      // req.session = null;
      alert("Please login First");
      res.redirect("/login");
    } else {
      next();
    }
  } 

  module.exports = isLoggedIn;