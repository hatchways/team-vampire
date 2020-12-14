const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
require("express-async-errors");
const app = express();
const { join } = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const refresh = require("passport-oauth2-refresh");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

// Passport Config
// require("./utils/passport")(passport);
// require("./utils/passport")(refresh);

// Database Setup
const mongoose = require("mongoose");
const mongoDB = `mongodb://${config.DB_SERVER}/${config.DB_NAME}`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
const db = mongoose.connection;
db.once("open", function(){
    logger.info("Database connected successfully");
}).on("error", function(err){
    logger.error("Error", err);
});

// Passport Config
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("./models");

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

const strategy =
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        // console.log("access token:",accessToken);
        // console.log("refresh token:",refreshToken);
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
            const newAccessToken = accessToken;
            const newRefreshToken = refreshToken;
            user = await User.findOneAndUpdate({ googleId: profile.id }, { accessToken: newAccessToken, refreshToken: newRefreshToken }, { new: true });
            return done(null, user);
        } else {
            console.log("creating new user");
            user = await User.create(newUser);
            return done(null, user);
        }
    });

// console.log(strategy.name);
passport.use(strategy);
refresh.use(strategy);

const { json, urlencoded } = express;

app.use(express.json());
app.use(middleware.requestLogger);
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    }));

// Sessions
app.use(session({
    secret: "star lord",
    resave: false, // don't save a session unless something is modified
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }) // this doesn't force the user to logout when server restarts
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(logger("dev")); // not using this for now since using logger from ./utils/logger.js
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// eslint-disable-next-line no-undef
app.use(express.static(join(__dirname, "public")));

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

app.use("/", indexRouter);
app.use("/ping", pingRouter);

// Controllers
const { 
    authRouter, 
    usersRouter,
    availabilitiesRouter,
    meetingTypesRouter,
    appointmentsRouter,
    testRouter
} = require("./controllers/");

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/avail", availabilitiesRouter);
app.use("/api/meeting_types", meetingTypesRouter);
app.use("/api/appointments", appointmentsRouter);

app.use("/api/test", testRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;