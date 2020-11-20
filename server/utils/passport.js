const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const { User } = require("../models");

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value
        };

        // Checks if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            console.log("user already exists");
            done(null, user);
        } else {
            console.log("creating new user");
            user = await User.create(newUser);
            done(null, user);
        }

    }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};