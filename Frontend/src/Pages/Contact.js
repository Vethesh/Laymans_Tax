import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/es/input/Input";
import { useNavigate } from "react-router-dom";

import Spinner from "../Componenets/Spinner";

import axios from "axios";
import Layout from "../Componenets/Layout";
const Contact = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const submithandler = async val => {
    console.log(val);
    try {
      setloading(true);
      const res = await axios.post("http://localhost:3002/contact", val);
      setloading(false);
      if (res.status === 200) {
        message.success("updated successfull");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setloading(false);
      message.error("Invalid credentials");
    }
  };

  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     navigate("/");
  //   }
  // }, [navigate]);
  return (
    <Layout>
      {loading && <Spinner />}

      <div className="register">
        <Form layout="vertical" onFinish={submithandler}>
          <h3>Contact us Here</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="PhoneNo" name="phone">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Queries" name="query">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex align-center">
            <button className="btn btn-primary">Submit</button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Contact;
