const { Pool } = require("pg");
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORTDB,
    allowExitOnIdle: true
});


module.exports = {pool}