const usersRouter = require("express").Router();
const { User } = require("../models/");

// Create User - WILL REPLACE WITH DATA RETRIEVED FROM GOOGLE AUTHORIZATION
usersRouter.post("/", (request, response, next) => {
    const body = request.body;
    const user = new User({
        userName:    body.userName,
        email:       body.email,
        accessToken: body.accessToken
    });

    user.save()
        .then(savedUser => {
            console.log(savedUser);
            response.json(savedUser);
        })
        .catch(error => next(error));
});

// Fetch/Read All Users
usersRouter.get("/", (request, response, next) => {
    User.find({}).then(users => {
        response.json(users);
    })
        .catch(error => next(error));
});

// Fetch/Read Single User
usersRouter.get("/:username", (request, response, next) => {
    const userName = request.params.username;
    User.findOne({ userName: userName })
        .then(user => {
            if (user) {
                console.log("user", user);
                response.json(user);
            } else {
                response.status(404)
                    .json({
                        "status":"error",
                        "message": "user does not exist"
                    }).end();
            }
        })
        .catch(error => next(error));
});

// Update User - PROBABLY NEEDS TO BE CHANGED TO PATCH ROUTE
// How to make this an authenticated route?
usersRouter.patch("/:username", (request, response, next) => {
    console.log(request.params);
    const body = request.body;

    User.findOne({ userName:request.params.username })
        .then(user => {
            console.log(user);
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

                user.save();
                response.json(user);


            } else {
                response.status(404)
                    .json({
                        "status":"error",
                        "message": "user does not exist"
                    }).end();
            }

        })
        .catch(error => next(error));
});

module.exports = usersRouter;