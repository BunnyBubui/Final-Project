const express = require("express");
const { requireSession } = require("./authTokens");
function createSessionRouter(store) {
  const router = express.Router();
  router.post("/sessionAuth", requireSession(store), (req, res) => {
    res.json({ confirm: true, username: req.auth.username, end_at: req.auth.expires_at });
  });
  router.post("/logout", requireSession(store), async (req, res, next) => {
    try { await store.revoke(req.auth.token); res.json({ confirm: true }); }
    catch (error) { next(error); }
  });
  return router;
}
module.exports = createSessionRouter;
