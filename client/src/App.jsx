import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom"; // 新增 Navigate
import Navbar from "./components/Navbar.jsx";
import LeftSide from "./components/LeftSide.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import Todo from "./components/ToDo.jsx";
import Chat from "./components/Chat.jsx";
import Welcome from "./components/Welcome.jsx";
import { useAuth } from "./main.jsx";
import "./css/index.css";

// 定义带左侧区域的布局组件（局部复用，不单独抽离文件）
const WithLeftSide = () => (
  <div className="main-layout">
    <LeftSide />
    <Outlet /> {/* 子路由内容会渲染在这里 */}
  </div>
);

// 受保护的路由组件
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  
  // 如果未认证，重定向到登录页
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // 如果已认证，渲染子路由
  return <Outlet />;
};

const App = () => {
  return (
    <div className="app">
      <Navbar /> {/* 全局导航栏 */}
      <Routes>
        {/* 公开路由：未登录用户可以访问 */}
        <Route element={<WithLeftSide />}>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        {/* 受保护路由：只有登录用户可以访问 */}
        <Route element={<ProtectedRoute />}>
          <Route path="/todo" element={<Todo />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/welcome" element={<Welcome />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
