import React, { useState } from "react";
import { Form, message } from "antd";
import Input from "antd/es/input/Input";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Spinner from "../Componenets/Spinner";
import Layout from "../Componenets/Layout";

const LogingIn = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async values => {
    try {
      setLoad(true);
      const { data } = await axios.post(
        "http://localhost:3002/user/login",
        values
      );
      console.log(data);
      setLoad(false);

      if (data.sessionID) {
        // Save the session ID to local storage
        localStorage.setItem("sessionID", data.sessionID);
        localStorage.setItem("user", JSON.stringify(data));
        // Redirect to the user's or admin's dashboard based on their type
        if (data.type === "admin") {
          navigate(`/admin/${data.id}`);
        } else {
          navigate(`/user/${data.id}`);
        }
      } else {
        // Handle login failure
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setLoad(false);
      message.error("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <Layout>
      {load && <Spinner />}

      <div className="register">
        <Form layout="vertical" onFinish={submitHandler}>
          <div className="input-box">
            <h2>Login page</h2>

            <div className="input">
              <Form.Item label={<span>Email</span>} name="email">
                <Input
                  type="email"
                  rules={[{ required: true, message: "Email is required" }]}
                />
              </Form.Item>
            </div>
            <div className="input">
              <Form.Item label={<span>Password</span>} name="password">
                <Input type="password" />
              </Form.Item>
            </div>
            <div className="input">
              <div className="d-flex align-center">
                <button className="btn btn-primary">Login</button>
              </div>
              <Link to="/signup">Don't have an account yet? Register here</Link>
              <br />
              <Link to="/forgot">Forgot Password?</Link>
            </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default LogingIn;
