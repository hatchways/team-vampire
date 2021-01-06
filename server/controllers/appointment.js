const appointmentsRouter = require("express").Router();
const { Appointment, MeetingType, User } = require("../models/");
const { google } = require("googleapis");
const refresh = require("passport-oauth2-refresh");

// @desc Create Appointments
// @route POST /
appointmentsRouter.post("/", async (request, response) => {
    const body = request.body;
    // console.log(body)
    const meetingType = await MeetingType.findById(body.meetingTypeId);
    // console.log(meetingType)

    const appointment = new Appointment({
        meetingType:    meetingType._id,
        name:           body.name,
        email:          body.email,
        timeStart:      body.timeStart,
        timeEnd:        body.timeEnd,
        timezone:       body.timezone
    });

    const savedAppointment = await appointment.save();
    meetingType.appointments = meetingType.appointments.concat(savedAppointment._id);
    await meetingType.save();

    response.json(savedAppointment);
});

// @desc Add Event to Google Calendar
// @route GET /addevent
appointmentsRouter.post("/addevent", async (request, response) => {
    const body = request.body;
    console.log(body);

    const { userId, eventTypeName, name, timeStart, timeEnd } = body;
    const user = await User.findById(userId);

    const event = {
        summary: `${eventTypeName} with ${name}`,
        start: {
            dateTime: timeStart,
            timeZone: "America/Toronto"
        },
        end: {
            dateTime: timeEnd,
            timeZone: "America/Toronto"
        },
        colorId: 1
    };

    let retries = 2;

    addEvent(user.accessToken, user.refreshToken);

    function addEvent(accessToken, refreshToken) {
        retries--;
        if(retries > 0) {
            const oauth2Client = new google.auth.OAuth2({
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/api/auth/google/callback"
            });
    
            oauth2Client.credentials = {
                access_token: accessToken,
                refresh_token: refreshToken
            }; 

            const calendar = google.calendar({ version: "v3", auth: oauth2Client });
        
            calendar.freebusy.query({
                headers: { "content-type" : "application/json" },
                resource: {
                    timeMin: timeStart, 
                    timeMax: timeEnd,
                    timezone: "America/Toronto",
                    items: [{ id: "primary" }],            
                }
            }, 
            (err, res) => {
                if (err) {
                    // DRY CODE - need to change
                    console.error("Free Busy Query Error: ", err);
                    // Get new Access Token and save it to user
                    console.log("refresh token", user.refreshToken);
                    refresh.requestNewAccessToken("google", user.refreshToken, function(err, accessToken) {
                        if (err || !accessToken ) { return response.status(401).end(); }
                        // Save the new Access Token
                        user.accessToken = accessToken;
                        user.save(() => {
                            // Retry the Request
                            addEvent(user.accessToken, user.refreshToken);
                        });
                    });
                } else {
                    const eventsArr = res.data.calendars.primary.busy;

                    if(eventsArr.length === 0) 
                        return calendar.events.insert(
                            {
                                calendarId: "primary",
                                resource: event
                            }, err => {
                                if (err) return console.error("Calendar Event Creation Error: ", err);

                                return console.log("Calendar Event Created.");
                            });
                    
                    return console.log("Sorry, Event already there.");
                }
            });
        }
    }
});

// @desc Fetch/Read All Appointments
// @route GET /
appointmentsRouter.get("/", async (request, response) => {
    const appointments = await Appointment.find({});
    response.json(appointments);
});

// @desc Update Appointments
// @route PATCH /:id
appointmentsRouter.patch("/:id", async (request, response) => {
    const body = request.body;

    const appointment = await Appointment.findById(request.params.id);

    if (appointment) { // Update appointment if the following keys exist in body
        if (body.name) {
            appointment.name = body.name;
        }
        if (body.email) {
            appointment.email = body.email;
        }
        if (body.time) {
            appointment.time = body.time;
        }
        if (body.timezone) {
            appointment.timezone = body.timezone;
        }

        appointment.updatedAt = Date(Date.now());

        await appointment.save();
        response.json(appointment);

    } else {
        response.status(404)
            .json({
                "status":"error",
                "message": "appointment does not exist"
            }).end();
    }
});

// @desc Delete Appointments
// @route DELETE /:id
appointmentsRouter.delete("/:id", async (request, response) => {
    await Appointment.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

module.exports = appointmentsRouter;