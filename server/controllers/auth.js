const passport = require("passport");
const authRouter = require("express").Router();

// @desc Auth with Google
// @route GET / 
authRouter.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc Google Auth Callback
// @route GET /auth/google/callback
authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), 
    (request, response) => {
        response.json({
            "status":"success",
            "message": "user authenticated!"
        }).end();
    }
);

module.exports = authRouter;
