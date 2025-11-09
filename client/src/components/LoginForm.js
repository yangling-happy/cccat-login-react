import { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // 新增：加载状态

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "用户名不能为空";
    }
    if (!formData.password) {
      newErrors.password = "密码不能为空";
    } else if (formData.password.length < 6) {
      newErrors.password = "密码至少6位";
    } else {
      const hasLowerCase = /[a-z]/.test(formData.password);
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasNumber = /\d/.test(formData.password);

      if (!(hasLowerCase && hasUpperCase && hasNumber)) {
        newErrors.password = "密码至少包含大小写字母和数字";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 修改：对接后端登录接口
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true); // 开始加载
      try {
        // 调用后端登录接口（通过proxy转发到http://localhost:5000）
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData), // 发送表单数据（username和password）
        });

        const data = await response.json();

        if (!response.ok) {
          // 登录失败（后端返回错误信息）
          throw new Error(data.message || "登录失败，请检查用户名和密码");
        }

        // 登录成功
        alert("登录成功！欢迎回来，" + data.username);
        // 可添加跳转逻辑，例如：window.location.href = "/home";
      } catch (error) {
        // 显示后端返回的错误或网络错误
        alert(error.message);
      } finally {
        setIsLoading(false); // 结束加载
      }
    }
  };

  return (
    <div className="login-container">
      {/* 隐藏的假输入框 */}
      <input style={{ display: "none" }} type="text" autoComplete="username" />
      <input
        style={{ display: "none" }}
        type="password"
        autoComplete="new-password"
      />

      <h1>CCcat Login</h1>
      <div className="gif-wrap">
        <img src="/imgs/7.gif" id="gif" alt="" />
        <img src="/imgs/7.png" id="png" alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <img src="/catPaw.svg" width="70" height="70" alt="CCcat Icon" />
          <label htmlFor="username">Username</label>
        </div>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="off"
          className={errors.username ? "error" : ""}
          disabled={isLoading} // 加载时禁用输入
        />
        {errors.username && (
          <div className="error-message">{errors.username}</div>
        )}
        <br />
        <div className="input-group">
          <img src="/catPaw.svg" width="70" height="70" alt="CCcat Icon" />
          <label htmlFor="password">Password</label>
        </div>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
          className={errors.password ? "error" : ""}
          disabled={isLoading} // 加载时禁用输入
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "登录中..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginForm;
