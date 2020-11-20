require("dotenv").config();

const PORT = process.env.PORT;
const DB_SERVER = process.env.DB_SERVER;
const DB_NAME = process.env.DB_NAME;

module.exports = {
    PORT,
    DB_SERVER,
    DB_NAME
};