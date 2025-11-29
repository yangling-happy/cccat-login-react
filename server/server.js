const app = require("./app");
const http = require('http');
const WebSocket = require('ws');

const PORT = 5000;

// 创建HTTP服务器
const server = http.createServer(app);

// 创建WebSocket服务器
const wss = new WebSocket.Server({ server });

// 存储在线用户的连接
const clients = new Map();

// WebSocket连接处理
wss.on('connection', (ws) => {
  let userId = null;
  
  // 监听消息
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      // 处理用户登录消息
      if (data.type === 'login') {
        userId = data.userId;
        clients.set(userId, ws);
        console.log(`用户 ${userId} 已连接`);
        
        // 广播用户上线状态
        broadcastUserStatus(userId, true);
      }
      
      // 处理聊天消息
      if (data.type === 'chat' && data.to && data.content) {
        const targetClient = clients.get(data.to.toString());
        if (targetClient && targetClient.readyState === WebSocket.OPEN) {
          targetClient.send(JSON.stringify({
            type: 'chat',
            from: userId,
            content: data.content,
            timestamp: new Date().toISOString()
          }));
        }
        
        // 回复发送者消息已送达
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'delivered',
            messageId: data.messageId
          }));
        }
      }
    } catch (error) {
      console.error('处理WebSocket消息时出错:', error);
    }
  });
  
  // 连接关闭时
  ws.on('close', () => {
    if (userId) {
      clients.delete(userId);
      console.log(`用户 ${userId} 已断开连接`);
      
      // 广播用户下线状态
      broadcastUserStatus(userId, false);
    }
  });
  
  // 错误处理
  ws.on('error', (error) => {
    console.error('WebSocket错误:', error);
  });
});

// 广播用户状态变化
function broadcastUserStatus(userId, isOnline) {
  const statusMessage = JSON.stringify({
    type: 'userStatus',
    userId,
    online: isOnline
  });
  
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(statusMessage);
    }
  });
}

// 启动服务器
server.listen(PORT, () => {
  console.log(`🚀 后端服务器已启动：http://localhost:${PORT}`);
  console.log(`📌 登录接口：http://localhost:${PORT}/api/auth/login`);
  console.log(`📌 注册接口：http://localhost:${PORT}/api/auth/register`);
  console.log(`📌 测试接口：http://localhost:${PORT}/api/test`);
  console.log(`📌 查询所有用户：http://localhost:5000/api/auth/users`);
  console.log(`🔄 WebSocket服务已启动：ws://localhost:${PORT}`);
  console.log(`✅ 服务器已完全启动，可以接受请求`);
});
