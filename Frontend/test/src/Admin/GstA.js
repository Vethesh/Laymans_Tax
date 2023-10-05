import React, { useEffect, useState } from "react";
import { Table, Select, Button } from "antd";
import axios from "axios";

const { Option } = Select;

const GstA = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`http://localhost:3002/getgst`);
        const userData = response.data.data;

        if (userData.length > 0) {
          const filteredData = response.data.data.map(user => ({
            name: user.name,
            email: user.email,
            phone: user.phone,
            date: user.date.slice(0, 10),
            service: user.service,
            fileNames: JSON.parse(user.filename),
            fileData: user.fileData, // Binary data from the backend
            key: user.id,
          }));
          setData(filteredData);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadFile = (hexFileData, fileName) => {
    try {
      // Determine the content type based on the file extension
      const fileExtension = getFileExtension(fileName);
      let contentType = "application/octet-stream"; // Default to binary data

      if (fileExtension === "pdf") {
        contentType = "application/pdf";
      } else if (["jpg", "jpeg", "png"].includes(fileExtension)) {
        contentType = `image/${fileExtension}`;
      } else if (fileExtension === "docx") {
        contentType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      }

      // Convert hex data to binary
      const binaryData = hexToBinary(hexFileData);

      // Create a blob from the binary data with the correct content type
      const blob = new Blob([new Uint8Array(binaryData)], {
        type: contentType,
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a download link and trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = trimFileName(fileName, fileExtension);
      a.click();

      // Revoke the blob URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error while downloading file:", error);
    }
  };

  const sendEmail = email => {
    window.location.href = `mailto:${email}`;
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Service", dataIndex: "service", key: "service" },
    {
      title: "File Names",
      key: "fileNames",
      render: (text, record) => (
        <Select style={{ width: 120 }}>
          {record.fileNames.map((fileName, index) => (
            <Option key={index} value={fileName}>
              {trimFileName(fileName)}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Download",
      key: "download",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => downloadFile(record.fileData, record.fileNames[0])}>
          Download
        </Button>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (text, record) => (
        <Button type="primary" onClick={() => sendEmail(record.email)}>
          Contact
        </Button>
      ),
    },
  ];
  // Function to convert hex data to binary
  const hexToBinary = hexString => {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
      bytes.push(parseInt(hexString.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
  };

  const trimFileName = fileName => {
    const cleanedFileName = fileName.replace(/[\[\],"\s]/g, "");
    return cleanedFileName;
  };

  const getFileExtension = fileName => {
    const cleanedFileName = fileName.replace(/[\[\],"\s]/g, "");
    return cleanedFileName.split(".").pop().toLowerCase();
  };

  return (
    <Table
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={true}
    />
  );
};

export default GstA;
