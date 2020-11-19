const availabilitiesRouter = require("express").Router();
const { Availability } = require("../models/");

// Create Availability
// How to make this an authenticated route?
availabilitiesRouter.post("/", (request, response, next) => {
    const body = request.body;
    const availability = new Availability({
        day:        body.day,
        startTime:  body.startTime,
        endTime:    body.endTime
    });

    // Need to add logic for connecting availability to user

    availability.save()
        .then(savedAvailability => {
            console.log(savedAvailability);
            response.json(savedAvailability);
        })
        .catch(error => next(error));
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