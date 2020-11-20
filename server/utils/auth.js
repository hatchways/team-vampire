// Authentication MiddleWare 

const ensureAuth = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.json({
            "status": "error",
            "message": "user is not authenticated"
        });
        // change to a res.redirect to login page
    }
};

const ensureGuest = (request, response, next) => {
    if (request.isAuthenticated()) {
        response.json({
            "status": "success",
            "message": "user is authenticated"
        });
        // change to a res.redirect to dashboard page 
    } else {
        return next();
    }
};

module.exports = {
    ensureAuth,
    ensureGuest
};