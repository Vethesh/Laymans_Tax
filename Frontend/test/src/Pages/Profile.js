import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Space } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./profile.css";
import Spinner from "../Componenets/Spinner";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("user");
    const getid = JSON.parse(data);
    const userId = getid?.id;

    if (userId) {
      axios
        .get(`http://localhost:3002/user/${userId}`)
        .then((response) => {
          const Data = response.data.user;
        
          console.log(typeof Data)
          setFormData(
           {name:Data.name,email:Data.email,phone:Data.phone}
          );
          console.log(formData)
        })
        .catch((error) => {
          console.error(error);
          message.error("Failed to fetch user data");
        });
    }
  }, []);

  const submitHandler = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 8000));
      // Perform the update operation here
      // For demonstration purposes, we'll just show a success message
      message.success("Profile updated successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Invalid credentials");
    }
  };

  return (
    <div className="user-profile">
      {loading && <Spinner />}

      <h2>User Profile Page</h2>

      <Form
        layout="vertical"
        onFinish={submitHandler}
        initialValues={formData} // Initialize form with user data
      >
        <Form.Item label="Name" name="name">
          <Input
            prefix={<UserOutlined />}
            type="text"
            name="name"
            disabled={!isEditing}
            defaultValue={formData.name} // Add value prop to prefill the input field
          />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input
            prefix={<MailOutlined />}
            type="email"
            name="email"
            disabled={!isEditing}
            defaultValue={formData.email} // Add value prop to prefill the input field
          />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input
            prefix={<PhoneOutlined />}
            type="tel"
            name="phone"
            disabled={!isEditing}
            defaultValue={formData.phone} // Add value prop to prefill the input field
          />
        </Form.Item>

        <Space>
          {isEditing ? (
            <>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 16 }}>
                Save
              </Button>
              <Button type="default" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </>
          )}
        </Space>
      </Form>
    </div>
  );
};

export default Profile;
