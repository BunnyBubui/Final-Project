const router = require("express").Router();
const db = require("../middlewares/db_connection").promise();
const { authenticate } = require("../middlewares/authStore");
router.post("/member", authenticate, async (req, res, next) => {
  const { type, phone } = req.body || {};
  if (!["customer", "worker"].includes(type) || typeof phone !== "string" || !/^[0-9+ -]{8,20}$/.test(phone)) return res.status(400).json({ confirm: false, error: "Invalid member details." });
  try {
    await db.query("INSERT INTO member (username, type, phone) VALUES (?, ?, ?)", [req.auth.username, type, phone]);
    res.status(201).json({ confirm: true });
  } catch (error) { next(error); }
});
module.exports = router;
