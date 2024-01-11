import React from "react";
import Cards from "../Componenets/Cards";
const data = [
  {
    id: "ITR-001",
    title: "ITR-1 (Sahaj)",
    description:
      "ITR-1 is a simplified return form for individuals with income from salary, one house property, other sources (interest, etc.), and total income up to Rs. 50 lakh. It is known as the 'Sahaj' form.",
    amount: 100, // You can replace 100 with your desired value.
  },
  {
    id: "ITR-002",
    title: "ITR-2",
    description:
      "ITR-2 is for individuals and Hindu Undivided Families (HUFs) with income from salary, house property, capital gains, and more. It is applicable to individuals with total income exceeding Rs. 50 lakh.",
    amount: 100, // You can replace 100 with your desired value.
  },
  {
    id: "ITR-003",
    title: "ITR-3",
    description:
      "ITR-3 is for individuals and HUFs having income from business or profession. It is suitable for individuals with income exceeding Rs. 50 lakh and having business income.",
    amount: 100, // You can replace 100 with your desired value.
  },
  {
    id: "ITR-004",
    title: "ITR-4 (Sugam)",
    description:
      "ITR-4, also known as 'Sugam,' is for individuals, HUFs, and firms (other than LLPs) having income from business or profession computed under the presumptive taxation scheme.",
    amount: 100, // You can replace 100 with your desired value.
  },
  {
    id: "ITR-005",
    title: "ITR-5",
    description:
      "ITR-5 is for entities other than individuals, HUFs, companies, and those filing ITR-7. It is used by partnerships, LLPs, and other associations.",
    amount: 100, // You can replace 100 with your desired value.
  },
];

const Income = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gridGap: "5rem",
        marginLeft: "1.5%",
        marginTop: "5%",
        justifyContent: "space-around",
      }}>
      {data.map(ele => {
        return <Cards key={ele.id} cardDetail={ele} />;
      })}
    </div>
  );
};

export default Income;
