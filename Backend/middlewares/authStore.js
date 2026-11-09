const db = require("./db_connection");
const { createSessionStore, requireSession } = require("./authTokens");
const store = createSessionStore((sql, values) => db.promise().query(sql, values));
module.exports = { store, authenticate: requireSession(store) };
