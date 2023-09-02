import React from "react";
import Layout from "../Componenets/Layout";
import Img from "../Images/front.png";
// import Cards from "../Componenets/Cards";

const Home = () => {
  return (
    <Layout>
      <div className="main">
        {/* <div className="text">
            <p>Welcome to Tax Consultant</p>
          </div> */}
        <div className="bg">
          <img
            src={Img}
            alt="bg"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "5% 10%",
              width: "300px",
              height: "auto",
              filter: "drop-shadow(5px 5px 10px #555)",
            }}
          />
        </div>

        {/* <Cards/> */}
      </div>
    </Layout>
  );
};

export default Home;
