import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/es/input/Input";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Spinner from "../Componenets/Spinner";

const Profile = () => {
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "abc",
    email: "abc@gmail.com",
    phone: "1928736455",
    password: "*****",
  });
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const submithandler = async () => {
    console.log(formData);
    try {
      setloading(true);
      // Simulate an API request to update user data
      // Replace this with your actual API request

      isEditing(true);
      await new Promise(resolve => setTimeout(resolve, 8000));
      message.success("Profile updated successfully");
      setloading(false);
      setIsEditing(false); // Disable editing after successful update
    } catch (error) {
      setloading(false);
      message.error("Invalid credentials");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  // Function to handle changes in form fields
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {loading && <Spinner />}

      <div className="user-profile">
        <Form layout="vertical" onFinish={submithandler}>
          <h2>user profile page</h2>

          <Form.Item label="Name" name="name">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing} // Disable input when not editing
            />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing} // Disable input when not editing
            />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing} // Disable input when not editing
            />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={!isEditing} // Disable input when not editing
            />
          </Form.Item>

          <div className="input">
            <div className="d-flex align-center">
              {isEditing ? (
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={submithandler}>
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)} // Enable editing
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Profile;
