const authRouter = require("./auth");
const usersRouter = require("./user");
const availabilitiesRouter = require("./availability");
const meetingTypesRouter = require("./meetingType");
const appointmentsRouter = require("./appointment");

const testRouter = require("./test");

module.exports = { 
    authRouter,
    usersRouter,
    availabilitiesRouter,
    meetingTypesRouter,
    appointmentsRouter,
    testRouter
};