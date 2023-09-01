import React from "react";
import "./style.css";
import { Avatar } from "antd";
// import { UserOutlined } from "@ant-design/icons";
const User = () => {
  return (
    <div className="main-user">
      <div className="nav-container">
        <div className="user-info">
          <div className="company-title">Laymans Tax</div>
          <Avatar size="large" />
          <div className="user-name">User Name</div>
        </div>
        <div className="options">
          <div className="option">Option 1</div>
          <div className="option">Option 2</div>
          <div className="option">Option 3</div>
          <div className="option">Option 4</div>
          <div className="option">Option 5</div>
        </div>
        <button className="logout-button">Logout</button>
      </div>
      <div className="body-container">
        {/* Content for the right div (80%) */}
      </div>
    </div>
  );
};

export default User;
