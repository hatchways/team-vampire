// May not be relevant
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log("access token:",accessToken);
        console.log("refresh token:",refreshToken);
        const newUser = {
            googleId: profile.id,
            accessToken,
            refreshToken,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value
        };

        // Checks if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            console.log("user already exists");
            console.log("old access token", user.accessToken);
            console.log("old refresh token", user.refreshToken);
            const newAccessToken = accessToken;
            const newRefreshToken = refreshToken;
            user = await User.findOneAndUpdate({ googleId: profile.id }, { accessToken: newAccessToken, refreshToken: newRefreshToken }, { new: true });
            console.log(user);
            return done(null, user);
        } else {
            console.log("creating new user");
            user = await User.create(newUser);
            return done(null, user);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
            .populate("availabilities", {
                day: 1,
                startTime: 1,
                endTime: 1
            })
            .populate({
                path: "meetingTypes",
                model: "MeetingType",
                populate: {
                    path: "appointments",
                    model: "Appointment",
                    select: {
                        "name": 1,
                        "email": 1,
                        "time": 1,
                        "timezone": 1
                    }
                }
            });
    });
};