import express from 'express'
import { configDotenv } from 'dotenv';
import session from 'express-session';
import google_oauth from './google_oauth';
import callback from './callback';
import { Request, Response } from 'express';
import cors from 'cors'
import { PgSessionStore } from './session-store';
import getCalendarEvent from './getCalendarEvent';
import { getPool } from './db';


configDotenv();

const app = express();
const port = parseInt(process.env.PORT || '3000');

// PostgreSQL 接続プール（単一化）
const pool = getPool();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost',
  credentials: true
}))

app.use(session({
  store: new PgSessionStore(pool),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: '/'
  }
}))

app.get('/auth', google_oauth);
app.get('/auth/google/callback', callback);
app.get('/api/event', getCalendarEvent)
app.listen(port, '0.0.0.0', () => {
  console.log(`server is running on port:${port}`)
})

