import React, { useState, useEffect } from "react";
import "../Users/style.css";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

import GstA from "./GstA";
import IncomeA from "./IncomeA";
import Profile from "../Pages/Profile";
import Alluser from "./Alluser";
import { UserOutlined } from "@ant-design/icons";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import Blogs from "../Admin/Blogs";
import MenuAppBar from "../Users/Appbar";
import { Avatar, Button } from "@mui/material";
import OthersA from "./OthersA";
import UserQueries from "./UserQueries";
const Admin = () => {
  const [profile, setProfile] = useState(false);
  const [task, setTask] = useState(true);
  const [book, setBook] = useState(false);
  const [gst, setGst] = useState(false);
  const [income, setIncome] = useState(false);
  const [blog, setBlog] = useState(false);
  const [query, setQuery] = useState(false);
  const navigate = useNavigate();
  const handleback = () => {
    navigate("/home");
  };
  const data = localStorage.getItem("user");
  const mail = JSON.parse(data);
  const sid = localStorage.getItem("sessionID");

  console.log(mail);
  useEffect(() => {
    if (!sid) {
      navigate("/home");
    }
  }, [sid, navigate]);
  const handlelogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("formdata");
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("sessionID");
    navigate("/login");
  };
  return (
    <>
      {!sid ? (
        navigate("/home")
      ) : (
        <div className="main-user">
          <div className="nav-container">
            <div className="user-info">
              <div className="go-back">
                <Button
                  sx={{ marginTop: "3%" }}
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
                    color: "white",
                  }}>
                  {mail.email[0].toUpperCase()}
                </Avatar>
              </div>
              <div className="user-name" style={{ textAlign: "center" }}>
                Hello {mail.type} !!
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
                    setQuery(false);
                  }}>
                  My profile
                </Menu.Item>
                <Menu.Item
                  icon={<GroupsOutlinedIcon />}
                  onClick={() => {
                    setProfile(false);
                    setBook(false);
                    setGst(false);
                    setIncome(false);
                    setQuery(false);
                    setTask(true);
                  }}>
                  All Users
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
                    setQuery(false);
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
                    setQuery(false);
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
                    setQuery(false);
                  }}>
                  Income
                </Menu.Item>
                <Menu.Item
                  icon={<QuestionAnswerOutlinedIcon />}
                  onClick={() => {
                    setProfile(false);
                    setBook(false);
                    setGst(false);
                    setIncome(false);
                    setBlog(false);
                    setTask(false);
                    setQuery(true);
                  }}>
                  User Queries
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
                    setQuery(false);
                  }}>
                  Blog
                </Menu.Item>
              </Menu>
            </div>
            <div className="btn">
              <Button
                onClick={handlelogout}
                endIcon={<LogoutIcon />}
                style={{
                  width: "60%",
                  marginTop: "5%",
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
              {book && <OthersA />}
              {gst && <GstA />}
              {income && <IncomeA />}

              {profile && <Profile />}
              {task && <Alluser />}
              {blog && <Blogs />}
              {query && <UserQueries />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
