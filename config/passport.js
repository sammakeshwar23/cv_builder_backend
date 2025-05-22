const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User'); 
const dotenv = require('dotenv');
dotenv.config();

console.log("Google ID:", process.env.GOOGLE_CLIENT_ID);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await new User({
        username: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value
      }).save();
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ facebookId: profile.id });
    if (!user) {
      user = await new User({
        username: profile.displayName,
        facebookId: profile.id,
        email: profile.emails?.[0]?.value || ''
      }).save();
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));
