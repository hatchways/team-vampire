const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const { json, urlencoded } = express;

var app = express();

const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost/test";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", function(){
  console.log('Database connected successfully');
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
  availability:     String,
  meetings:         String
});

const User = mongoose.model('User', userSchema);

const johndoe = new User({ 
  userName: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  timezone: 'UTC+3',
  profilePicture: 'profile_picture.jpg',
  accessToken: 'some_access_token_321',
  stripeCustomerId: 'johns_stripe_id_101',
  availability: 'open for business',
  meetings: '12'
});

johndoe.save(function (err, fluffy) {
  if (err) return console.error(err);
  console.log('added to database!');
});

/* Mongoose Test - WILL DELETE

const kittySchema = new mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function() {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
} 

const Kitten = mongoose.model('Kitten', kittySchema);

const fluffy = new Kitten({ name: 'fluffy' });

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

const silence = new Kitten({ name: 'Silence' });
console.log(silence.name);

silence.save();

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
});
*/

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
