import React, { useEffect, useState } from "react";
import { Table, Spin, Button } from "antd";
import axios from "axios";

const UserQueries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user queries from the API endpoint
    axios.get("http://localhost:3002/getuser-queries").then(response => {
        console.log(response.data)
      const userData = response.data.data;

      if (userData.length > 0) {
        const filteredData = userData.map(user => ({
          name: user.name,
          email: user.email,
          phone: user.phone,
          date: user.date.slice(0, 10),
          query:user.query,
          key: user.id,
        }));
        setData(filteredData);
      }
      setLoading(false);
    });
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Query", dataIndex: "query", key: "query" },
    {
      title: "Contact", // Contact column
      key: "contact",
      render: (text, record) => (
        <Button type="primary">
          <a href={`mailto:${record.email}`}>Contact</a>
        </Button>
      ),
    },
  ];

  return (
    <div>
      {loading ? <Spin /> : <Table dataSource={data} columns={columns} />}
    </div>
  );
};

export default UserQueries;
