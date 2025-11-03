import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/catalog">Catalog</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/join us"> Join us</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
