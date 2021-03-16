/* controllers/api/post-routes.js: REST routes to interact with Posts */
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all posts
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
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// get a single post by id
router.get("/:id", (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
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
        if (!postData) {
            return res.status(404).json({ message: "No post found with this id" });
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// add a post
router.post("/", withAuth, (req, res) => {
    // expects { title, post_text, user_id } in req.body
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// edit a post by id
router.put("/:id", withAuth, (req, res) => {
    // expects at least one of { title, post_text } in req.body
    Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text
        },
        {
            where: { id: req.params.id }
        }
    )
    .then(postData => {
        if (!postData[0]) {
            return res.status(404).json({
                message: "No post found with this id, or post could not be updated"
            });
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// delete a post by id
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
        where: { id: req.params.id }
    })
    .then(postData => {
        if (!postData) {
            return res.status(404).json({ message: "No post found with this id" });
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;