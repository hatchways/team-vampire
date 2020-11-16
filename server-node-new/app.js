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
  userName:         { type: String, index: true, unique: true, sparse: true }, // not sure if this is the standard implementation to allow null to not be unique
  firstName:        String,
  lastName:         String,
  email:            { type: String, required: true }, // remove unique: true for testing
  timezone:         String,
  profilePicture:   String,
  accessToken:      { type: String, required: true },
  stripeCustomerId: String,
  createdAt:        { type: Date, default: Date.now }, 
  updatedAt:        { type: Date, default: Date.now },
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

const meetingSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name:         { type: String, default: "60 Minute Meeting" },
  description:  { type: String, default: "One-on-One" },
  duration:     { type: Number, required: true, default: 60 },
  createdAt:    { type: Date, default: Date.now }, 
  updatedAt:    { type: Date, default: Date.now },  
});

const Meeting = mongoose.model("Meeting", meetingSchema);

const appointmentSchema = new mongoose.Schema({
  meeting:      { type: mongoose.Schema.Types.ObjectId, ref: "Meeting" },
  name:         { type: String, required: true, default: "My Appointment" },
  email:        { type: String, required: true, default: "nickfury@shield.com" },
  time:         { type: Date, required: true, default: Date.now },
  timezone:     { type: String, required: true, default: "UTC 0" },
  createdAt:    { type: Date, default: Date.now }, 
  updatedAt:    { type: Date, default: Date.now },  
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

// Add User, Availability, and appointment to Database Test - WILL DELETE
/*
const createUser = function(email, accessToken) {
  const newUser = new User({
    email,
    accessToken
  });

  return newUser.save();
};

const createAvailability = function(user) {
  const availability = new Availability({
    user,
    day: 1
  });

  return availability.save();
};

const createMeeting = function(user) {
  const meeting = new Meeting({
    user
  });

  return meeting.save();
};

function getStuff(user) {
  const availability = createAvailability(user);
  const meeting = createMeeting(user);

  return {
    availability,
    meeting
  };
};

createUser('black@widow.com', 'nats_access')
  .then(user => {
    console.log("> Created new User\n", user);

    const userId = user._id.toString();
    return getStuff(userId);
  })
  .then(availability => {
    console.log("> Created new availability\n", availability)
  })
  .then(meeting => {
    console.log("> Created new meeting\n", meeting)
  })
  .catch(err => console.log(err));

const showAllAvailability = async function() {
  const availabilities = await Availability.find().populate("user");
  console.log("> All Availabilities\n", availabilities);
};

showAllAvailability();

const createAppointment = function(meeting) {
  const appointment = new Appointment({
    meeting
  });

  return appointment.save();
};

createMeeting('5fb1dff54ae04e1f7bd49c10') // user_id string literal
  .then(meeting => {
    console.log("> Created new meeting\n", meeting);
    const meetingId = meeting._id.toString();
    return createAppointment(meetingId);
  })
  .then(appointment => {
    console.log("> Created new appointment\n", appointment);
  })
  .catch(err => console.log(err));

const showAllMeetings = async function() {
  const meetings = await Meeting.find().populate("user");
  console.log("> All Meetings\n", meetings);
};

showAllMeetings();

const showAllAppointments = async function() {
  const appointments = await Appointment.find().populate("meeting");
  console.log("> All appointments\n", appointments);
};

showAllAppointments();
*/ // TESTING MONGODB FUNCTIONALITY - WILL DELETE LATER


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
