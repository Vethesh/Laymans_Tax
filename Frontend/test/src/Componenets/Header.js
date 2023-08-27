import React from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="header">
        <nav>
          <ul>
            <li onClick={"#"}>a</li>
            <li onClick={"#"}>a</li>
            <li onClick={navigate("/signup")}>signup</li>
            <li onClick={navigate("/login")}>Login</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
