require("dotenv").config();

const DB_SERVER = process.env.DB_SERVER;
const DB_NAME = process.env.DB_NAME;

module.exports = {
    DB_SERVER,
    DB_NAME
};