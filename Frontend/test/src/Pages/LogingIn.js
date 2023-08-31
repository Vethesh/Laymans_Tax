import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/es/input/Input";
import { Link, useNavigate } from "react-router-dom";
// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";
import axios from "axios";
import Spinner from "../Componenets/Spinner";
const LogingIn = () => {
  const [load, setload] = useState(false);
  const navigate = useNavigate();
  const submitlhandler = async val => {
    console.log(val);
    try {
      setload(true);
      const { data } = await axios.post("/users/login", val);
      setload(false);
      message.success("Login successfull");

      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/user/2");
    } catch (error) {
      setload(false);
      message.error("something went wrong");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      {load && <Spinner />}

      <div className="register">
        <Form layout="vertical" onFinish={submitlhandler}>
          <h3>Login page</h3>

          <Form.Item label="email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex">
            <button className="btn btn-primary">Login</button>
          </div>
          <Link to="/signup">Dont have account yet?register here</Link>
        </Form>
      </div>
    </>
  );
};

export default LogingIn;
