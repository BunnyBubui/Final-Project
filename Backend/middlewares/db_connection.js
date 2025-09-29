const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bb.1153708",
    database: "wustudents",
});

db.connect((err) => {
    if (err) {
        console.log("Database isn't connect.");
    } else {
        console.log("Database is connect.");
    }
});

module.exports = db;