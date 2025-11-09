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
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  // 密码加密（10为加密强度）
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "密码加密失败：" + err.message });
    }

    try {
      // 插入用户到数据库（同步操作）
      db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(
        username,
        hashedPassword
      );
      res.status(201).json({ message: "注册成功！可以登录了" });
    } catch (err) {
      // 用户名已存在时触发唯一约束错误
      return res.status(400).json({ message: "用户名已被注册" });
    }
  });
});

module.exports = router;
