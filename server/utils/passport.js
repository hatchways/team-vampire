const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");

module.exports = function(passport) {
    // console.log(process.env.GOOGLE_CLIENT_ID);
    passport.use(new GoogleStrategy({
        // clientID: process.env.GOOGLE_CLIENT_ID,
        clientID: "734201335677-kakgc3np91nr45ss5j9f5l89v6b29h0n.apps.googleusercontent.com",
        // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        clientSecret: "cRH2vVlg-jcdto68q-Wr8Y9s",
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
        let user = await User.findOne({ googleId: profile.id })
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

        if (user) {
            console.log("user already exists");
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
        User.findById(id, (err, user) => done(err, user));
    });
};