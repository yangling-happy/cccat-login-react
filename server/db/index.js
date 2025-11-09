const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

// 数据库文件路径（自动生成cccat.db文件）
const dbPath = path.resolve(__dirname, "cccat.db");
// 表结构文件路径
const schemaPath = path.resolve(__dirname, "schema.sql");

// 连接数据库（开启日志便于调试）
const db = new Database(dbPath, { verbose: console.log });
console.log("✅ 成功连接SQLite数据库（better-sqlite3）");

// 读取并执行建表脚本（确保表存在）
try {
  const createTablesSQL = fs.readFileSync(schemaPath, "utf8");
  db.exec(createTablesSQL);
  console.log("✅ 用户表初始化完成");
} catch (err) {
  console.error("❌ 表结构创建失败：", err.message);
}

module.exports = db; // 导出数据库连接供其他文件使用
