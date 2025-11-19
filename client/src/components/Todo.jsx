import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import catPaw from "/catPaw.svg";
import NavBar from "./Navbar";
import "../css/Todo.css";

const Todo = () => {
  // 1. 状态定义区域（预留：可添加任务列表、输入框值等状态）
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // TODO: 可添加更多状态（如任务列表数组、编辑状态等）

  // 2. 导航功能（预留：可用于跳转其他页面）
  const navigate = useNavigate();

  // 3. 基础交互方法（预留：可完善逻辑）
  const handleInputChange = (e) => {
    console.log("Input change:", e.target.value);
    setTaskInput(e.target.value);

    // TODO: 可添加输入验证逻辑
  };

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
    // TODO: 完善添加任务逻辑
    console.log("Create a Task:", taskInput);
    setTaskInput("");
  };
  const handleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    console.log("Complete Task:", taskId);
  };
  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    console.log("Delete Task:", taskId);
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
    console.log("Start Edit Task:", task.id);
  };
  const saveEdit = () => {
    setTasks(
      tasks.map(
        (task) =>
          task.id === editingId ? { ...task, text: editingText } : task // 改用 editingId
      )
    );
    setEditingId(null);
    setEditingText("");
    console.log("Save Edit Task:", editingId); // 改用 editingId
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
    console.log("Cancel Edit Task:", editingId); // 改用 editingId
  };
  const TotalTasks = tasks.length;
  const CompletedTasks = tasks.filter((task) => task.completed).length;
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
              placeholder="Please input the task..."
            />
            <button onClick={handleAddTask}>Add</button>
          </div>

          {/* 任务列表区域（预留UI和交互） */}
          <div className="task-list">
            {tasks.length === 0 ? (
              // 没有任务时显示提示
              <div className="task-item">
                <span>None Task</span>
              </div>
            ) : (
              // 有任务时渲染任务列表
              tasks.map((task) => (
                <div
                  className={`task-item ${task.completed ? "completed" : ""}`}
                  key={task.id}
                >
                  {editingId === task.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit();
                        if (e.key === "Escape") cancelEdit();
                      }}
                    />
                  ) : (
                    <span>{task.text}</span>
                  )}
                  <div className="task-actions">
                    {/* 编辑模式下显示保存/取消，普通模式下显示正常按钮 */}
                    {editingId === task.id ? (
                      <>
                        <button onClick={saveEdit}>💾Save</button>
                        <button onClick={cancelEdit}>❌Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleComplete(task.id)}>
                          {task.completed ? "↩️Undo" : "✅Completed"}
                        </button>
                        <button onClick={() => startEdit(task)}>✍️Edit</button>
                        <button onClick={() => handleDelete(task.id)}>
                          ❌️Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 统计信息区域（预留） */}
          <div className="stats">
            {/* TODO: 显示已完成/总任务数 */}
            <p>
              Completed: {CompletedTasks} / Total Tasks: {TotalTasks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
