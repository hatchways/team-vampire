const usersRouter = require("express").Router();
const { User } = require("../models/");

// @desc Create User - WILL REPLACE WITH DATA RETRIEVED FROM GOOGLE AUTHORIZATION
// @route POST /
usersRouter.post("/", async (request, response) => {
    const body = request.body;
    
    const user = new User({
        userName:    body.userName,
        email:       body.email,
        accessToken: body.accessToken
    });

    const savedUser = await user.save();
    response.json(savedUser.toJSON());
});

// @desc Fetch/Read All Users
// @route GET /
usersRouter.get("/", async (request, response) => {
    const users = await User.find({})
        .populate("availabilities", {
            day: 1,
            startTime: 1,
            endTime: 1
        })
        .populate({
            path: "meetingTypes",
            model: "MeetingType",
            populate: {
                path: "appointments",
                model: "Appointment",
                select: {
                    "name": 1,
                    "email": 1,
                    "time": 1,
                    "timezone": 1
                }
            }
        });
    response.json(users.map(user => user.toJSON()));
});

// @desc Fetch/Read Single User
// @route GET /:username
usersRouter.get("/:username", async (request, response) => {
    const user = await User.findOne({ userName:request.params.username })
        .populate("availabilities", {
            day: 1,
            startTime: 1,
            endTime: 1
        })
        .populate({
            path: "meetingTypes",
            model: "MeetingType",
            populate: {
                path: "appointments",
                model: "Appointment",
                select: {
                    "name": 1,
                    "email": 1,
                    "time": 1,
                    "timezone": 1
                }
            }
        });
    if (user) {
        response.json(user.toJSON());
    } else {
        response.status(404)
            .json({
                "status":"error",
                "message": "user does not exist"
            }).end();
    }
});

// @desc Update User
// @route PATCH /:username
usersRouter.patch("/:username", async (request, response) => {
    const body = request.body;

    const user = await User.findOne({ userName:request.params.username });

    if (user) { // Update User if the following keys exist in body
        if (body.userName) {
            user.userName = body.userName;
        }
        if (body.firstName) {
            user.firstName = body.firstName;
        }
        if (body.lastName) {
            user.lastName = body.lastName;
        }
        if (body.email) {
            user.email = body.email;
        }
        if (body.timezone) {
            user.timezone = body.timezone;
        }
        if (body.profilePicture) {
            user.profilePicture = body.profilePicture;
        }

        user.updatedAt = Date(Date.now());

        await user.save();
        response.json(user);


    } else {
        response.status(404)
            .json({
                "status":"error",
                "message": "user does not exist"
            }).end();
    }
});

// @desc Delete User
// @route DELETE /:id
usersRouter.delete("/:id", async (request, response) => {
    await User.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

module.exports = usersRouter;