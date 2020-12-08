// Authentication MiddleWare 

const ensureAuth = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect("http://localhost:3000/");
    }
};

const ensureGuest = (request, response, next) => {
    if (request.isAuthenticated()) {
        response.redirect("http://localhost:3000/event_types/user/me");
    } else {
        return next();
    }
};

module.exports = {
    ensureAuth,
    ensureGuest
};