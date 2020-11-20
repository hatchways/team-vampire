/* eslint-disable no-undef */
require("dotenv").config();

const PORT = process.env.PORT;
const DB_SERVER = process.env.DB_SERVER;
const DB_NAME = process.env.DB_NAME;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports = {
    PORT,
    DB_SERVER,
    DB_NAME,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
};