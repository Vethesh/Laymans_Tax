import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/es/input/Input";
import { Link, useNavigate } from "react-router-dom";
// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";
import axios from "axios";
import Spinner from "../Componenets/Spinner";
import Layout from "../Componenets/Layout";
const LogingIn = () => {
  const [load, setload] = useState(false);
  const navigate = useNavigate();
  const submitlhandler = async (val) => {
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
    <Layout>
      {load && <Spinner />}

      <div className="register">
        <Form layout="vertical" onFinish={submitlhandler}>
          <div className="input-box">
            <h2>Login page</h2>

            <div className="input">
              <Form.Item label={<span>Email</span>} name="email">
                <Input type="email" rules={{ required: "email is required" }} />
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
              <Link to="/signup">Dont have account yet?register here</Link>
              </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default LogingIn;
