import React from "react";
import { Routes, Route } from "react-router-dom"; // 添加路由导入
import Navbar from "./components/Navbar.jsx";
import LeftSide from "./components/LeftSide.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx"; // 需要创建此组件
import "./index.css";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        <LeftSide />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
