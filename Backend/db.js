var mysql = require("mysql2");

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "unimaster",
  multipleStatements: true,
});
module.exports = pool;