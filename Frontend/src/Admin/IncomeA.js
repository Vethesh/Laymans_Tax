import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";

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
          const filteredData = userData.map(user => ({
            name: user.name,
            email: user.email,
            phone: user.phone,
            date: user.date.slice(0, 10),
            service: user.service,
            fileNames: [user.file_name],
            fileData: user.file_data,
            key: user.iid,
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

  const downloadFile = (fileData, fileName, record) => {
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
      // updateProgress(record.key);
    } catch (error) {
      console.error("Error while downloading file:", error);
    }
  };

  const updateProgress = id => {
    // Make an API call to update the progress based on the status "completed"
    console.log(id)
    axios
      .put(`http://localhost:3002/update-status/i/${id}`, {
        status: "completed",
      })
      .then(response => {
        // Handle success
        console.log(response.data.message);
        // You can also update the data source in state to reflect the new status if needed
      })
      .catch(error => {
        // Handle error
        console.error("Error updating status:", error);
      });
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <a href={`mailto:${record.email}`}>{record.email}</a>
      ),
    },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Service", dataIndex: "service", key: "service" },
    {
      title: "Download",
      dataIndex: "fileData.type",
      key: "fileData.type",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => {
            downloadFile(record.fileData, record.fileNames[0]);
            updateProgress(record.key);
          }}>
          <DownloadOutlined />
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={{
        pageSize: 4,
        showSizeChanger: false,
      }}
    />
  );
};

export default IncomeA;
