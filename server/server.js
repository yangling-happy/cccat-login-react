const app = require("./app");

const PORT = 5000;

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 后端服务器已启动：http://localhost:${PORT}`);
  console.log(`📌 登录接口：http://localhost:${PORT}/api/auth/login`);
  console.log(`📌 注册接口：http://localhost:${PORT}/api/auth/register`);
  console.log(`📌 测试接口：http://localhost:${PORT}/api/test`);
  console.log(`✅ 服务器已完全启动，可以接受请求`);
});
