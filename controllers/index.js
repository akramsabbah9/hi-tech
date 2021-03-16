/* controllers/index.js: routing for express endpoints */
const router = require("express").Router();
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

// send 404 to requests for routes that don't exist
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;