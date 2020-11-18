const config = require('./utils/config');

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
const mongoDB = `mongodb://${config.DB_SERVER}/${config.DB_NAME}`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", function(){
  console.log("Database connected successfully");
}).on("error", function(err){
  console.log("Error", err);
});

// Controllers
const usersRouter = require("./controllers/user");
app.use("/api/users", usersRouter);

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

// Testing Database Out - Will Delete or Move to another folder

/*
const { User, Availability, Meeting, Appointment } = require("./models/");

const showAllUsers = async function() {
  const users = await User.find();
  console.log("> All Users\n", users);
};

showAllUsers();

const showAllAvailability = async function() {
  const availabilities = await Availability.find();
  console.log("> All Availabities\n", availabilities);
};

showAllAvailability();

const showAllUsers = async function() {
  const users = await User.find();
  console.log("> All Users\n", users);
};

showAllUsers();

const showAllUsers = async function() {
  const users = await User.find();
  console.log("> All Users\n", users);
};

showAllUsers();

Add User, Availability, and appointment to Database Test


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

const createAppointment = function(meeting) {
  const appointment = new Appointment({
    meeting
  });

  return appointment.save();
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
    console.log("> Created new availability\n", availability);
  })
  .then(meeting => {
    console.log("> Created new meeting\n", meeting);
    const meetingId = meeting._id.toString();
    return createAppointment(meetingId);
  })
  .then(appointment => {
    console.log("> Created new appointment\n", appointment);
  })
  .catch(err => console.log(err));

const showAllAvailability = async function() {
  const availabilities = await Availability.find().populate("user");
  console.log("> All Availabilities\n", availabilities);
};

showAllAvailability();

createAppointment('5fb31d78cc8fea0719ead1fa');

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
*/
 // TESTING MONGODB FUNCTIONALITY - WILL DELETE LATER