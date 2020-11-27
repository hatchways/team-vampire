const passport = require("passport");
const { ensureAuth } = require("../utils/auth");
const authRouter = require("express").Router();

// @desc Auth with Google
// @route GET / 
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// @desc Google Auth Callback
// @route GET /auth/google/callback
authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), 
    (request, response) => {
        response.redirect("http://localhost:3000/event_types/user/me");
    }
);

// @desc Get user data
// @route GET /users/me
authRouter.get("/users/me", ensureAuth, (request, response) => {
    response.status(200).json({
        authenticated: true,
        message: "user successfully authenticated",
        user: request.user,
        cookies: request.cookies
    });
});

module.exports = authRouter;
