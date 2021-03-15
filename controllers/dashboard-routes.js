/* controllers/dashboard-routes.js: REST routes for the frontend dashboard. */
const router = require("express").Router();
const sequelize = require("../config/connection");
const {Post, User, Comment } = require("../models");

// dashboard/: get all posts of the logged-in user and display them 
router.get("/", (req, res) => {
    Post.findAll({
        where: { user_id: req.session.user_id },
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

        // render them on dashboard
        res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// dashboard/add: add a new post.
router.get("/add", (req, res) => {
    res.render("add-post", { loggedIn: req.session.loggedIn });
});


// dashboard/edit: edit or delete an existing post.
router.get("/edit/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
            user_id: req.session.user_id
        }
    })
    .then(postData => {
        // if nothing was found, respond with 404
        if (!postData) {
            return res.status(404).json({
                message: "No post by this user found with this id"
            });
        }
        
        // make the post plaintext and render it in edit-post
        const post = postData.get({ plain: true });
        res.render("edit-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;