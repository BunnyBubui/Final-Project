const express = require("express");
const router = express.Router();
const db = require("../middlewares/db_connection");

router.post("/add_market", (req, res) => {
    const { username, item_name, item_type, price } = req.body;

    if (!username || !item_name || !item_type || !price) {
        return res.status(400).json({ error: "Invalid.", confirm: false });
    }

    const Query = `
        INSERT INTO market (username, item_name, item_type, price, create_at) 
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(Query, [username, item_name, item_type, price, new Date()], (err, results) => {
            if (err) {
                console.error("DB Error:", err);
                return res.status(500).json({ error: "Database error.", confirm: false });
            }
            res.status(200).json({ status: "Success!", confirm: true });
        }
    );
});

module.exports = router;
