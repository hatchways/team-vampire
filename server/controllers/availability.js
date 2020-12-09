const availabilitiesRouter = require("express").Router();
const { Availability, User } = require("../models/");
const { google } = require("googleapis");

// @desc FreeBusy
// @route GET /
availabilitiesRouter.get("/freebusy", (request, response) => {
    const oauth2Client = new google.auth.OAuth2({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    });

    oauth2Client.credentials = {
        access_token: request.user.accessToken,
        refresh_token: request.user.refreshToken
    }; 

    // Create a new event start date instance for temp uses in our calendar.
    const eventStartTime = new Date();
    eventStartTime.setDate(eventStartTime.getDay());

    // Create a new event end date instance for temp uses in our calendar.
    const eventEndTime = new Date();
    eventEndTime.setDate(eventEndTime.getDay());
    eventEndTime.setHours(eventEndTime.getHours() + 23);

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    calendar.freebusy.query({
        headers: { "content-type" : "application/json" },
        resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            timezone: "America/Toronto",
            items: [{ id: "primary" }],            
        }
    }, 
    (err, response) => {
        if (err) return console.error("Free Busy Query Error: ", err);
        
        const eventsList = response.data.calendars.primary.busy;

        if (eventsList.length === 0) {
            console.log("No upcoming events found");
        } else {
            console.log("Upcoming Event Times \n", eventsList);
        }

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