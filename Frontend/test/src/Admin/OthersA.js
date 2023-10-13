import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const OthersA = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`http://localhost:3002/getother`);
        const userData = response.data.data;
        console.log(userData);

        if (userData.length > 0) {
          const filteredData = userData.map(user => ({
            name: user.name,
            email: user.email,
            phone: user.phone,
            date: user.date.slice(0, 10),
            service: user.service,
            fileNames: [user.file_name],
            fileData: user.file_data,
            key: user.gid,
            status: user.status || "pending", // Add a status property with "pending" as the default
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

  const toggleStatus = async record => {
    const updatedData = data.map(item =>
      item.key === record.key
        ? {
            ...item,
            status: item.status === "completed" ? "pending" : "completed",
          }
        : item
    );
    setData(updatedData);

    try {
      const response = await axios.put(
        `http://localhost:3002/update-status/${record.key}`,
        {
          status: record.status,
        }
      );
      console.log(record.status);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const downloadFile = (fileData, fileName) => {
    try {
      const combinedData = new Uint8Array(fileData.data);
      const blob = new Blob([combinedData], { type: fileData.type });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.setAttribute("data-file-size", blob.size);
      a.click();
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
      dataIndex: "fileNames",
      key: "fileNames",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => downloadFile(record.fileData, record.fileNames[0])}>
            Download
          </Button>
          <Button type="default" onClick={() => toggleStatus(record)}>
            {record.status === "completed" ? (
              <CheckCircleOutlined />
            ) : (
              <CloseCircleOutlined />
            )}
          </Button>
        </>
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
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: text => (
        <span>
          {text === "completed" ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
          {text}
        </span>
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

export default OthersA;
