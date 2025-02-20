const passport = require("passport");
const User = require("../Models/user")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require("jsonwebtoken")
require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true,
    // scope: ["profile", "email"], // Add this line
}, async (request, accessToken, refreshToken, profile, done) => {
    try {
        console.log("this is my profile",profile);
        
        const [user] = await User.findOrCreate({
            where: { google_id: profile.id },
            defaults: {
                name: profile.displayName,
                email: profile.emails[0].value,
                profile_pix: profile.photos[0].value,
            },
        })
        
        // JWT Token Generation
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '168h',
          });  
        return done(null, { user, token }); // Pass token to the callback);
    } catch (err) {
        return done(err)
    }
}
));

// Serialize and deserialize user sessions
// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//     const user = await User.findByPk(id);
//     done(null, user);
// });

// passport.deserializeUser(async (id, done) => {
// //   const user = await User.findByPk(id);
//   done(null, user);
// });