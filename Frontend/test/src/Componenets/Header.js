import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src="#" alt="comapny-logo" />
      </div>
      <div className="navbar">
        <nav>
          <ul>
            <li style={{ cursor: "pointer" }}>
              <Link to={"/bookkeeping"}>Book Keeping</Link>
            </li>
            <li style={{ cursor: "pointer" }}>
              <Link to={"/income"}> Income</Link>
            </li>
            <li style={{ cursor: "pointer" }}>
              <Link to={"/signup"}> signup</Link>
            </li>
            <li style={{ cursor: "pointer" }}>
              <Link to={"/login"}> Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
