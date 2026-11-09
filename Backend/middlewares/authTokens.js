const { randomBytes, createHash } = require("node:crypto");

const digest = (token) => createHash("sha256").update(token).digest("hex");
function createSessionStore(query, now = () => new Date()) {
  async function issue(username) {
    const token = randomBytes(32).toString("hex");
    const expires = new Date(now().getTime() + 60 * 60 * 1000);
    await query("INSERT INTO auth_sessions (token_hash, username, expires_at) VALUES (?, ?, ?)", [digest(token), username, expires]);
    return { token, expires_at: expires };
  }
  async function find(token) {
    if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) return null;
    const [rows] = await query("SELECT username, expires_at FROM auth_sessions WHERE token_hash = ? AND expires_at > ? LIMIT 1", [digest(token), now()]);
    return rows[0] || null;
  }
  async function revoke(token) {
    await query("DELETE FROM auth_sessions WHERE token_hash = ?", [digest(token)]);
  }
  return { issue, find, revoke };
}
function requireSession(store) {
  return async (req, res, next) => {
    const match = /^Bearer ([a-f0-9]{64})$/.exec(req.get("Authorization") || "");
    if (!match) return res.status(401).json({ confirm: false, error: "Authentication required." });
    try {
      const session = await store.find(match[1]);
      if (!session) return res.status(401).json({ confirm: false, error: "Session expired or invalid." });
      req.auth = { ...session, token: match[1] };
      next();
    } catch (error) { next(error); }
  };
}
module.exports = { createSessionStore, requireSession };
