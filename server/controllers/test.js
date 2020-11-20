const testRouter = require("express").Router();
const { ensureAuth, ensureGuest } = require("../utils/auth");

// @desc Login/Landing Test Page
// @route GET
testRouter.get("/", ensureGuest, (request, response) => {
    response.send("Login");
});

// @desc Dashboard Test Page
// @route GET
testRouter.get("/dashboard", ensureAuth, (request, response) => {
    response.send("Dashboard");
});

module.exports = testRouter;