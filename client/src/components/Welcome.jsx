import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../main.jsx";
import "../css/Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const username = user?.username || "User";
  
  // 处理登出
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="welcome-page">
      {/* 导航栏保持一致 */}
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/welcome">PurrSpace</Link>
          </li>
          <li>
            <Link to="/todo">Todos</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
        </ul>
      </nav>

      <div className="welcome-container">
        <div className="welcome-header">
          <h1>🎉 Welcome to CCcat Hub !</h1>
          <p className="welcome-subtitle">🐱What would you like to do today?</p>
        </div>

        <div className="welcome-cards">
          <div className="welcome-card" onClick={() => navigate("/todo")}>
            <div className="card-icon">📝</div>
            <h3>Todo List</h3>
            <p>Manage your tasks and stay organized</p>
          </div>

          <div className="welcome-card" onClick={() => navigate("/chat")}>
            <div className="card-icon">💬</div>
            <h3>Chat Room</h3>
            <p>Have a conversation with friends</p>
          </div>

          <div className="welcome-card" onClick={handleLogout}>
            <div className="card-icon">🚪</div>
            <h3>Logout</h3>
            <p>End your current session</p>
          </div>
        </div>

        <div className="welcome-footer">
          <p>© 2025 A.Y.</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
