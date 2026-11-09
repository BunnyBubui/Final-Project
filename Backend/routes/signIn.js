const router = require("express").Router();
const db = require("../middlewares/db_connection").promise();
const bcrypt = require("bcrypt");
const { store } = require("../middlewares/authStore");
router.post("/signIn", async (req, res, next) => {
  const { username, password } = req.body || {};
  if (typeof username !== "string" || typeof password !== "string" || !username || !password) return res.status(400).json({ confirm: false, error: "Invalid username or password." });
  try {
    const [users] = await db.query("SELECT id, username, password FROM login WHERE username = ? LIMIT 1", [username]);
    if (!users.length || !await bcrypt.compare(password, users[0].password)) return res.status(401).json({ confirm: false, error: "Invalid username or password." });
    const [roles] = await db.query("SELECT type FROM member WHERE username = ? LIMIT 1", [username]);
    const session = await store.issue(users[0].username);
    res.json({ confirm: true, result: roles[0]?.type || null, token: session.token, sessions: { username: users[0].username, end_at: session.expires_at }, user: { id: users[0].id, username: users[0].username } });
  } catch (error) { next(error); }
});
module.exports = router;
