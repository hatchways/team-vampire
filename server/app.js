const config = require("./utils/config");
const middleware = require("./utils/middleware");

// const createError = require("http-errors");
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

app.use(express.json());
app.use(middleware.requestLogger);


// Controllers
const { usersRouter, availabilitiesRouter, meetingTypesRouter, appointmentsRouter } = require("./controllers/");
app.use("/api/users", usersRouter);
app.use("/api/availabilities", availabilitiesRouter);
// app.use("/api/users/meetings"); // appointments will go in here
app.use("/api/meeting_types", meetingTypesRouter);
app.use("/api/appointments", appointmentsRouter);

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   console.error(err.message);
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json({ error: err });
// });