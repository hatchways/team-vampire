const passport = require("passport");
const app = require("../app");
const { ensureAuth } = require("../utils/auth");
const authRouter = require("express").Router();

// @desc Auth with Google
// @route GET / 
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// @desc Google Auth Callback
// @route GET /auth/google/callback
authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), 
    (request, response) => {
        response.redirect("http://localhost:3000/profile");
    }
);

// @desc Get user data
authRouter.get("/users/me", ensureAuth, (request, response) => {
    console.log("sessions passport", request.session.passport);
    console.log("request user", request.user);
    response.status(200).json({
        authenticated: true,
        message: "user successfully authenticated",
        user: request.user,
        cookies: request.cookies
    });
});

module.exports = authRouter;
