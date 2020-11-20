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
availabilitiesRouter.get("/", (request, response, next) => {
    Availability.find({})
        .then(availabilities => response.json(availabilities))
        .catch(error => next(error));
});

// Update Availabity
availabilitiesRouter.patch("/:id", (request, response, next) => {
    console.log(request.params);
    const body = request.body;

    Availability.findById(request.params.id)
        .then(availability => {
            console.log(availability);
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

                availability.save();
                response.json(availability);


            } else {
                response.status(404)
                    .json({
                        "status":"error",
                        "message": "availability does not exist"
                    }).end();
            }

        })
        .catch(error => next(error));
});

module.exports = availabilitiesRouter;