/* controllers/api/user-routes.js: REST routes to interact with Users */
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// get all users
router.get("/", (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"] }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// get a single user by id
router.get("/:id", (req, res) => {
    User.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ["password"] },
        include: [
            {
                model: Post,
                attributes: ["id", "title", "post_text", "created_at"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "created_at"],
                include: {
                    model: Post,
                    attributes: ["title"]
                }
            }
        ]
    })
    .then(userData => {
        if (!userData) {
            return res.status(404).json({ message: "No user found with this id" });
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// add a user
router.post("/", (req, res) => {
    // expects { username, email, password } in req.body
    User.create(req.body)
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// log in a user
router.post("/login", (req, res) => {
    // expects { username, password } in req.body
    User.findOne({
        where: { username: req.body.username }
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({ message: "Login failed! Wrong username or password." });
            return;
        }

        // verify user
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: "Login failed! Wrong username or password." });
            return;
        }
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
        
            res.json({ user: userData, message: "You are now logged in!" });
        });
    });
});


// log out a user
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});


// edit a user by id
router.put("/:id", (req, res) => {
    // expects at least one of { username, email, password } in req.body
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    })
    .then(userData => {
        if (!userData[0]) {
            return res.status(404).json({
                message: "No user found with this id, or user could not be updated"
            });
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// delete a user by id
router.delete("/:id", (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    })
    .then(userData => {
        if (!userData) {
            return res.status(404).json({ message: "No user found with this id" });
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;