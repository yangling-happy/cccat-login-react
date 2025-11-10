import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/catalog">Meow ToDo</a>
        </li>
        <li>
          <a href="/about">PawPal Chat</a>
        </li>
        <li>
          <a href="/join us"> Join us</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
