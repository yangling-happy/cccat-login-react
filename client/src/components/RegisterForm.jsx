import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 图标路径与登录表单一致，对应 public 目录下的 catPaw.svg
import catPaw from "/catPaw.svg";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // 用于注册成功后跳转登录页

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    // 用户名验证
    if (!formData.username.trim()) {
      newErrors.username = "Username cannot be empty";
    }
    // 密码验证
    if (!formData.password) {
      newErrors.password = "Password cannot be empty";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    // 确认密码验证
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        // 调用后端注册接口（与 server/routes/auth.js 对应）
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Registration failed");

        alert("Registration successful! Please log in.");
        navigate("/"); // 跳回登录页
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {/* 用户名输入框 */}
        <div className="input-group">
          <img src={catPaw} alt="Paw icon" width="70" height="70" />
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className={errors.username ? "error" : ""}
            disabled={isLoading}
          />
        </div>
        {errors.username && (
          <div className="error-message">{errors.username}</div>
        )}

        {/* 密码输入框 */}
        <div className="input-group">
          <img src={catPaw} alt="Paw icon" width="70" height="70" />
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={errors.password ? "error" : ""}
            disabled={isLoading}
          />
        </div>
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}

        {/* 确认密码输入框 */}
        <div className="input-group">
          <img src={catPaw} alt="Paw icon" width="70" height="70" />
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={errors.confirmPassword ? "error" : ""}
            disabled={isLoading}
          />
        </div>
        {errors.confirmPassword && (
          <div className="error-message">{errors.confirmPassword}</div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#ff7777", textDecoration: "none" }}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
