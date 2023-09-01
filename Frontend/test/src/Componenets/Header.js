import React from "react";
import { Link } from "react-router-dom";
// import { GitHaburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        {/* <img src="#" alt="comapny-logo" /> */}
        <h2><span>L</span>ayman's
          <span>T</span>ax
        </h2>
      </div>
      <div className="navbar">
        <nav>
          <ul>
            <li style={{ cursor: "pointer" }}>
              <Link to={"/"}>Home</Link>
            </li>
            <li style={{ cursor: "pointer" }}>
              <Link to={"/about"}> aboutus</Link>
            </li>
            <li style={{ cursor: "pointer" }}>
              <Link to={"/signup"}> signup</Link>
            </li>
            <li style={{ cursor: "pointer" }}>
              <Link to={"/login"}> Login</Link>
            </li>
          </ul>
        </nav>
        {/* <div className="hamburger-menu">
          <a href="#">
            <GitHaburgerMenu/>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
