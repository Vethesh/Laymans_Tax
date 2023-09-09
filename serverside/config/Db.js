const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: "",
  database: "laymens_tax",
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the database");
  }
});

module.exports = db;
