import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionCard from "./TransactionCard";
import TransactionICard from "./TransactionICard";
import TransactionO from "./TransactionO";

const Task = () => {
  const [gstData, setGstData] = useState([]);
  const [itrData, setItrData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("user");
    const userId = JSON.parse(data)?.id;

    if (userId) {
      axios
        .get(`http://localhost:3002/transaction/gst/${userId}`)
        .then(response => {
          console.log(response);
          setGstData(response.data.data);
        })
        .catch(error => {
          console.error(error);
        });

      axios
        .get(`http://localhost:3002/transaction/itr/${userId}`)
        .then(response => {
          console.log(response);
          setItrData(response.data.data);
        })
        .catch(error => {
          console.error(error);
        });

      axios
        .get(`http://localhost:3002/transaction/other/${userId}`)
        .then(response => {
          console.log(response);
          setOtherData(response.data.data);
        })
        .catch(error => {
          console.error(error);
        });

      setLoading(false);
    }
  }, []);

  console.log(gstData, itrData);

  return (
    <div>
      <div>
        <h4 style={{ color: "white", textAlign: "center" }}>GST</h4>
        {loading ? (
          <p>Loading...</p>
        ) : gstData.length === 0 ? (
          <p style={{ color: "white", textAlign: "center" }}>
            No GST transactions found.
          </p>
        ) : (
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3,2fr)" }}>
            {gstData.map((ele, index) => (
              <TransactionCard key={index} transactionGData={ele} />
            ))}
          </div>
        )}
      </div>
      <div>
        <h4 style={{ color: "white", textAlign: "center" }}>ITR</h4>
        {loading ? (
          <p>Loading...</p>
        ) : itrData.length === 0 ? (
          <p style={{ color: "white", textAlign: "center" }}>
            No ITR transactions found.
          </p>
        ) : (
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3,2fr)" }}>
            {itrData.map((ele, index) => (
              <TransactionICard key={index} transactionIData={ele} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h4 style={{ color: "white", textAlign: "center" }}>BOOK KEEPING</h4>
        {loading ? (
          <p>Loading...</p>
        ) : otherData.length === 0 ? (
          <p style={{ color: "white", textAlign: "center" }}>
            No Book keeping found.
          </p>
        ) : (
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3,2fr)" }}>
            {otherData.map((ele, index) => (
              <TransactionO key={index} transactionOData={ele} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
