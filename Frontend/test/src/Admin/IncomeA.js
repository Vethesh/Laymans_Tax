import React, { useEffect, useState } from "react";
import { Table, Select, Button } from "antd";
import axios from "axios";

const { Option } = Select;

const IncomeA = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`http://localhost:3002/getitr`);
        const userData = response.data.data;

        if (userData.length > 0) {
          const filteredData = response.data.data.map(user => ({
            name: user.name,
            email: user.email,
            phone: user.phone,
            date: user.date.slice(0, 10),
            service: user.service,
            fileNames: JSON.parse(user.filename),
            fileData: user.fileData,
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

  const downloadFile = (fileData, fileName) => {
    // Convert hex data to binary
    const binaryData = atob(fileData);

    // Create a blob from the binary data
    const blob = new Blob([new Uint8Array(binaryData)], {
      type: "application/octet-stream",
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a download link and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    // Revoke the blob URL
    window.URL.revokeObjectURL(url);
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
              {fileName}
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

  return (
    <Table
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={true}
    />
  );
};

export default IncomeA;
