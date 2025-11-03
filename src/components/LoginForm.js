import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("登录数据：", formData);
      alert("登录成功！");
    }
  };

  return (
    <div className="login-container">
      <h1>CCcat Login</h1>
      <div className="gif-wrap">
        <img src="/imgs/7.gif" id="gif" alt="" />
        <img src="/imgs/7.png" id="png" alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <svg width="70" height="70" viewBox="0 0 100 90">
            <path
              d="M50,20 Q80,20 90,50 Q90,80 50,80 Q10,80 10,50 Q20,20 50,20"
              fill="#fff3c4"
            />
            <circle cx="50" cy="55" r="15" fill="#ffccd5" />
            <circle cx="30" cy="30" r="10" fill="#ffccd5" />
            <circle cx="50" cy="20" r="10" fill="#ffccd5" />
            <circle cx="70" cy="30" r="10" fill="#ffccd5" />
          </svg>
          <label htmlFor="username">Username</label>
        </div>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
          autocomplete="off"
          className={errors.username ? "error" : ""}
        />
        {errors.username && (
          <div className="error-message">{errors.username}</div>
        )}
        <br />
        <div className="input-group">
          <svg width="70" height="70" viewBox="0 0 100 90">
            <path
              d="M50,20 Q80,20 90,50 Q90,80 50,80 Q10,80 10,50 Q20,20 50,20"
              fill="#fff3c4"
            />
            <circle cx="50" cy="55" r="15" fill="#ffccd5" />
            <circle cx="30" cy="30" r="10" fill="#ffccd5" />
            <circle cx="50" cy="20" r="10" fill="#ffccd5" />
            <circle cx="70" cy="30" r="10" fill="#ffccd5" />
          </svg>
          <label htmlFor="password">Password</label>
        </div>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          autocomplete="off"
          className={errors.password ? "error" : ""}
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginForm;
