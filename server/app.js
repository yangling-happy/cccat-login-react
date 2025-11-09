const express = require("express");
const cors = require("cors"); // 解决跨域问题
const authRoutes = require("./routes/auth"); // 导入登录/注册路由

const app = express(); // 创建Express应用

// 中间件配置
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 解析JSON格式的请求体（用于获取前端传来的用户名和密码）

// 注册路由：所有以 /api/auth 开头的请求，由authRoutes处理
app.use("/api/auth", authRoutes);

// 测试接口（可选，用于验证服务器是否正常运行）
app.get("/api/test", (req, res) => {
  res.json({ message: "后端服务器运行正常！" });
});

module.exports = app;
