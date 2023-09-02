import React from "react";
import FaqAccordion from "./FaqAccordion";

const KnowledgeConfer = () => {
  return (
    <div style={{ width: "100vw",marginLeft:"25%",marginTop:"5%"}}>
      <div className="Faq">
        <FaqAccordion />
      </div>
      <div className="blog">blog part</div>
    </div>
  );
};

export default KnowledgeConfer;
