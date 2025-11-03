import React from "react";
import Navbar from "./components/Navbar";
import LeftSide from "./components/LeftSide";
import LoginForm from "./components/LoginForm";
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
