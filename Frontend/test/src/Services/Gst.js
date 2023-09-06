import React from "react";
import Cards from "../Componenets/Cards";

const Gst = () => {
  const data = [
    {
      id: 1,
      title: "GSTR-1",
      description:
        "GSTR-1 is a monthly or quarterly return that needs to be filed by registered taxpayers to provide details of outward supplies (sales) of goods and services.",
    },
    {
      id: 2,
      title: "GSTR-3B",
      description:
        "GSTR-3B is a monthly return filed by registered taxpayers to declare summary details of their inward and outward supplies, as well as tax liability and tax paid.",
    },
    {
      id: 3,
      title: "GSTR-4",
      description:
        "GSTR-4 is a quarterly return designed for composition scheme taxpayers to report their tax liabilities and pay taxes at a fixed rate on their turnover.",
    },
    {
      id: 4,
      title: "GSTR-9",
      description:
        "GSTR-9 is an annual return filed by regular taxpayers to reconcile the data provided in their monthly/quarterly returns with their audited financial statements.",
    },
   
   
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gridGap: "5rem",
        marginLeft: "3%",
        marginTop: "5%",
      
      }}>
      {data.map(ele => {
        return <Cards key={ele.id} cardDetail={ele} />;
      })}
    </div>
  );
};

export default Gst;
