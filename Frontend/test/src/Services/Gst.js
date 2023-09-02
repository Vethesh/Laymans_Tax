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
    {
      id: 5,
      title: "GSTR-9C",
      description:
        "GSTR-9C is a reconciliation statement and certification to be filed along with GSTR-9 by taxpayers whose annual turnover exceeds a specified limit.",
    },
    {
      id: 6,
      title: "GSTR-2A",
      description:
        "GSTR-2A is an auto-generated return that provides details of inward supplies (purchases) as per the records of the suppliers, to help taxpayers reconcile their input tax credit.",
    },
    {
      id: 7,
      title: "GSTR-6",
      description:
        "GSTR-6 is a return filed by Input Service Distributors (ISD) to distribute the credit of GST paid on input services to their branches or units.",
    },

    {
      id: 8,
      title: "GSTR-5",
      description:
        "GSTR-5 is a return filed by non-resident foreign taxpayers to report their GST liability for the supplies made during their stay in India.",
    },
    {
      id: 9,
      title: "GSTR-8",
      description:
        "GSTR-8 is a return filed by e-commerce operators to provide details of the supplies made through their platform and the tax collected at source (TCS).",
    },
    {
      id: 10,
      title: "GSTR-10",
      description:
        "GSTR-10, also known as the Final Return, is filed by taxpayers who have opted for voluntary or mandatory GST registration cancellation.",
    },
    {
      id: 11,
      title: "GSTR-11",
      description:
        "GSTR-11 is a return filed by persons having a Unique Identity Number (UIN) to claim a refund of the GST paid on purchases made by them.",
    },
    {
      id: 12,
      title: "GSTR-11A",
      description:
        "GSTR-11A is a return filed by online information database access and retrieval service providers to declare details of the supplies made to non-taxable recipients.",
    },
    {
      id: 13,
      title: "GSTR-7",
      description:
        "GSTR-7 is a return filed by Tax Deducted at Source (TDS) deductors to provide details of TDS deductions made under GST and remit the deducted amount to the government.",
    },
    {
      id: 14,
      title: "GSTR-10A",
      description:
        "GSTR-10A is a return filed by persons whose GST registration has been canceled by the tax authorities to provide details of their stock and liabilities.",
    },
  ];

  return (
    <div>
      {data.map(ele => {
        return <Cards key={ele.id} cardDetail={ele} />;
      })}
    </div>
  );
};

export default Gst;
