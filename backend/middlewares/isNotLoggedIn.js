const passport = require('passport');

function isNotLoggedIn(req, res, next) {
    if (!req.user) {
      // req.session = null;
      next();
    } else {
      res.json({
          success : false,
          message : "You are already logged in."
      });
    }
  } 

  module.exports = isNotLoggedIn;