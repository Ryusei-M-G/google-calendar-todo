import express from 'express'
import { configDotenv } from 'dotenv';
import session from 'express-session';
import { Pool } from 'pg';
import google_oauth from './google_oauth';
import callback from './callback';
import { Request,Response } from 'express';
import cors from'cors'
import { PgSessionStore } from './session-store';


configDotenv();

const app = express();
const port = parseInt(process.env.PORT || '3000');

// PostgreSQL接続プール
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

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
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}))

app.get('/auth',google_oauth);
app.get('/auth/google/callback',callback);
app.get('/api/test', (req:Request,res:Response) => {
  console.log('test')
  res.json({message:'test'})

})
app.listen(port, '0.0.0.0', ()=>{
  console.log(`server is running on port:${port}`)
})