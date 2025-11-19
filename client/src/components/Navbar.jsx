import React from "react";
import { useAuth } from "../main.jsx";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link to="/todo">Todo</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link to="/welcome">Welcome</Link>
            </li>
            <li>
              <button onClick={logout} style={{ 
                background: 'none', 
                border: 'none', 
                color: 'black', 
                cursor: 'pointer', 
                textDecoration: 'none',
                fontSize: '20px',
                lineHeight: '40px',
                marginLeft: '20px',
                padding: 0,
                display: 'block'
              }}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
