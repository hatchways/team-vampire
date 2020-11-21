const passport = require("passport");
const app = require("../app");
const authRouter = require("express").Router();

// @desc Auth with Google
// @route GET / 
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// @desc Google Auth Callback
// @route GET /auth/google/callback
authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), 
    (request, response) => {
        // response.json({
        //     "status":"success",
        //     "message": "user authenticated!"
        // }).end();
        // response.send(request.user);
        response.redirect("http://localhost:3000/profile");
    }
);

// @desc Get user data
authRouter.get("/users/me", (request, response) => {
    console.log(request.user);
    response.send(request.user);
});

module.exports = authRouter;
