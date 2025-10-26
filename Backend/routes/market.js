const express = require("express");
const router = express.Router();
const db = require("../middlewares/db_connection");

router.post("/add_market", (req, res) => {
    const { username, item_name, item_type, price, quantity } = req.body;

    if (!username || !item_name || !item_type || price === undefined || quantity === undefined) {
        return res.status(400).json({ error: "Invalid.", confirm: false });
    }
    if (Number.isNaN(Number(price)) || Number.isNaN(Number(quantity))) {
        return res.status(400).json({ error: "Price/Quantity must be numeric.", confirm: false });
    }
    if (Number(quantity) < 0) {
        return res.status(400).json({ error: "Quantity must be >= 0.", confirm: false });
    }

    const sql = `
    INSERT INTO market (username, item_name, item_type, quantity, price, create_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

    db.query(
        sql,
        [username, item_name, item_type, Number(quantity), Number(price), new Date()],
        (err, result) => {
            if (err) {
                console.error("DB Error:", err);
                return res.status(500).json({ error: "Database error.", confirm: false });
            }
            return res.status(201).json({ status: "Success!", confirm: true, id: result.insertId });
        }
    );
});

router.get("/read_market", (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ error: "Invalid.", confirm: false });
    }
    const sql = `SELECT * FROM market WHERE username = ? ORDER BY create_at DESC`;
    db.query(sql, [username], (err, rows) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: "Database error.", confirm: false });
        }
        return res.status(200).json({ status: "Success!", confirm: true, data: rows });
    });
});

router.get("/all_market", (req, res) => {
    const sql = `SELECT * FROM market ORDER BY create_at DESC`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: "Database error.", confirm: false });
        }
        return res.status(200).json({ status: "Success!", confirm: true, data: rows });
    });
});

router.put("/update_market/:id", (req, res) => {
    const { id } = req.params;
    const { item_name, item_type, price, quantity } = req.body;

    if (!item_name || !item_type || price === undefined || quantity === undefined) {
        return res.status(400).json({ error: "Invalid.", confirm: false });
    }
    if (Number.isNaN(Number(price)) || Number.isNaN(Number(quantity))) {
        return res.status(400).json({ error: "Price/Quantity must be numeric.", confirm: false });
    }
    if (Number(quantity) < 0) {
        return res.status(400).json({ error: "Quantity must be >= 0.", confirm: false });
    }

    const sql = `
    UPDATE market
      SET item_name = ?, item_type = ?, price = ?, quantity = ?
    WHERE id = ?
  `;
    db.query(sql, [item_name, item_type, Number(price), Number(quantity), id], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: "Database error.", confirm: false });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Item not found", confirm: false });
        }
        return res.status(200).json({ status: "Updated!", confirm: true });
    });
});

router.delete("/delete_market/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Invalid id.", confirm: false });
    }
    const sql = `DELETE FROM market WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: "Database error.", confirm: false });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Item not found", confirm: false });
        }
        return res.status(200).json({ status: "Deleted!", confirm: true });
    });
});

module.exports = router;
