const meetingTypesRouter = require("express").Router();
const { MeetingType, User } = require("../models");

// Create Meeting
// How to make this an authenticated route?
meetingTypesRouter.post("/", async (request, response) => {
    const body = request.body;
    const user = await User.findById(body.userId);
    const meetingType = new MeetingType({
        user:           user._id, 
        name:           body.name,
        description:    body.description,
        duration:       body.duration
    });

    const savedMeetingType = await meetingType.save();
    user.meetingTypes = user.meetingTypes.concat(savedMeetingType._id);
    await user.save();

    response.json(savedMeetingType);
});

// Fetch/Read All meetings
meetingTypesRouter.get("/", (request, response, next) => {
    MeetingType.find({})
        .then(meetingTypes => response.json(meetingTypes))
        .catch(error => next(error));
});

// Update Meeting Type
meetingTypesRouter.patch("/:id", (request, response, next) => {
    console.log(request.params);
    const body = request.body;

    MeetingType.findById(request.params.id)
        .then(meetingType => {
            console.log(meetingType);
            if (meetingType) { // Update meetingType if the following keys exist in body
                if (body.name) {
                    meetingType.name = body.name;
                }
                if (body.description) {
                    meetingType.description = body.description;
                }
                if (body.duration) {
                    meetingType.duration = body.duration;
                }

                meetingType.updatedAt = Date(Date.now());

                meetingType.save();
                response.json(meetingType);


            } else {
                response.status(404)
                    .json({
                        "status":"error",
                        "message": "meeting type does not exist"
                    }).end();
            }

        })
        .catch(error => next(error));
});

module.exports = meetingTypesRouter;