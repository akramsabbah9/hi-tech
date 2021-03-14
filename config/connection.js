/* config/connection.js: create sequelize connection based off environment variables */
const Sequelize = require("sequelize");
require("dotenv").config(); // get environment vars from .env

// if using JawsDB, make the connection with its environment variables. Otherwise, use our own
const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
            host: "localhost",
            dialect: "mysql",
            dialectOptions: {
                decimalNumbers: true,
            },
        });

module.exports = sequelize;