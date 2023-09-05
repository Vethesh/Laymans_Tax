import React from "react";
import Layout from "../Componenets/Layout";
import Img from "../Images/front.png";
import Youtubecard from "../Componenets/Youtubecard";

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
            //   display: "flex",
            //   justifyContent: "center",
            // margin: "5% 10%",
            //    width: "300px",
          
            }}
          />

          <div className="youtube">
            <Youtubecard/>
          </div>
        </div>

        {/* <Cards/> */}
      </div>
    </Layout>
  );
};

export default Home;
