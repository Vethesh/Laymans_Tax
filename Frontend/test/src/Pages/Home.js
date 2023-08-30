import React from "react";
import Layout from "../Componenets/Layout";
import Img from "../Images/bgg.jpg";
const Home = () => {
  return (
    <div className="home">
      <Layout>
        <div className="main">
          <div className="text">
            <p>Welcome to Tax Consultant</p>
          </div>
          <div className="bg">
            <img src={Img} alt="bg" />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
