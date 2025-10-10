-- 002_create_sessions_table.sql
-- セッション情報を保存するテーブル（connect-pg-simple用）

CREATE TABLE IF NOT EXISTS session (
  sid VARCHAR NOT NULL COLLATE "default",
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE
);

-- 有効期限での検索を高速化（期限切れセッションの削除用）
CREATE INDEX IF NOT EXISTS idx_session_expire ON session(expire);
