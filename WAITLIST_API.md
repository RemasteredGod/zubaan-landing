# Zubaan Waitlist API — Backend Setup Guide

The landing page sends a `POST` request to `https://reachify.quest/waitlist` with a JSON body.
This doc explains how to set up that endpoint on your GCP server in under 15 minutes.

---

## API Contract

### `POST /waitlist`

**Request**
```
POST https://reachify.quest/waitlist
Content-Type: application/json

{ "email": "user@example.com" }
```

**Success Response** — `200 OK`
```json
{ "ok": true, "message": "Added to waitlist." }
```

**Duplicate email** — `409 Conflict`
```json
{ "ok": false, "message": "Already on the list!" }
```

**Invalid email** — `400 Bad Request`
```json
{ "ok": false, "message": "Invalid email address." }
```

**Server error** — `500 Internal Server Error`
```json
{ "ok": false, "message": "Internal server error." }
```

---

## Setup on GCP Server (Node.js + SQLite)

> SQLite is perfect for a waitlist — zero config, single file, backed up easily.

### 1. Install dependencies

```bash
mkdir -p ~/zubaan-api && cd ~/zubaan-api
npm init -y
npm install express better-sqlite3 cors
```

### 2. Create `server.js`

```js
const express = require('express')
const Database = require('better-sqlite3')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

// ── CORS: allow only your Vercel domain ──────────────────────────────────────
app.use(cors({
  origin: [
    'https://zubaan.live',
    'https://www.zubaan.live',
    'http://localhost:3000',        // local dev
    'http://localhost:3001',        // local dev
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}))
app.use(express.json())

// ── Database setup ────────────────────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'waitlist.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS waitlist (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    email     TEXT    NOT NULL UNIQUE,
    joined_at TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`)

// ── Email validator (simple, no deps) ────────────────────────────────────────
function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

// ── POST /waitlist ────────────────────────────────────────────────────────────
app.post('/waitlist', (req, res) => {
  const { email } = req.body ?? {}

  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, message: 'Invalid email address.' })
  }

  try {
    const stmt = db.prepare('INSERT INTO waitlist (email) VALUES (?)')
    stmt.run(email.trim().toLowerCase())
    console.log(`[waitlist] New signup: ${email}`)
    return res.status(200).json({ ok: true, message: 'Added to waitlist.' })
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ ok: false, message: 'Already on the list!' })
    }
    console.error('[waitlist] DB error:', err.message)
    return res.status(500).json({ ok: false, message: 'Internal server error.' })
  }
})

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Zubaan API running on port ${PORT}`)
})
```

### 3. Run it

```bash
node server.js
# or with auto-restart:
npm install -g pm2
pm2 start server.js --name zubaan-api
pm2 save
pm2 startup   # run the command it prints to auto-start on reboot
```

---

## Cloudflare Tunnel → Your Server

Since you're using Cloudflare Tunnel (`reachify.quest`), make sure the tunnel routes the `/waitlist` path to `localhost:3001`.

In your `~/.cloudflared/config.yml` (or equivalent), you should have:

```yaml
tunnel: <your-tunnel-id>
credentials-file: /home/<user>/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: reachify.quest
    service: http://localhost:3001
  - service: http_status:404
```

Then reload the tunnel:
```bash
sudo systemctl restart cloudflared
# or
cloudflared tunnel run <your-tunnel-name>
```

> **If you already have other services on `reachify.quest`**, you can route by path using a reverse proxy (nginx) in front of port 3001. See the nginx section below.

---

## Optional: nginx Path Routing

If `reachify.quest` serves other things on port 80/443 and the Cloudflare tunnel points to nginx:

```nginx
# /etc/nginx/sites-available/reachify
server {
    listen 80;
    server_name reachify.quest;

    location /waitlist {
        proxy_pass         http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
    }

    # your other routes below...
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## Viewing Collected Emails

```bash
# Pretty print all waitlist signups
sqlite3 ~/zubaan-api/waitlist.db \
  "SELECT id, email, joined_at FROM waitlist ORDER BY joined_at DESC;"

# Export as CSV
sqlite3 -csv ~/zubaan-api/waitlist.db \
  "SELECT email, joined_at FROM waitlist;" > waitlist_export.csv

# Count
sqlite3 ~/zubaan-api/waitlist.db "SELECT COUNT(*) FROM waitlist;"
```

---

## Test the endpoint

```bash
# Should return 200
curl -X POST https://reachify.quest/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Should return 409 (duplicate)
curl -X POST https://reachify.quest/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Health check
curl https://reachify.quest/health
```

---

## File Structure

```
~/zubaan-api/
├── server.js        ← the API
├── waitlist.db      ← SQLite database (auto-created)
├── package.json
└── node_modules/
```

---

## Quick Checklist

- [ ] SSH into GCP server
- [ ] `mkdir ~/zubaan-api && cd ~/zubaan-api`
- [ ] Create `server.js` (paste from above)
- [ ] `npm init -y && npm install express better-sqlite3 cors`
- [ ] `pm2 start server.js --name zubaan-api && pm2 save && pm2 startup`
- [ ] Update Cloudflare Tunnel / nginx to route to `localhost:3001`
- [ ] Test with `curl` commands above
- [ ] Push landing page to Vercel → verify form works end-to-end
