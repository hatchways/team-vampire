const usersRouter = require("express").Router();
const { User } = require("../models/");

// Create User - WILL REPLACE WITH DATA RETRIEVED FROM GOOGLE AUTHORIZATION
usersRouter.post("/", (request, response, next) => {
    const user = new User({
        userName: body.userName,
        email: body.email,
        accessToken: body.accessToken
    });

    user.save()
        .then(savedUser => {
            console.log(savedUser);
            response.json(savedUser);
        })
        .catch(error => {
            console.error(error);
            response.json(error);
            next(error)
        });
});

// Fetch/Read All Users
usersRouter.get("/", (request, response) => {
    User.find({}).then(users => {
        response.json(users);
    });
});

// Fetch/Read Single User
usersRouter.get("/:username", (request, response, next) => {
    const userName = request.params.username;
    User.findOne({ userName: userName })
        .then(user => {
            if (user) {
                console.log("user", user);
                response.json(user)
            } else {
                response.status(404)
                    .json({
                        "status":"error",
                        "message": "user does not exist"
                    }).end()
            }
        })
        .catch(error => {
            console.error(error);
            next(error);
        })
});

module.exports = usersRouter;