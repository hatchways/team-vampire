const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const { json, urlencoded } = express;

var app = express();

// Database Setup

const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost/test";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", function(){
  console.log("Database connected successfully");
}).on("error", function(err){
  console.log("Error", err);
});

// Models

const userSchema = new mongoose.Schema({
  userName:         { type: String, unique: true },
  firstName:        String,
  lastName:         String,
  email:            { type: String, required: true },
  timezone:         String,
  profilePicture:   String,
  accessToken:      { type: String, required: true },
  stripeCustomerId: String,
  createdAt:        { type: Date, default: Date.now }, 
  updatedAt:        { type: Date, default: Date.now },
  meetings:         String
});

const User = mongoose.model("User", userSchema);

const availabilitySchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  day:        { type: Number, required: true },
  startTime:  { type: Number, required: true, default: 540 },
  endTime:    { type: Number, required: true, default: 1020 },
  createdAt:  { type: Date, default: Date.now }, 
  updatedAt:  { type: Date, default: Date.now },  
});

const Availability = mongoose.model("Availability", availabilitySchema);


// Add User & Availability to Database Test - WILL DELETE
// const createUser = function(email, accessToken) {
//   const newUser = new User({
//     email,
//     accessToken
//   });

//   return newUser.save();
// };

// const createAvailability = function(user, day) {
//   const availability = new Availability({
//     user,
//     day
//   });

//   return availability.save();
// };

// createUser('tony@stark.com', 'tonys_access')
//   .then(user => {
//     console.log("> Created new User\n", user);

//     const userId = user._id.toString();
//     return createAvailability(userId, 1);
//   })
//   .then(availability => {
//     console.log("> Created new availability\n", availability);
//   })
//   .catch(err => console.log(err));

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
