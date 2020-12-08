const passport = require("passport");
const { ensureAuth } = require("../utils/auth");
const authRouter = require("express").Router();
const { google } = require("googleapis");

// @desc Auth with Google
// @route GET / 
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"] }));

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

// @desc Get calendar list
// @route GET /calendarList
authRouter.get("/calendarList", ensureAuth, (request, response) => {
    
    const calendar = google.calendar("v3");
    calendar.events.list({
        calendarId: "primary",
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
    }, (err, res) => {
        if (err) return console.log("The API returned an error: " + err);
        const events = res.data.items;
        if (events.length) {
            console.log("Upcoming 10 events:");
            events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
            });
        } else {
            console.log("No upcoming events found.");
        }
    });
  
});

module.exports = authRouter;
