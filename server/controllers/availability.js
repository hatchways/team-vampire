const availabilitiesRouter = require("express").Router();
const { Availability, User } = require("../models/");

// Create Availability
// How to make this an authenticated route?
availabilitiesRouter.post("/", async (request, response, next) => {
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

// Fetch/Read All Availabilities
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

// Update Availabity
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

// Delete Availability
availabilitiesRouter.delete("/:id", async (request, response) => {
    await Availability.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

module.exports = availabilitiesRouter;