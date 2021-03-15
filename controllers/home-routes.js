/* controllers/home-routes.js: REST routes for the frontend homepage. */
const router = require("express").Router();
const sequelize = require("../config/connection");
const {Post, User, Comment } = require("../models");

// homepage: get all posts and display them
router.get("/", (req, res) => {
    Post.findAll({
        include: [
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then(postData => {
        // make all posts plaintext
        const posts = postData.map(post => post.get({ plain: true }));

        // render them on homepage
        res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


// login: send user to login page.
router.get("/login", (req, res) => {
    // if already logged in, return to homepage
    if (req.session.loggedIn) return res.redirect("/");

    res.render("login");
});

// signup: send user to signup page.
router.get("/signup", (req, res) => {
    // if already logged in, return to homepage
    if (req.session.loggedIn) return res.redirect("/");

    res.render("signup");
});

module.exports = router;