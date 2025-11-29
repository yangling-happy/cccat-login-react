const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // 用于密码加密/验证
const db = require("../db"); // 导入数据库连接

// 登录接口（前端登录时调用）
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("收到登录请求:", { username }); // 添加日志

  // 验证输入是否为空
  if (!username || !password) {
    console.log("登录失败: 用户名或密码为空");
    return res.status(400).json({ message: "用户名和密码不能为空" });
  }

  try {
    // 从数据库查询用户（同步操作）
    console.log("查询用户:", username);
    const user = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username);

    // 用户名不存在
    if (!user) {
      console.log("用户不存在:", username);
      return res.status(401).json({ message: "用户名或密码错误" });
    }

    // 验证密码（异步加密对比）
    console.log("验证密码...");
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("密码验证错误:", err);
        return res.status(500).json({ message: "密码验证失败" });
      }
      if (!isMatch) {
        console.log("密码不匹配");
        return res.status(401).json({ message: "用户名或密码错误" });
      }
      // 登录成功
      console.log("登录成功:", username);
      res.json({
        success: true,
        message: "登录成功！",
        username: user.username,
        userId: user.id // 添加用户ID到响应中
      });
    });
  } catch (err) {
    console.error("登录过程中发生错误:", err);
    return res.status(500).json({ message: "数据库查询错误：" + err.message });
  }
});

// 注册接口（用于创建测试用户）
// 在 server/routes/auth.js 的 register 路由中
router.post("/register", (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("收到注册请求:", { username }); // 添加此日志

    // 验证输入
    if (!username || !password) {
      return res.status(400).json({ message: "用户名和密码不能为空" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("密码加密错误:", err);
        return res
          .status(500)
          .json({ message: "密码加密失败：" + err.message });
      }

      try {
        console.log("尝试插入用户:", username);
        const result = db
          .prepare("INSERT INTO users (username, password) VALUES (?, ?)")
          .run(username, hashedPassword);
        console.log("用户插入成功:", result);
        res.status(201).json({
          message: "注册成功！可以登录了",
          userId: result.lastInsertRowid,
        });
      } catch (err) {
        console.error("数据库插入错误:", err);
        if (err.message && err.message.includes("UNIQUE constraint failed")) {
          return res.status(400).json({ message: "用户名已被注册" });
        }
        return res.status(500).json({
          message: "注册失败",
          error:
            process.env.NODE_ENV === "development"
              ? err.message
              : "服务器内部错误",
        });
      }
    });
  } catch (error) {
    console.error("注册过程中发生未捕获的错误:", error);
    return res.status(500).json({ message: "服务器内部错误" });
  }
});

// 获取用户列表（仅返回id、用户名和创建时间，不返回密码）
router.get("/users", (req, res) => {
  try {
    // 使用参数化查询获取用户列表，不返回密码字段
    const users = db.prepare("SELECT id, username, created_at FROM users ORDER BY created_at DESC").all();
    res.json({
      success: true,
      data: users
    });
  } catch (err) {
    console.error("查询用户列表失败:", err);
    res.status(500).json({
      success: false,
      message: "查询用户列表失败"
    });
  }
});

// 根据用户名查询单个用户信息（不返回密码）
router.get("/users/:username", (req, res) => {
  const { username } = req.params;
  
  if (!username) {
    return res.status(400).json({
      success: false,
      message: "用户名不能为空"
    });
  }
  
  try {
    // 参数化查询，防止SQL注入
    const user = db.prepare(
      "SELECT id, username, created_at FROM users WHERE username = ?"
    ).get(username);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "用户不存在"
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error("查询用户失败:", err);
    res.status(500).json({
      success: false,
      message: "查询用户失败"
    });
  }
});

module.exports = router;
