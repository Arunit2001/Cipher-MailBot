require("dotenv").config();
const passport                = require('passport');
const JwtStrategy             = require('passport-jwt').Strategy;
const { ExtractJwt }          = require('passport-jwt');
const LocalStrategy           = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-oauth20').Strategy;
const User                    = require('./models/user');
const bcrypt                  = require('bcrypt');

passport.serializeUser(function(user, done){
	done(null, user.id)
})

passport.deserializeUser(async function(id, done){
	try{
		var user = await User.findById(id)
		done(null, user)
	}catch(error){
		done(error, null)
	}
})

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub);

    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

// Google OAuth Strategy
// passport.use('googleToken', new GooglePlusTokenStrategy({
//   callbackURL: 'http:localhost:3000/users/oauth/google/redirect',
//   clientID: config.oauth.google.clientID,
//   clientSecret: config.oauth.google.clientSecret
// }, async (accessToken, refreshToken, profile, done) => {
//   // console.log(profile);
//   // return done(null, profile);
//   try {
//     // Should have full user profile over here
//     // console.log('profile', profile);
//     // console.log('accessToken', accessToken);
//     // console.log('refreshToken', refreshToken);
    
//     const existingUser = await User.findOne({ "google.id": profile.id });
//     if (existingUser) {
//       return done(null, existingUser);
//     }

//     const newUser = new User({
//       method: 'google',
//       name: profile.displayName,
//       role : "student",
//       createdAt: new Date().getTime(),
//       google: {
//         id: profile.id,
//         email: profile.emails[0].value
//       }
//     });
//     await newUser.save();
//     done(null, newUser);
//   } catch(error) {
//     done(error, false, error.message);
//   }
// }));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the user given the email
    const user = await User.findOne({ "local.email": email });
    
    // If not, handle it
    if (!user) {
      console.log("err1");
      return done(null, false);
    }
  
    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.local.password);;
  
    // If not, handle it
    if (!isMatch) {
    //   console.log(user.local.password);
      console.log("err2");
      return done(null, false);
    }
  
    // Otherwise, return the user
    done(null, user);
  } catch(error) {
    console.log("err3");
    done(error, false);
  }
}));