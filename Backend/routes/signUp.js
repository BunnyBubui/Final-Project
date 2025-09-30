const express = require("express");
const router = express.Router();
const db = require("../middlewares/db_connection");
const bcrypt = require("bcrypt");

router.post("/signUp", (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
        return res.status(400).json({ error: "Invalid username or password.", confirm : false });
    }

    if (password !== confirmPassword){
        return res.status(401).json({ error: "Password isn't match. Please try again.", confirm : false });
    }

    if (password.length < 8){
        return res.status(401).json({ error: "Password is less then 8."});
    }

    const CheckQuery = "SELECT id FROM login WHERE username = ?";
    db.query(CheckQuery, [username], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Username Already exists.", confirm : false });
        };

        if (rows && rows.length > 0) {
            return res.status(409).json({ error: "Username already exists.", confirm : false });
        }

        bcrypt.hash(password, 10, (err, hashed) => {
            if (err) {
                console.error("hash error:", err);
                return res.status(500).json({ error: "Hash error.", confirm : false });
            }

            const Query = "INSERT INTO login (username, password) VALUES (?, ?)";
            db.query(Query, [username, hashed], (err) => {
                if (err) {
                    return res.status(500).json({ error: "Insert error.", confirm : false });
                }

                res.status(200).json({ status: "Sucess!", confirm : true })
            });
        })
    });

});

module.exports = router;