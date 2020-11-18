const usersRouter = require("express").Router();
const { response } = require("express");
const { User } = require("../models/");

// Create User - WILL REPLACE WITH GOOGLE LOGIN INFO
usersRouter.post("/", (request, response, next) => {
    const body = request.body;

    const user = new User({
        userName: "tony_stark",
        email: "tony@stark.com",
        accessToken: "tonys_access_token"
    });

    user.save()
        .then(savedUser => {
            console.log(savedUser);
            response.json(savedUser);
        })
        .catch(error => {
            console.error(error);
            next(error)
        });
});

// Fetch/Read All Users
usersRouter.get('/', (request, response) => {
    User.find({}).then(users => {
        console.log(users);
        response.json(users);
    });
});

module.exports = usersRouter;