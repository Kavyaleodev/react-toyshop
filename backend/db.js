const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // your MySQL username
  password: "", // your MySQL password
  database: "toyshop"
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;
