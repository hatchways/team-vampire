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

module.exports = availabilitiesRouter;