const authRouter = require("./auth");
const usersRouter = require("./user");
const availabilitiesRouter = require("./availability");
const meetingTypesRouter = require("./meetingType");
const appointmentsRouter = require("./appointment");

module.exports = { authRouter, usersRouter, availabilitiesRouter, meetingTypesRouter, appointmentsRouter };