import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/es/input/Input";
import { Link, useNavigate } from "react-router-dom";
// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";
import Spinner from "../Componenets/Spinner";

import axios from "axios";
const Signup = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const submithandler = async val => {
    console.log(val);
    try {
      setloading(true);
      await axios.post("/users/register", val);
      message.success("Registration successfull");
      setloading(false);
      navigate("/login");
    } catch (error) {
      setloading(false);
      message.error("Invalid credentials");
    }
  };
  //prevent user for login

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      {loading && <Spinner />}

      <div className="register">
        <Form layout="vertical" onFinish={submithandler}>
          <h3>Register page</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="PhoneNo" name="phoneno">
            <Input type="phone" />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex align-center">
            <button className="btn btn-primary">Register</button>
          </div>
          <Link to="/login">already registered?login here</Link>
        </Form>
      </div>
    </>
  );
};

export default Signup;
