import React, { useEffect, useState } from "react";
import { Form } from "antd";
import Input from "antd/es/input/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import Select from "react-select"; // Import react-select

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const options = [
  "GSTR-1",
  "GSTR-3B",
  "GSTR-4",
  "GSTR-9",
  "ITR-1 (Sahaj)",
  "ITR-2",
  "ITR-3",
  "ITR-4 (Sugam)",
  "ITR-5",
  "Proprietor",
  "Partnership",
  "LLP",
  "Company",
];

const FormData = () => {
  const [typeofservice, setTypeofservice] = useState("");
  const navigate = useNavigate();

  const submithandler = val => {
    console.log(val);
    console.log(typeofservice.value);
  };

  // Prevent user for login
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register">
      <Form layout="vertical" onFinish={submithandler} style={{ width: "50%" }}>
        <h2>File return Form</h2>

        <Form.Item label={<span>Name</span>} name="name">
          <Input type="text" />
        </Form.Item>

        <Form.Item label={<span>Email</span>} name="email">
          <Input type="email" rules={{ required: "email is required" }} />
        </Form.Item>

        <Form.Item label={<span>Phone</span>} name="Phone">
          <Input type="Phoneno" />
        </Form.Item>

        <Form.Item label={<span>Services</span>} name="services">
          <Select
            options={options.map(option => ({
              value: option,
              label: option,
            }))}
            value={typeofservice}
            onChange={e => {
              setTypeofservice(e);
            }}
            isSearchable={false}
            placeholder="Select a service"
          />
        </Form.Item>

        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>

        <div className="d-flex align-center mt-3">
          <button className="btn btn-primary">Submit</button>
        </div>
      </Form>
    </div>
  );
};

export default FormData;
