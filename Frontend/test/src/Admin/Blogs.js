import React from "react";
import Blog from "../Pages/Blog";
import Blogwrite from "./Blogwrite";
import "./style.css";

function Blogs() {
  const d = new Date();
  console.log(d.toLocaleDateString("pt-PT"));
  return (
    <div className="blogs">
      <div className="render-user-blog">
        <Blog showHeaderAndFooter={false} />
      </div>
      <div className="render-admin-blog">
        <Blogwrite />
      </div>
    </div>
  );
}

export default Blogs;
