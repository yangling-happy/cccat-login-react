-- 用户表：存储用户名和加密后的密码
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,  -- 用户名唯一，不允许重复
  password TEXT NOT NULL,         -- 加密后的密码
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 注册时间
);