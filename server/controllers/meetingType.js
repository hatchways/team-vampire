const meetingTypesRouter = require("express").Router();
const { MeetingType, User } = require("../models");

// Create Meeting
// How to make this an authenticated route?
meetingTypesRouter.post("/", (request, response, next) => {
    const body = request.body;
    // const userName = request.params.username;
    const meetingType = new MeetingType({
        // user:           body.user, // User.findById({ userName: userName }) figure out the correct method
        name:           body.name,
        description:    body.description,
        duration:       body.endTime
    });

    // Need to add logic for connecting meeting to users availability

    meetingType.save()
        .then(savedMeetingType => {
            console.log(savedMeetingType);
            response.json(savedMeetingType);
        })
        .catch(error => next(error));
});

// Fetch/Read All meetings
meetingTypesRouter.get("/", (request, response, next) => {
    MeetingType.find({})
        .then(meetingTypes => response.json(meetingTypes))
        .catch(error => next(error));
});

module.exports = meetingTypesRouter;