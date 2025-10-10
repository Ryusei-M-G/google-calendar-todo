-- 001_create_users_table.sql
-- ユーザー情報を保存するテーブル

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  picture VARCHAR(500),
  access_token TEXT,
  refresh_token TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- google_idでの検索を高速化
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);

-- emailでの検索を高速化
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
