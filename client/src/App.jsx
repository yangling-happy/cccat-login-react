import React from "react";
import Navbar from "./components/Navbar.jsx";
import LeftSide from "./components/LeftSide.jsx";
import LoginForm from "./components/LoginForm.jsx";
import "./index.css";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        <LeftSide />
        <LoginForm />
      </div>
    </div>
  );
};

export default App;
