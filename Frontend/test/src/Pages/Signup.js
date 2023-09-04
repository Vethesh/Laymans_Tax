import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/es/input/Input";
import { Link, useNavigate } from "react-router-dom";

import Spinner from "../Componenets/Spinner";

import axios from "axios";
import Layout from "../Componenets/Layout";
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
    <Layout>
      {loading && <Spinner />}

      <div className="register">
        <Form layout="vertical" onFinish={submithandler}>
          <div className="input-box">
            <h2>Register page</h2>
            <div className="input">
              <Form.Item label={<span>Name</span>} name="name">
                <Input type="text" />
              </Form.Item>
            </div>
            <div className="input">
              <Form.Item label={<span>Email</span>} name="email">
                <Input type="email" rules={{ required: "email is required" }} />
              </Form.Item>
            </div>
            <div className="input">
              <Form.Item label={<span>Phone</span>} name="Phone">
                <Input type="Phoneno" />
              </Form.Item>
            </div>
            <div className="input">
              <Form.Item label={<span>Password</span>} password="password">
                <Input type="passowrd" />
              </Form.Item>
            </div>
            <div className="input">
              <div className="d-flex align-center">
                <button className="btn btn-primary">Register</button>
              </div>
              <Link to="/login">already registered?login here</Link>
            </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Signup;
