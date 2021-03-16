/* server.js: the main file; initializes app */
/* IMPORTS */
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");


/* GLOBALS & MIDDLEWARE */
const sess = {
    secret: "Change this later",
    cookie: { maxAge: 10 * 60 * 1000 }, // maxAge is 10 minutes
    resave: false,
    rolling: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const hbs = exphbs.create({ helpers });
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));
app.use(routes);


/* MAIN */
// connect to db and begin listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
});
