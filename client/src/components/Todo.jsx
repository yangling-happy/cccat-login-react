import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import catPaw from "/catPaw.svg";
import NavBar from "./Navbar";
import "../Todo.css"; 

const Todo = () => {
  // 1. 状态定义区域（预留：可添加任务列表、输入框值等状态）
  const [taskInput, setTaskInput] = useState("");
  // TODO: 可添加更多状态（如任务列表数组、编辑状态等）

  // 2. 导航功能（预留：可用于跳转其他页面）
  const navigate = useNavigate();

  // 3. 基础交互方法（预留：可完善逻辑）
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
    // TODO: 可添加输入验证逻辑
  };

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    // TODO: 完善添加任务逻辑
    console.log("添加任务:", taskInput);
    setTaskInput("");
  };

  return (
    <div className="app">
      {/* 导航栏 */}
      <NavBar />

      {/* 主要内容区域 */}
      <div className="todo-background">
        <div className="todo-container">
          {/* 标题区域（静态UI示例） */}
          <h1>Todo List</h1>

          {/* 任务输入区域（预留交互逻辑） */}
          <div className="input-group">
            <svg src={catPaw} alt="Cat Paw Icon" />
            <input
              type="text"
              value={taskInput}
              onChange={handleInputChange}
              placeholder="请输入任务..."
            />
            <button onClick={handleAddTask}>添加</button>
          </div>

          {/* 任务列表区域（预留UI和交互） */}
          <div className="task-list">
            {/* TODO: 渲染任务列表 */}
            <div className="task-item">
              {/* 示例任务项（静态UI） */}
              <span>示例任务</span>
              <div className="task-actions">
                <button>完成</button>
                <button>编辑</button>
                <button>删除</button>
              </div>
            </div>
          </div>

          {/* 统计信息区域（预留） */}
          <div className="stats">
            {/* TODO: 显示已完成/总任务数 */}
            <p>已完成: 0 / 总任务: 0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
