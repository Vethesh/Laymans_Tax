import React from "react";
import Layout from "../Componenets/Layout";
import Img from "../Images/bgg.jpg";
import Cards from "../Componenets/Cards";

const Home = () => {
  return (
    
      <Layout>
        <div className="main">
          {/* <div className="text">
            <p>Welcome to Tax Consultant</p>
          </div> */}
          <div className="bg">
            <img src={Img} alt="bg" />
          </div>
          {/* <Cards/> */}
        </div>
      </Layout>
   
  );
};

export default Home;
