import React, { useState } from "react";
import { Form, Button, Input, message, Upload } from "antd";
import { Alert, AlertTitle } from "@mui/material";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import "./FormData.css"; // Import a CSS file for styling
import DatePicker from "react-datepicker";
import Select from "react-select"; // Import Select component from react-select
import "react-datepicker/dist/react-datepicker.css";
// import "react-select/dist/react-select-css";

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "http://localhost:3002/upload",
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
  { value: "GSTR-1", label: "GSTR-1" },
  { value: "GSTR-3B", label: "GSTR-3B" },
  { value: "GSTR-4", label: "GSTR-4" },
  { value: "GSTR-9", label: "GSTR-9" },
  { value: "ITR-1 (Sahaj)", label: "ITR-1 (Sahaj)" },
  { value: "ITR-2", label: "ITR-2" },
  { value: "ITR-3", label: "ITR-3" },
  { value: "ITR-4 (Sugam)", label: "ITR-4 (Sugam)" },
  { value: "ITR-5", label: "ITR-5" },
  { value: "Proprietor", label: "Proprietor" },
  { value: "Partnership", label: "Partnership" },
  { value: "LLP", label: "LLP" },
  { value: "Company", label: "Company" },
];

const FormData = () => {
  const [typeofservice, setTypeofservice] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const onFinish = async values => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("Phone", values.Phone);
      formData.append("services", typeofservice);

      // Append files to FormData
      values.files.fileList.forEach(file => {
        formData.append("files", file.originFileObj);
      });

      // Add Date Input Field
      formData.append("date", values.date.format("YYYY-MM-DD"));

      // Send the form data and files to the backend
      const response = await axios.post(
        "http://localhost:3002/upload",
        formData
      );

      if (response.status === 200) {
        setSubmissionSuccess(true);
      } else {
        message.error("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Form submission failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">File Return Form</h1>

      {submissionSuccess ? (
        <Alert className="form-alert" severity="success">
          <AlertTitle>Success</AlertTitle>
          Your form has been submitted successfully.
        </Alert>
      ) : (
        <Form layout="vertical" onFinish={onFinish} className="ant-form">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}>
            <Input type="text" className="ant-input" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}>
            <Input type="email" className="ant-input" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="Phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}>
            <Input type="tel" className="ant-input" />
          </Form.Item>
          <Form.Item label={<span>Services</span>} name="services">
            <Select
              options={options}
              value={typeofservice}
              onChange={e => {
                setTypeofservice(e);
              }}
              placeholder="Select a service"
            />
          </Form.Item>
          {/* Date Input Field */}
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}>
            <DatePicker  style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Upload Files" name="files">
            <Dragger {...props} className="ant-upload">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag files to this area to upload
              </p>
            </Dragger>
          </Form.Item>
          <div className="form-button-container">
            <Button
              className="ant-btn form-button"
              type="primary"
              htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default FormData;
