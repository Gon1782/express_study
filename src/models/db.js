const mysql = require("mysql2");
const { PASSWORD } = process.env;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: PASSWORD,
  database: "example",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    throw err;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;
