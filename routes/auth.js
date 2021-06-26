const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const isNotLoggedIn = require("../middlewares/isNotLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const authController = require('../controllers/auth');
const cookieParser = require('cookie-parser');
const passportSignIn = passport.authenticate('local', { session: true });
const passportJWT = passport.authenticate('jwt', { session: false });
const User = require("../models/user");

router.post('/signup', isNotLoggedIn, authController.signUp);

router.post('/signin', isNotLoggedIn, passportSignIn, authController.signIn);

router.get('/oauth/google', isNotLoggedIn, passport.authenticate('googleToken', {scope: ['profile', 'email']}));

router.get("/oauth/google/redirect", isNotLoggedIn, passport.authenticate('googleToken', {failureRedirect: ''}), authController.googleOAuth);

router.get("/logout", isLoggedIn, function(req, res){
    // req.session = null;
    res.clearCookie('jwt_access_token');
    // req.user = null;
    req.logout();
    res.redirect("/");
  })

  router.get("/list", isLoggedIn, async (req, res)=>{
    console.log(req.session);
    let list = await User.find({});
    res.json({
      success : true,
      list : list
    })
  })

module.exports = router;