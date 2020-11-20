const usersRouter = require("express").Router();
const { User } = require("../models/");

// Create User - WILL REPLACE WITH DATA RETRIEVED FROM GOOGLE AUTHORIZATION
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

// Fetch/Read All Users
usersRouter.get("/", async (request, response) => {
    const users = await User.find({});
    response.json(users.map(user => user.toJSON()));
});

// Fetch/Read Single User
usersRouter.get("/:username", async (request, response) => {
    const user = await User.findOne({ userName:request.params.username });
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

// Update User - PROBABLY NEEDS TO BE CHANGED TO PATCH ROUTE
// How to make this an authenticated route?
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

usersRouter.delete("/:id", async (request, response) => {
    await User.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

module.exports = usersRouter;