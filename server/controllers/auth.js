const passport = require("passport");
const { ensureAuth } = require("../utils/auth");
const authRouter = require("express").Router();
const { google } = require("googleapis");

// @desc Auth with Google
// @route GET / 
authRouter.get("/google", passport.authenticate("google", 
    { 
        scope: 
        [
            "profile",
            "email", 
            "https://www.googleapis.com/auth/calendar"
        ], 
        accessType: "offline", 
        prompt: "consent" 
    }
));

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
authRouter.get("/calendar", ensureAuth, (request, response) => {

    console.log(request.user);

    const oauth2Client = new google.auth.OAuth2({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    });

    oauth2Client.credentials = {
        access_token: request.user.accessToken,
        refresh_token: request.user.refreshToken
    }; 
    console.log(oauth2Client.credentials);
      
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
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

authRouter.get("/logout", function(req, res){
    req.logout();
    res.redirect("http://localhost:3000");
});

module.exports = authRouter;
