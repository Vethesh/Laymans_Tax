import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";

const Alluser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get("http://localhost:3002/getallusers");
        console.log(response.data);

        const filteredData = response.data.data.map(user => ({
          name: user.name,
          email: user.email,
          phone: user.phone,
          key: user.id,
        }));

        setData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sendEmail = email => {
    window.location.href = `mailto:${email}`;
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
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

export default Alluser;
