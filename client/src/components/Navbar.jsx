import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/todo">ToDo</a>
        </li>
        <li>
          <a href="/chat">Chat</a>
        </li>
        <li>
          <a href="/join us">Join us</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
