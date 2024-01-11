import React, { useEffect, useState } from "react";
import "./style.css";
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
import { Avatar, Button } from "@mui/material";
import MenuAppBar from "./Appbar";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
const User = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("task"); // Default active section
  const [showProfile, setShowProfile] = useState(false); // Control whether to show the profile section
  const data = localStorage.getItem("user");
  const sid = localStorage.getItem("sessionID");
  const mail = JSON.parse(data);
  console.log(mail);
  useEffect(() => {
    if (!sid) {
      navigate("/home");
    }
  }, [sid, navigate]);

  const handlelogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("formdata");
    localStorage.removeItem("sessionID");
    navigate("/login");
  };
  const handleback = () => {
    navigate("/home");
  };
  const toggleSidebar = () => {
    
  };
  return (
    <>
      {!sid ? (
        navigate("/home")
      ) : (
        <div className="main-user">
          <div className="nav-container">
            <div className="user-info">
              <MenuOpenRoundedIcon />
              <div className="hamburger-menu" onClick={toggleSidebar}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
              <div className="go-back">
                <Button
                  sx={{ marginTop: "3%" }}
                  startIcon={<KeyboardBackspaceOutlinedIcon />}
                  onClick={handleback}
                >
                  Home
                </Button>
              </div>
              <div className="avatar">
                <Avatar
                  sx={{
                    bgcolor: "orange",
                    marginLeft: "40%",
                    width: "3.5rem",
                    height: "3.5rem",
                  }}
                >
                  {mail.email[0].toUpperCase()}
                </Avatar>
              </div>
              <div className="user-name" style={{ textAlign: "center" }}>
                Hello {mail.email}
              </div>
            </div>
            <div className="options">
              <Menu
                theme="dark"
                style={{
                  display: "grid",
                  gridGap: "1rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                <Menu.Item
                  icon={<UserOutlined />}
                  key="profile"
                  onClick={() => {
                    setActiveSection("profile");
                    setShowProfile(true);
                  }}
                >
                  My profile
                </Menu.Item>
                <Menu.Item
                  icon={<TaskAltOutlinedIcon />}
                  key="task"
                  onClick={() => {
                    setActiveSection("task");
                    setShowProfile(false); // Close the profile section
                  }}
                >
                  My task
                </Menu.Item>
                <Menu.Item
                  icon={<ImportContactsOutlinedIcon />}
                  key="book"
                  onClick={() => {
                    setActiveSection("book");
                    setShowProfile(false); // Close the profile section
                  }}
                >
                  Book keeping
                </Menu.Item>
                <Menu.Item
                  icon={<AccountBalanceOutlinedIcon />}
                  key="gst"
                  onClick={() => {
                    setActiveSection("gst");
                    setShowProfile(false); // Close the profile section
                  }}
                >
                  Gst
                </Menu.Item>
                <Menu.Item
                  icon={<CurrencyRupeeOutlinedIcon />}
                  key="income"
                  onClick={() => {
                    setActiveSection("income");
                    setShowProfile(false); // Close the profile section
                  }}
                >
                  Income
                </Menu.Item>
              </Menu>
            </div>
            <div className="btn">
              <Button
                onClick={handlelogout}
                endIcon={<LogoutIcon />}
                style={{
                  width: "60%",
                  marginTop: "10%",
                }}
                color="error"
                variant="contained"
              >
                Log out
              </Button>
            </div>
          </div>
          <div className="body-container">
            <div className="parent">
              <MenuAppBar />
              {showProfile && <Profile />}
              {activeSection === "book" && <Bookkeeping />}
              {activeSection === "gst" && <Gst />}
              {activeSection === "income" && <Income />}
              {activeSection === "task" && <Task />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
