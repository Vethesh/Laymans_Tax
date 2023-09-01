import React from "react";
import image from "../Images/404image.jpg"
const PageNotFound = () => {
  return (
    <div style={{width:"100vw",height:"100vh"}}>
      <img
        src={image}
        alt="not-found"
        style={{ height:"50%",width:"50%",marginLeft:"20%",marginTop:"10%"}}
      />
    </div>
  );
};

export default PageNotFound;
