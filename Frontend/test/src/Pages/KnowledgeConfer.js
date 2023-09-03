import React from "react";
import FaqAccordion from "./FaqAccordion";
import Layout from "../Componenets/Layout";

const KnowledgeConfer = () => {
  return (
    <Layout>
      <div style={{ width: "100vw",height:"100vh", marginLeft: "25%", marginTop: "5%" }}>
        <div className="Faq">
          <FaqAccordion />
        </div>
      </div>
    </Layout>
  );
};

export default KnowledgeConfer;
