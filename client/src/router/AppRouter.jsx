// 路由配置：管理登录页和注册页的跳转
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App"; // 根组件（包含左侧猫咪区域）
import RegisterForm from "../components/RegisterForm"; // 注册表单
import Todo from "./components/Todo";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 登录页：默认显示 App 组件（包含 LeftSide + LoginForm） */}
        <Route path="/" element={<App />} />
        {/* 注册页：复用 App 的布局，替换表单为 RegisterForm */}
        <Route
          path="/register"
          element={<App formComponent={<RegisterForm />} />}
        />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
