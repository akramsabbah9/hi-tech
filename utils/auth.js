/* utils/auth.js: middleware that checks if a user is logged in before doing something. */
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect("/login");
    }
    else {
        next();
    }
};

module.exports = withAuth;