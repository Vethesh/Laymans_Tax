import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

import Gst from "../Services/Gst";
import Bookkeeping from "../Services/Bookkeeping";
import Income from "../Services/Income";
import Profile from "../Users/Profile";
import Task from "../Users/Task";
import { UserOutlined } from "@ant-design/icons";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Avatar, Button } from "@mui/material";
const User = () => {
  const [profile, setProfile] = useState(false);
  const [task, setTask] = useState(true);
  const [book, setBook] = useState(false);
  const [gst, setGst] = useState(false);
  const [income, setIncome] = useState(false);
  const navigate = useNavigate();
  const handleback = () => {
    navigate("/");
  };
  return (
    <div className="main-user">
      <div className="nav-container">
        <div className="user-info">
          <div className="company-title" style={{ textAlign: "center" }}>
            Laymans Tax
          </div>
          <div className="go-back">
            <Button
              startIcon={<KeyboardBackspaceOutlinedIcon />}
              onClick={handleback}>
              Home
            </Button>
          </div>
          <div className="avatar">
            <Avatar
              sx={{
                bgcolor: "orange ",
                marginLeft: "40%",
                width: "3.5rem",
                height: "3.5rem",
              }}>
              N
            </Avatar>
          </div>
          <div className="user-name" style={{ textAlign: "center" }}>
            User Name
          </div>
        </div>
        <div className="options">
          <Menu
            theme={"dark"}
            style={{
              display: "grid",
              gridGap: "1rem",
              fontSize: "1rem",
              fontWeight: "bold",
            }}>
            <Menu.Item
              icon={<UserOutlined />}
              onClick={() => {
                setProfile(true);
                setBook(false);
                setGst(false);
                setIncome(false);

                setTask(false);
              }}>
              My profile
            </Menu.Item>
            <Menu.Item
              icon={<TaskAltOutlinedIcon />}
              onClick={() => {
                setProfile(false);
                setBook(false);
                setGst(false);
                setIncome(false);

                setTask(true);
              }}>
              My task
            </Menu.Item>
            <Menu.Item
              icon={<ImportContactsOutlinedIcon />}
              onClick={() => {
                setProfile(false);
                setBook(true);
                setGst(false);
                setIncome(false);

                setTask(false);
              }}>
              Book keeping
            </Menu.Item>

            <Menu.Item
              icon={<AccountBalanceOutlinedIcon />}
              onClick={() => {
                setProfile(false);
                setBook(false);
                setGst(true);
                setIncome(false);

                setTask(false);
              }}>
              Gst
            </Menu.Item>
            <Menu.Item
              icon={<CurrencyRupeeOutlinedIcon />}
              onClick={() => {
                setProfile(false);
                setBook(false);
                setGst(false);
                setIncome(true);

                setTask(false);
              }}>
              Income
            </Menu.Item>
          </Menu>
        </div>
        <div className="btn">
          <Button
            endIcon={<LogoutIcon />}
            style={{
              width: "60%",
              marginTop: "10%",
            }}
            color="error"
            variant="contained">
            Log out
          </Button>
        </div>
      </div>
      <div className="body-container">
        <div className="parent">
          {book && <Bookkeeping />}
          {gst && <Gst />}
          {income && <Income />}

          {profile && <Profile />}
          {task && <Task />}
        </div>
      </div>
    </div>
  );
};

export default User;
