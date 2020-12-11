const availabilitiesRouter = require("express").Router();
const { Availability, User } = require("../models/");
const { google } = require("googleapis");

// @desc FreeBusy
// @route GET /freebusy?date=143213434&meetingTypeID=df34234fgdg235
availabilitiesRouter.get("/freebusy", (request, response) => {
    // request.query.meetingTypeID
    // request.query.date // must be in datetime format
    const oauth2Client = new google.auth.OAuth2({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    });

    oauth2Client.credentials = {
        access_token: request.user.accessToken,
        refresh_token: request.user.refreshToken
    }; 

    const availStartTime = new Date(2020, 11, 11, 9, 0, 0, 0);
    // console.log(availStartTime.toLocaleString());

    const availEndTime = new Date(2020, 11, 11, 17, 0, 0, 0);
    // console.log(availEndTime.toLocaleString());

    // Duration in minutes
    const duration = 60;

    // Empty Availability Time Slot Array
    const potentialTimeSlotList = [];

    let potentialAvailStartTime = new Date(availStartTime);
    let potentialAvailEndTime = new Date(availStartTime.setMinutes( availStartTime.getMinutes() + duration));
    while (potentialAvailEndTime <= availEndTime) {
        potentialTimeSlotList.push(new Date(potentialAvailStartTime));
        potentialAvailStartTime.setMinutes(potentialAvailStartTime.getMinutes() + duration);
        potentialAvailEndTime.setMinutes(potentialAvailEndTime.getMinutes() + duration);
    }

    // console.log(potentialTimeSlotList);

    const actualTimeSlotList = [];

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    potentialTimeSlotList.forEach((timeSlot) => {
        // console.log("timeSlot", timeSlot.toLocaleString());
        const currentTimeSlot = new Date(timeSlot);
        const timeMin = new Date(timeSlot);
        // console.log("time min", timeMin.toLocaleString());
        const timeMax = new Date(timeSlot.setMinutes(timeSlot.getMinutes() + duration - 1)); // subtracted 1 minute to allow booking for available time slots that are 1 hour exactly
        // console.log("time max", timeMax.toLocaleString());
        // console.log("current timeslot", currentTimeSlot.toLocaleString());
        calendar.freebusy.query({
            headers: { "content-type" : "application/json" },
            resource: {
                timeMin,
                timeMax,
                timezone: "America/Toronto",
                items: [{ id: "primary" }],            
            }
        }, 
        (err, response) => {
            if (err) return console.error("Free Busy Query Error: ", err);
            
            const eventsList = response.data.calendars.primary.busy;

            if (eventsList.length === 0) {
                // console.log("Time Slot Available");
                // console.log(currentTimeSlot.toLocaleString());
                actualTimeSlotList.push(new Date(currentTimeSlot));
                // console.log(actualTimeSlotList);
            } else {
                // console.log("Time Slot Not Available \n", eventsList);
            }

            console.log("time slots available: ", actualTimeSlotList); // how to return this 
            // return actualTimeSlotList;
        });
        console.log("time slots available: ", actualTimeSlotList);


    });
    // console.log("time slots available: ", actualTimeSlotList);
    // response.json(actualTimeSlotList);

    
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