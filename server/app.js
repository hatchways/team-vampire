const config = require("./utils/config");
const express = require("express");
// const createError = require("http-errors"); // not using this for now since using errors middleware
const app = express();
const { join } = require("path");
const cookieParser = require("cookie-parser");
// const logger = require("morgan"); // not using this for now since using logger from ./utils/logger
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

// Database Setup

const mongoose = require("mongoose");
const mongoDB = `mongodb://${config.DB_SERVER}/${config.DB_NAME}`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", function(){
    logger.info("Database connected successfully");
}).on("error", function(err){
    logger.error("Error", err);
});

const { json, urlencoded } = express;

app.use(express.json());
app.use(middleware.requestLogger);

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");


// Controllers
const { usersRouter, availabilitiesRouter, meetingTypesRouter, appointmentsRouter } = require("./controllers/");
app.use("/api/users", usersRouter);
app.use("/api/availabilities", availabilitiesRouter);
// app.use("/api/users/meetings"); // appointments will go in here
app.use("/api/meeting_types", meetingTypesRouter);
app.use("/api/appointments", appointmentsRouter);

// app.use(logger("dev")); // not using this for now since using logger from ./utils/logger.js
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