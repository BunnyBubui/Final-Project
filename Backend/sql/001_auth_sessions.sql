-- Run once against an existing database before deploying the token-auth change.
CREATE TABLE IF NOT EXISTS auth_sessions (
  token_hash CHAR(64) PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  INDEX auth_sessions_expiry (expires_at)
);
