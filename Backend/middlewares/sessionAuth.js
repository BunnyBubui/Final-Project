const express = require("express");
const router = express.Router();
const db = require("../middlewares/db_connection");

router.post("/sessionAuth", (req, res) => {
  const usernameFromHeader = req.header("X-Username");
  const usernameFromBody = req.body?.username;
  const username = usernameFromHeader || usernameFromBody;

  if (!username) {
    return res.status(400).json({ confirm: false, error: "Missing username" });
  }

  const sql = "SELECT end_at FROM sessions WHERE username = ? LIMIT 1";
  db.query(sql, [username], (err, rows) => {
    if (err) return res.status(500).json({ confirm: false, error: "Server error" });
    if (rows.length === 0) return res.status(401).json({ confirm: false, error: "Session not found" });

    const exp = new Date(rows[0].end_at).getTime();
    if (exp <= Date.now()) {
      return res.status(401).json({ confirm: false, error: "Session expired" });
    }

    return res.status(200).json({ confirm: true, end_at: rows[0].end_at });
  });
});

router.post("/logout", (req, res) => {
  const usernameFromHeader = req.header("X-Username");
  const usernameFromBody = req.body?.username;
  const username = usernameFromHeader || usernameFromBody;

  if (!username) {
    return res.status(400).json({ confirm: false, error: "Missing username" });
  }

  const sql = "DELETE FROM sessions WHERE username = ?";
  db.query(sql, [username], (err, result) => {
    if (err) return res.status(500).json({ confirm: false, error: "Server error" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ confirm: false, error: "Session not found" });
    }

    return res.status(200).json({ confirm: true, message: "Logged out successfully" });
  });
});

module.exports = router;
