import React from "react";
import { Routes, Route, Outlet } from "react-router-dom"; // 新增 Outlet
import Navbar from "./components/Navbar.jsx";
import LeftSide from "./components/LeftSide.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import Todo from "./components/Todo.jsx";
import "./index.css";

// 定义带左侧区域的布局组件（局部复用，不单独抽离文件）
const WithLeftSide = () => (
  <div className="main-layout">
    <LeftSide />
    <Outlet /> {/* 子路由内容会渲染在这里 */}
  </div>
);

const App = () => {
  return (
    <div className="app">
      <Navbar /> {/* 全局导航栏 */}
      <Routes>
        {/* 登录/注册页：使用带左侧区域的布局 */}
        <Route element={<WithLeftSide />}>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        {/* Todo 页：独立渲染，不包含左侧区域 */}
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
};

export default App;
