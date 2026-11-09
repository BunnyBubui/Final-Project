const router = require("express").Router();
const db = require("../middlewares/db_connection").promise();
const bcrypt = require("bcrypt");
const { store } = require("../middlewares/authStore");
router.post("/signUp", async (req, res, next) => {
  const { username, password, confirmPassword } = req.body || {};
  if (typeof username !== "string" || !/^[A-Za-z0-9_.-]{3,45}$/.test(username) || typeof password !== "string" || password.length < 8 || Buffer.byteLength(password, "utf8") > 72 || password !== confirmPassword) return res.status(400).json({ confirm: false, error: "Invalid registration details." });
  try {
    const hash = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO login (username, password) VALUES (?, ?)", [username, hash]);
    const session = await store.issue(username);
    res.status(201).json({ confirm: true, token: session.token });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return res.status(409).json({ confirm: false, error: "Username already exists." });
    next(error);
  }
});
module.exports = router;
