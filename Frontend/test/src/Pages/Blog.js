import React from "react";
import Layout from "../Componenets/Layout";

const Blog = ({ showHeaderAndFooter = true }) => {
  return (
    <div>
      <Layout showHeaderAndFooter={showHeaderAndFooter}>
        there is no blogs yet.....
      </Layout>
    </div>
  );
};

export default Blog;
