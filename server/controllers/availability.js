const availabilitiesRouter = require("express").Router();
const { Availability, User } = require("../models/");
const { google } = require("googleapis");

// @desc FreeBusy
// @route GET /freebusy?date=143213434&meetingTypeID=df34234fgdg235
availabilitiesRouter.get("/freebusy", async (request, response) => {
    const { day, month, year } = request.query;
    const duration = Number(request.query.duration);
    const user = await User.findById(request.query.user);

    const oauth2Client = new google.auth.OAuth2({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    });

    oauth2Client.credentials = {
        access_token: user.accessToken,
        refresh_token: user.refreshToken
    }; 

    const availStartTime = new Date(year, month, day, 9, 0, 0, 0);
    const availEndTime = new Date(year, month, day, 17, 0, 0, 0);


    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    calendar.freebusy.query({
        headers: { "content-type" : "application/json" },
        resource: {
            timeMin: availStartTime, // 9 AM
            timeMax: availEndTime, // 5 pm
            timezone: "America/Toronto",
            items: [{ id: "primary" }],            
        }
    }, 
    (err, res) => {
        if (err) return console.error("Free Busy Query Error: ", err);
        const actualTimeSlotList = [];
        let potentialSlotStartTime = new Date(availStartTime);
        let potentialSlotEndTime = new Date(potentialSlotStartTime);
        potentialSlotEndTime.setMinutes( potentialSlotEndTime.getMinutes() + duration );
        const eventsList = res.data.calendars.primary.busy;
        // If there are no events existing in the calendar
        if (!eventsList.length) {
            while (potentialSlotEndTime  <= availEndTime) {
                actualTimeSlotList.push({
                    start: new Date (potentialSlotStartTime),
                    end: new Date (potentialSlotEndTime)
                });
                potentialSlotStartTime.setMinutes( potentialSlotStartTime.getMinutes() + duration );
                potentialSlotEndTime.setMinutes( potentialSlotEndTime.getMinutes() + duration );
            }
        } else {
            eventsList.forEach((event, index) => {
                const eventStartTime = new Date(event.start);
                const eventEndTime = new Date(event.end);
                if (potentialSlotEndTime > eventStartTime) {
                    potentialSlotStartTime = new Date(eventEndTime); // sets the potential start time to the end of the current event time to check for the next opening
                    potentialSlotEndTime = new Date(eventEndTime);
                    potentialSlotEndTime.setMinutes( potentialSlotEndTime.getMinutes() + duration );
                } else {
                    while (potentialSlotEndTime  <= eventStartTime) {
                        actualTimeSlotList.push({
                            start: new Date (potentialSlotStartTime),
                            end: new Date (potentialSlotEndTime)
                        });
                        potentialSlotStartTime.setMinutes( potentialSlotStartTime.getMinutes() + duration );
                        potentialSlotEndTime.setMinutes( potentialSlotEndTime.getMinutes() + duration );
                    }
                    potentialSlotStartTime = new Date(eventEndTime);
                    potentialSlotEndTime = eventEndTime;
                    potentialSlotEndTime.setMinutes( potentialSlotEndTime.getMinutes() + duration );
                }
                // if this is the last event on the calendar
                if (eventsList.length - 1 === index) {
                    // checks if there is space after the last event until the availability end time: 5pm
                    while (potentialSlotEndTime  <= availEndTime) {
                        actualTimeSlotList.push({
                            start: new Date (potentialSlotStartTime),
                            end: new Date (potentialSlotEndTime)
                        });
                        potentialSlotStartTime.setMinutes( potentialSlotStartTime.getMinutes() + duration );
                        potentialSlotEndTime.setMinutes( potentialSlotEndTime.getMinutes() + duration );
                    }
                } 
            });
        }
        response.json(actualTimeSlotList);
    });
});    

// @desc Create Availability
// @route POST /
availabilitiesRouter.post("/", async (request, response) => {
    const body = request.body;
    const user = await User.findById(body.userId);
    const availability = new Availability({
        user:       user._id,
        day:        body.day,
        startTime:  body.startTime,
        endTime:    body.endTime
    });

    const savedAvailability = await availability.save();
    user.availabilities = user.availabilities.concat(savedAvailability._id);
    await user.save();

    response.json(savedAvailability);
  
});

// @desc Fetch/Read All Availabilities
// @route GET /
availabilitiesRouter.get("/", async (request, response) => {
    const availabilities = await Availability.find({})
        .populate("user", {
            userName: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            timezone: 1
        });
    response.json(availabilities);
});

// @desc Update Availabity
// @route PATCH /:id
availabilitiesRouter.patch("/:id", async (request, response) => {
    const body = request.body;

    const availability = await Availability.findById(request.params.id);

    if (availability) { // Update availability if the following keys exist in body
        if (body.day) {
            availability.day = body.day;
        }
        if (body.startTime) {
            availability.startTime = body.startTime;
        }
        if (body.endTime) {
            availability.endTime = body.endTime;
        }

        availability.updatedAt = Date(Date.now());

        await availability.save();
        response.json(availability);


    } else {
        response.status(404)
            .json({
                "status":"error",
                "message": "availability does not exist"
            }).end();
    }
});

// @desc Delete Availability
// @route DELETE /:id
availabilitiesRouter.delete("/:id", async (request, response) => {
    await Availability.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

module.exports = availabilitiesRouter;