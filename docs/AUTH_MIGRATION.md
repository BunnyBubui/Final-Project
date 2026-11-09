# Token authentication migration

Use Node.js 22 or newer. Run `Backend/sql/001_auth_sessions.sql` on the existing MySQL database before starting the updated backend. Existing username-only sessions are deliberately rejected. Users must sign in again.

The server issues a cryptographically random bearer token and stores its SHA-256 digest with a one-hour expiry. Account names in request bodies or `X-Username` headers do not authenticate requests. Logout revokes the presented token. Marketplace writes include the authenticated owner in database predicates.

The Expo screens send bearer tokens. Remove previously generated `frontend/` bundles and rebuild from source when deploying. The current frontend stores the token in AsyncStorage; use an appropriate secure storage solution before a production mobile release. The OTP screen is a local demonstration and is not server-side phone verification.

Copy `Backend/.env.example` to `Backend/.env`, configure MySQL, then run `npm install` and `npm test` in Backend. Set `EXPO_PUBLIC_API_URL` for a physical device. Use HTTPS outside local development.
