const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // 用于密码加密/验证
const db = require("../db"); // 导入数据库连接

// 登录接口（前端登录时调用）
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 验证输入是否为空
  if (!username || !password) {
    return res.status(400).json({ message: "用户名和密码不能为空" });
  }

  try {
    // 从数据库查询用户（同步操作）
    const user = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username);

    // 用户名不存在
    if (!user) {
      return res.status(401).json({ message: "用户名或密码错误" });
    }

    // 验证密码（异步加密对比）
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "密码验证失败" });
      }
      if (!isMatch) {
        return res.status(401).json({ message: "用户名或密码错误" });
      }
      // 登录成功
      res.json({
        success: true,
        message: "登录成功！",
        username: user.username,
      });
    });
  } catch (err) {
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

module.exports = router;
