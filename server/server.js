const app = require("./app"); // 导入Express应用

// 服务器配置（本地localhost，端口5000）
const HOST = "localhost";
const PORT = 5000;

// 启动服务器
app.listen(PORT, HOST, () => {
  console.log(`🚀 后端服务器已启动：http://${HOST}:${PORT}`);
  console.log(`📌 登录接口：http://${HOST}:${PORT}/api/auth/login`);
  console.log(`📌 注册接口：http://${HOST}:${PORT}/api/auth/register`);
  console.log(`📌 测试接口：http://${HOST}:${PORT}/api/test`);
});
