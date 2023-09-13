import React, { useEffect, useState } from "react";
import { Form, message, Select } from "antd";
import Input from "antd/es/input/Input";
import { Link, useNavigate } from "react-router-dom";

import Spinner from "../Componenets/Spinner";
import axios from "axios";
import Layout from "../Componenets/Layout";

const { Option } = Select;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async values => {
    try {
      const type = values.type;

      const requestData = {
        email: values.email,
        name: values.name,
        password: values.password,
        phone: values.phone,
        type: type,
      };
      setLoading(true);
      await axios.post("http://localhost:3002/user/register", requestData);
      message.success("Registration successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("sign up as user");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Layout>
      {loading && <Spinner />}

      <div className="register">
        <Form layout="vertical" onFinish={submitHandler}>
          <div className="input-box">
            <h2>Register page</h2>
            <div className="input">
              <Form.Item label={<span>Name</span>} name="name">
                <Input type="text" />
              </Form.Item>
            </div>
            <div className="input">
              <Form.Item label={<span>Email</span>} name="email">
                <Input type="email" />
              </Form.Item>
            </div>
            <div className="input">
              <Form.Item label={<span>Password</span>} name="password">
                <Input type="password" />
              </Form.Item>
            </div>
            <div className="input">
              <Form.Item label={<span>Phone</span>} name="phone">
                <Input type="text" />
              </Form.Item>
            </div>
            <div className="input">
              <Form.Item label={<span>User Type</span>} name="type">
                <Select defaultValue="user">
                  <Option value="user">User</Option>
                  <Option value="admin">Admin</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="input">
              <div className="d-flex align-center">
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </div>
              <Link to="/login">Already registered? Login here</Link>
            </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Signup;
