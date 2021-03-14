/* controllers/index.js: routing for express endpoints */
const router = require("express").Router();

// send 404 to requests for routes that don't exist
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;