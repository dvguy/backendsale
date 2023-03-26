const mysql = require("mysql");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const connection = mysql.createPool({
  database: process.env.DATABASE,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

console.log("ARRIBA");

connection.getConnection(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
