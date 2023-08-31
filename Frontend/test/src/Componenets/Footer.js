import React from "react";
import "./footer.css";
import Img from "../Images/logo.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faenvelop } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
  return (
    <footer className="main">
      <div className="row">
        <div className="col">
          <img src={Img} alt="bg" className="logo" />
          <p>
            A tax consultant is a professional who provides specialized guidance
            and advice on matters related to taxation. Their expertise lies in
            understanding the intricate landscape of tax laws, regulations, and
            financial implications. Tax consultants work closely with
            individuals, businesses, and organizations to ensure compliance with
            tax regulations while optimizing tax strategies to minimize
            liabilities.
          </p>
        </div>

        <div className="col">
          <h3>office <div className="underline"><span></span></div></h3> 
          <p>ITPL Road</p>
          <p>Whitefield, Bangalore</p>
          <p>Karnataka, PIN 560066,India</p>
          <p className="email-id">laymanstax@gmail.com</p>
          <h4>+91 - 9876543945</h4>
        </div>

        <div className="col">
          <h3>Links <div className="underline"><span></span></div></h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Contacts</a></li>
          </ul>
        </div>


        <div className="col">
          <h3>Newsletter <div className="underline"><span></span></div></h3>
          <form>
            {/* <FontAwesomeIcon icon={fa-envelop} /> */}
             <i class="fa-regular fa-envelope"></i> 
            {/* font awsome icons */}
            <input type="email" placeholder="Enter your email" required></input>
            <button type="submit">fontawesome right arrow</button>
          </form>

          <div className="social-icons">
            <i class="fab fa-facebook"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-whatsapp"></i>
            <i class="fab fa-youtube"></i>
          </div>
        </div>
      </div>
      <hr></hr>
      <p className="copyright">Easy tutorials @ 2021 - All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
