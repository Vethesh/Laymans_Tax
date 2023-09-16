import React, {  useState } from "react";
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

      if (data.type === "admin") {
        // Check if an admin is already logged in
        const adminLoggedIn = localStorage.getItem("adminLoggedIn");

        if (!adminLoggedIn) {
          // If no admin is logged in, set the adminLoggedIn flag and proceed
          localStorage.setItem("adminLoggedIn", "true");
          message.success("Login successful");
          localStorage.setItem(
            "user",
            JSON.stringify({ ...data, password: "" })
          );
          navigate(`/admin/${data.id}`);
        } else {
          // If an admin is already logged in, show an error message
          message.error("Admin is already logged in.");
        }
      } else {
        // Redirect to the user's page for non-admin users
        message.success("Login successful");
        localStorage.setItem("user", JSON.stringify({ ...data, password: "" }));
        navigate(`/user/${data.id}`);
      }
    } catch (error) {
      setLoad(false);
      message.error("Wrong username or password. Please reset your password if needed.");
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
              <Link to="/forgot">Forgot Password?</Link> {/* Added Forgot Password link */}
            </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default LogingIn;
