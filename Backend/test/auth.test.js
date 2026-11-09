const { test } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const { createSessionStore, requireSession } = require('../middlewares/authTokens');
const createSessionRouter = require('../middlewares/sessionAuth');

async function fixture(t, includeMarket = false) {
  const sessions = new Map();
  let now = new Date('2026-01-01T00:00:00Z');
  const store = createSessionStore(async (sql, values) => {
    if (sql.startsWith('INSERT')) sessions.set(values[0], { username: values[1], expires_at: values[2] });
    if (sql.startsWith('SELECT')) {
      const row = sessions.get(values[0]);
      return [[...(row && row.expires_at > values[1] ? [row] : [])]];
    }
    if (sql.startsWith('DELETE')) sessions.delete(values[0]);
    return [{ affectedRows: 1 }];
  }, () => now);
  const app = express();
  app.use(express.json());
  app.use('/api', createSessionRouter(store));
  if (includeMarket) {
    const dbPath = require.resolve('../middlewares/db_connection');
    const authPath = require.resolve('../middlewares/authStore');
    require.cache[dbPath] = { id: dbPath, filename: dbPath, loaded: true, exports: {
      query(sql, values, callback) {
        assert.match(sql, /WHERE id = \? AND username = \?/);
        callback(null, { affectedRows: values.at(-1) === 'owner' ? 1 : 0 });
      },
    }};
    require.cache[authPath] = { id: authPath, filename: authPath, loaded: true, exports: { authenticate: requireSession(store) }};
    delete require.cache[require.resolve('../routes/market')];
    app.use('/api', require('../routes/market'));
  }
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return { store, sessions, expire() { now = new Date(now.getTime() + 3600001); }, request(path, options = {}) {
    return fetch(`http://127.0.0.1:${server.address().port}/api${path}`, options);
  }};
}

test('a username body or X-Username header cannot impersonate an active account', async t => {
  const f = await fixture(t);
  await f.store.issue('owner');
  const response = await f.request('/sessionAuth', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Username': 'owner' }, body: JSON.stringify({ username: 'owner' }) });
  assert.equal(response.status, 401);
});

test('only a token digest is stored and logout revokes the presented session', async t => {
  const f = await fixture(t);
  const { token } = await f.store.issue('owner');
  assert.equal(token.length, 64);
  assert.equal(f.sessions.has(token), false);
  const options = { method: 'POST', headers: { Authorization: `Bearer ${token}` } };
  const valid = await f.request('/sessionAuth', options);
  assert.equal(valid.status, 200);
  assert.equal((await valid.json()).username, 'owner');
  assert.equal((await f.request('/logout', options)).status, 200);
  assert.equal((await f.request('/sessionAuth', options)).status, 401);
});

test('expired or malformed tokens are rejected', async t => {
  const f = await fixture(t);
  const { token } = await f.store.issue('owner');
  f.expire();
  for (const value of [token, 'not-a-token', '0'.repeat(64)]) {
    assert.equal((await f.request('/sessionAuth', { method: 'POST', headers: { Authorization: `Bearer ${value}` } })).status, 401);
  }
});

test('logout does not revoke another account named in the body', async t => {
  const f = await fixture(t);
  const owner = await f.store.issue('owner');
  const other = await f.store.issue('other');
  await f.request('/logout', { method: 'POST', headers: { Authorization: `Bearer ${other.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'owner' }) });
  assert.ok(await f.store.find(owner.token));
  assert.equal(await f.store.find(other.token), null);
});

test('marketplace mutations reject another owner and accept the actual owner', async t => {
  const f = await fixture(t, true);
  for (const username of ['attacker', 'owner']) {
    const { token } = await f.store.issue(username);
    const response = await f.request('/delete_market/1', { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    assert.equal(response.status, username === 'owner' ? 200 : 404);
    const update = await f.request('/update_market/1', { method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ item_name: 'Demo', item_type: 'food', quantity: 1, price: 10 }) });
    assert.equal(update.status, username === 'owner' ? 200 : 404);
  }
});
