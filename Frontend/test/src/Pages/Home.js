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
                textAlign: "center",
                justifyContent: "center",
                width: "300px",
                height: "auto",
                borderRadius: "10px",
                filter:"drop-shadow(5px 5px 10px #555)"
                // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              }}
            />
          </div>

          {/* <Cards/> */}
        </div>
    </Layout>
  );
};

export default Home;
