import React, { useState } from "react";
import "../Users/style.css";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

import Gst from "../Services/Gst";
import Bookkeeping from "../Services/Bookkeeping";
import Income from "../Services/Income";
import Profile from "../Pages/Profile";
import Task from "../Users/Task";
import { UserOutlined } from "@ant-design/icons";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import Blogs from "../Admin/Blogs";
import MenuAppBar from "../Users/Appbar";
import { Avatar, Button } from "@mui/material";
const Admin = () => {
  const [profile, setProfile] = useState(false);
  const [task, setTask] = useState(true);
  const [book, setBook] = useState(false);
  const [gst, setGst] = useState(false);
  const [income, setIncome] = useState(false);
  const [blog, setBlog] = useState(false);
  const navigate = useNavigate();
  const handleback = () => {
    navigate("/");
  };
  return (
    <div className="main-user">
      <div className="nav-container">
        <div className="user-info">
          <div className="go-back">
            <Button
            sx={{marginTop:"3%"}}
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
              A
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
                setBlog(false);
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
                setBlog(false);
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
                setBlog(false);
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
                setBlog(false);
                setTask(false);
              }}>
              Income
            </Menu.Item>
            <Menu.Item
              icon={<HistoryEduOutlinedIcon />}
              onClick={() => {
                setProfile(false);
                setBook(false);
                setGst(false);
                setIncome(false);
                setBlog(true);
                setTask(false);
              }}>
              Blog
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
          <MenuAppBar />
          {book && <Bookkeeping />}
          {gst && <Gst />}
          {income && <Income />}

          {profile && <Profile />}
          {task && <Task />}
          {blog && <Blogs />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
