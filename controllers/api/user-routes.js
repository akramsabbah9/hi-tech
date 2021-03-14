/* controllers/api/user-routes.js: REST routes to interact with Users */
const router = require("express").Router();
const { User, Post } = require("../../models");

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
        attributes: { exclude: ["password"] }
    })
    .then(userData => res.json(userData))
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