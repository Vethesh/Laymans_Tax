import React from "react";
import { Button, Menu, Typography, Avatar } from "antd";

import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./style.css";
const User = () => {
  return (
    <div className="main-user">
      <div className="nav-container">
        <div className="logo-container">
          <Avatar src={"A"} size={"large"} />
          <Typography.Title level={2} className="logo">
            <Link to="/">Layman Tax</Link>
            <div>hello [user_name]!!!</div>
          </Typography.Title>
          <Button className="menu-control-container"></Button>
        </div>
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrency">Cryprocurrency</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="rest-body">show the cards</div>
    </div>
  );
};

export default User;
