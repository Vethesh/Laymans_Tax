import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const IncomeA = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`http://localhost:3002/getgst`);
        console.log(response.data);
        const userData = response.data.data;

        if (userData.length > 0) {
          const filteredData = response.data.data.map(user => ({
            name: user.name,
            email: user.email,
            phone: user.phone,
            date: user.date.slice(0, 10),
            service: user.service,
            fileName: user.filename,
            fileData: user.filedata,
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

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Service", dataIndex: "service", key: "service" },
    { title: "File Name", dataIndex: "fileName", key: "fileName" }, // Add this column
    {
      title: "File Data",
      key: "fileData",
      render: (text, record) => (
        <a
          href={`data:${record.fileType};base64,${record.fileData}`}
          download={record.fileName}>
          Download
        </a>
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
