const express = require("express");
const router = express.Router();
const db = require("../middlewares/db_connection");
const bcrypt = require("bcrypt");

router.post("/signIn", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ confirm: false, error: "Invalid username or password." });
  }

  const qFindUser = "SELECT id, username, password FROM login WHERE username = ? LIMIT 1";
  db.query(qFindUser, [username], (err, users) => {
    if (err) return res.status(500).json({ confirm: false, error: "Server error." });
    if (users.length === 0) {
      return res.status(401).json({ confirm: false, error: "Invalid username or password." });
    }

    const user = users[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ confirm: false, error: "Server error." });
      if (!isMatch) {
        return res.status(401).json({ confirm: false, error: "Invalid username or password." });
      }

      const qFindType = "SELECT type FROM member WHERE username = ? LIMIT 1";
      db.query(qFindType, [username], (err, roles) => {
        if (err) return res.status(500).json({ confirm: false, error: "Server error." });
        if (roles.length === 0) {
          return res.status(404).json({ confirm: false, error: "Invalid username." });
        }
        const role = roles[0].type;

        const qUpsertSession = `
          INSERT INTO sessions (username, start_at, end_at)
          VALUES (?, NOW(), DATE_ADD(NOW(), INTERVAL 60 MINUTE))
          ON DUPLICATE KEY UPDATE
            start_at = VALUES(start_at),
            end_at   = VALUES(end_at)
        `;
        db.query(qUpsertSession, [username], (err2) => {
          if (err2) return res.status(500).json({ confirm: false, error: "Session error." });

          const qGetSession = "SELECT username, start_at, end_at FROM sessions WHERE username = ? LIMIT 1";
          db.query(qGetSession, [username], (err3, sRows) => {
            if (err3) return res.status(500).json({ confirm: false, error: "Server error." });
            if (sRows.length === 0) {
              return res.status(500).json({ confirm: false, error: "Session not found." });
            }

            const session = sRows[0];
            return res.status(200).json({
              status: "Success!",
              confirm: true,
              result: role,
              sessions: {
                username: session.username,
                start_at: session.start_at,
                end_at: session.end_at,
              },
              user: { id: user.id, username: user.username }
            });
          });
        });
      });
    });
  });
});

module.exports = router;
