import React from "react";
import Layout from "../Componenets/Layout";
<<<<<<< HEAD
import Img from "../Images/bgg.jpg";
import Cards from "../Componenets/Cards";

=======
import Img from "../Images/bgg1.jpg"; 
import './style.css';
>>>>>>> 0458653e87eb0cd50530ae84e9bd1501d544338f
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
