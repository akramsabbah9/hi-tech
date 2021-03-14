/* db/init.js: create a database for this app if none exists. */
const mysql = require("mysql2");
require("dotenv").config(); // get environment vars from .env

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW
});

// create the database if it doesn't exist yet.
connection.connect(() => {
    connection.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
        (err, result) => {
            if (err) throw err;
            connection.close();
        }
    );
});