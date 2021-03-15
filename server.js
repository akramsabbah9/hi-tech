/* server.js: the main file; initializes app */
/* IMPORTS */
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
routes = require("./controllers");
const sequelize = require("./config/connection");


/* GLOBALS & MIDDLEWARE */
const app = express();
const hbs = exphbs.create();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use(routes);


/* MAIN */
// connect to db and begin listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
});
