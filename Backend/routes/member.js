const express = require("express");
const router = express.Router();
const db = require("../middlewares/db_connection");

router.post("/member", (req, res) => {
    const { username, type, phone } = req.body;
    if (!username || !type || !phone) {
        return res.status(400).json({ error: "Invalid.", confirm: false });
    }

    const Query = "INSERT INTO member (username, type, phone) VALUES (?, ?, ?)";
    db.query(Query, [username, type, phone], (err, results) => {
        res.status(200).json({ status: "Sucess!", confirm: true })
    });

});

module.exports = router;