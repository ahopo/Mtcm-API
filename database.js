const mysql = require("mysql2");
require("dotenv").config();
module.exports = mysql.createConnection({
  host: process.env.HOST,
  user: "sa",
  password: "!~P0101#$#!",
  database: "mtcmdb",
});
