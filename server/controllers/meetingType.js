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
meetingTypesRouter.get("/", async (request, response) => {
    const meetingTypes = await MeetingType.find({})
        .populate("appointments", {
            name: 1,
            email: 1,
            time: 1,
            timezone: 1
        });
    response.json(meetingTypes);
});

// Update Meeting Type
meetingTypesRouter.patch("/:id", async (request, response) => {
    const body = request.body;

    const meetingType = await MeetingType.findById(request.params.id);

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

        await meetingType.save();
        response.json(meetingType);


    } else {
        response.status(404)
            .json({
                "status":"error",
                "message": "meeting type does not exist"
            }).end();
    }
});

// Delete Meeting Type
meetingTypesRouter.delete("/:id", async (request, response) => {
    await MeetingType.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

module.exports = meetingTypesRouter;