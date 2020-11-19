const meetingsRouter = require("express").Router();
const { Meeting, User } = require("../models");

// Create Meeting
// How to make this an authenticated route?
meetingsRouter.post("/:username/", (request, response, next) => {
    const body = request.body;
    // const userName = request.params.username;
    const meeting = new Meeting({
        user:           body.user, // User.findById({ userName: userName }) figure out the correct method
        name:           body.name,
        description:    body.description,
        duration:       body.endTime
    });

    // Need to add logic for connecting meeting to users availability

    meeting.save()
        .then(savedMeeting => {
            console.log(savedMeeting);
            response.json(savedMeeting);
        })
        .catch(error => {
            console.error(error);
            response.json(error);
            next(error)
        });
});

// Fetch/Read All meetings
meetingsRouter.get("/", (request, response) => {
    Meeting.find({}).then(meetings => {
        response.json(meetings);
    });
});

module.exports = meetingsRouter;