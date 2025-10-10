import { SessionData, Store } from 'express-session';
import { Pool } from 'pg';

export class PgSessionStore extends Store {
  private pool: Pool;

  constructor(pool: Pool) {
    super();
    this.pool = pool;
  }

  // セッションを取得
  async get(sid: string, callback: (err?: any, session?: SessionData | null) => void): Promise<void> {
    try {
      const result = await this.pool.query(
        'SELECT sess FROM session WHERE sid = $1 AND expire > NOW()',
        [sid]
      );

      if (result.rows.length === 0) {
        callback(null, null);
      } else {
        callback(null, result.rows[0].sess);
      }
    } catch (error) {
      callback(error);
    }
  }

  // セッションを保存
  async set(sid: string, session: SessionData, callback?: (err?: any) => void): Promise<void> {
    try {
      const expire = session.cookie?.expires
        ? new Date(session.cookie.expires)
        : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // デフォルト7日

      await this.pool.query(
        `INSERT INTO session (sid, sess, expire)
         VALUES ($1, $2, $3)
         ON CONFLICT (sid)
         DO UPDATE SET sess = $2, expire = $3`,
        [sid, session, expire]
      );

      callback?.();
    } catch (error) {
      callback?.(error);
    }
  }

  // セッションを削除
  async destroy(sid: string, callback?: (err?: any) => void): Promise<void> {
    try {
      await this.pool.query('DELETE FROM session WHERE sid = $1', [sid]);
      callback?.();
    } catch (error) {
      callback?.(error);
    }
  }

  // すべてのセッションを削除
  async clear(callback?: (err?: any) => void): Promise<void> {
    try {
      await this.pool.query('DELETE FROM session');
      callback?.();
    } catch (error) {
      callback?.(error);
    }
  }

  // セッション数を取得
  async length(callback: (err: any, length?: number) => void): Promise<void> {
    try {
      const result = await this.pool.query('SELECT COUNT(*) FROM session WHERE expire > NOW()');
      callback(null, parseInt(result.rows[0].count));
    } catch (error) {
      callback(error);
    }
  }

  // セッションにタッチ（有効期限を更新）
  async touch(sid: string, session: SessionData, callback?: (err?: any) => void): Promise<void> {
    try {
      const expire = session.cookie?.expires
        ? new Date(session.cookie.expires)
        : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

      await this.pool.query(
        'UPDATE session SET expire = $1 WHERE sid = $2',
        [expire, sid]
      );

      callback?.();
    } catch (error) {
      callback?.(error);
    }
  }
}
