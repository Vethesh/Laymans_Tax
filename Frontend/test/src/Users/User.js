import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Avatar, Button } from "antd";
import Gst from "../Services/Gst";
import Bookkeeping from "../Services/Bookkeeping";
import Income from "../Services/Income";
import Pricing from "../Services/Pricing";
import Profile from "../Users/Profile";
import Task from "../Users/Task";
// import { UserOutlined } from "@ant-design/icons";
const User = () => {
  const [profile, setProfile] = useState(false);
  const [task, setTask] = useState(true);
  const [book, setBook] = useState(false);
  const [gst, setGst] = useState(false);
  const [income, setIncome] = useState(false);
  const [pricing, setPricing] = useState(false);
  return (
    <div className="main-user">
      <div className="nav-container">
        <div className="user-info">
          <div className="company-title">Laymans Tax</div>
          <div>
            <Link to={"/"}>
              <h3>go back to home</h3>
            </Link>
          </div>
          <Avatar size="large" />
          <div className="user-name">User Name</div>
        </div>
        <div className="options">
          <div
            className="option"
            onClick={() => {
              setProfile(true);
              setBook(false);
              setGst(false);
              setIncome(false);

              setTask(false);
              setPricing(false);
            }}>
            My profile
          </div>
          <div
            className="option"
            onClick={() => {
              setProfile(false);
              setBook(false);
              setGst(false);
              setIncome(false);

              setTask(true);
              setPricing(false);
            }}>
            My task
          </div>
          <div
            className="option"
            onClick={() => {
              setProfile(false);
              setBook(true);
              setGst(false);
              setIncome(false);

              setTask(false);
              setPricing(false);
            }}>
            Book keeping
          </div>
          <div
            className="option"
            onClick={() => {
              setProfile(false);
              setBook(false);
              setGst(true);
              setIncome(false);

              setTask(false);
              setPricing(false);
            }}>
            Gst
          </div>
          <div
            className="option"
            onClick={() => {
              setProfile(false);
              setBook(false);
              setGst(false);
              setIncome(true);

              setTask(false);
              setPricing(false);
            }}>
            Income
          </div>

          <div
            className="option"
            onClick={() => {
              setProfile(false);
              setBook(false);
              setGst(false);
              setIncome(false);

              setTask(false);
              setPricing(true);
            }}>
            Pricing
          </div>
        </div>
        <Button>Log out</Button>
      </div>
      <div className="body-container">
        <div className="parent">
          {book && <Bookkeeping />}
          {gst && <Gst />}
          {income && <Income />}
        
          {profile && <Profile />}
          {task && <Task />}
          {pricing && <Pricing />}
        </div>
      </div>
    </div>
  );
};

export default User;
