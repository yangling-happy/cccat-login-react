import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../main.jsx";

const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // 获取 URL 查询参数
  const initialUsername = searchParams.get("username") || "";
  const { login, isAuthenticated } = useAuth();

  // 如果已经认证，直接跳转到欢迎页
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/welcome");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    username: initialUsername,
    password: "",
  });
  const [errors, setErrors] = useState({}); // 添加 errors 状态
  const [isLoading, setIsLoading] = useState(false);

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
      newErrors.username = "Username is required.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    } else {
      const hasLowerCase = /[a-z]/.test(formData.password);
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasNumber = /\d/.test(formData.password);

      if (!(hasLowerCase && hasUpperCase && hasNumber)) {
        newErrors.password =
          "Requires uppercase, lowercase letters and numbers.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
          throw new Error(
            data.message ||
              "Oops! CCcat-login failed. Please check your username and password!"
          );
        }

        // 登录成功
        const userData = { username: data.username };
        login(userData); // 更新全局认证状态
        alert("Login successful! Welcome back," + data.username);
        navigate("/welcome"); // 不需要传递state，因为user信息已在context中
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
          {isLoading ? "Login..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
