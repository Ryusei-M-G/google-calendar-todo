import { Request, Response } from 'express';
import { Pool } from 'pg';
import { google } from 'googleapis';

declare module 'express-session' {
  interface SessionData {
    userId?: number;
    email?: string;
    name?: string;
  }
}

let pool: Pool;

const getPool = () => {
  if (!pool) {
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
    });
  }
  return pool;
};

const callback = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).send('Authorization code not found');
    return;
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL
    );

    // codeをtokenに変換
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // ユーザー情報を取得
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    const { id, email, name, picture } = userInfo.data;

    // DBにユーザー情報を保存
    const query = `
      INSERT INTO users (google_id, email, name, picture, access_token, refresh_token)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (google_id)
      DO UPDATE SET
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        picture = EXCLUDED.picture,
        access_token = EXCLUDED.access_token,
        refresh_token = EXCLUDED.refresh_token,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    const values = [
      id,
      email,
      name,
      picture,
      tokens.access_token,
      tokens.refresh_token,
    ];

    const result = await getPool().query(query, values);
    const user = result.rows[0];

    // セッションにユーザー情報を保存
    req.session.userId = user.id;
    req.session.email = user.email;
    req.session.name = user.name;

    // セッションを保存してからリダイレクト
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        res.status(500).send('Session save failed');
        return;
      }

      // フロントエンドにリダイレクト（cookieは自動的に送信される）
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      res.redirect(frontendUrl);
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).send('Authentication failed');
  }
};

export default callback;