import React from "react";
import "./footer.css";
import Img from "../Images/logo.png";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faenvelop } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
  return (
    <footer className="main-f">
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
          <h3>
            Office{" "}
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <p>ITPL Road</p>
          <p>Whitefield, Bangalore</p>
          <p>Karnataka, PIN 560066,India</p>
          <p className="email-id">laymanstax@gmail.com</p>
          <h4>+91-8777838393</h4>
        </div>

        <div className="col">
          <h3>
            Links{" "}
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>

            <li>
              <Link to={"/about"}>About us</Link>
            </li>

            <li>
              <Link to={"/contact"}>Contacts</Link>
            </li>
          </ul>
        </div>

        <div className="col">
          <h3>
            Connect us at
            <div className="underline">
              <span></span>
            </div>
          </h3>

          <div className="social-icons">
            <i className="fab fa-facebook"> </i>
            <span>Facebook</span>
            <br />
            <i class="fab fa-twitter"></i>
            <span>Twitter</span>
            <br />
            <i class="fab fa-whatsapp"></i>
            <span>whatsapp</span>
            <br />
            <i class="fab fa-youtube"></i>
            <Link to="https://www.youtube.com/channel/UC5h5sy092BUxtZZExww6jMQ">
              <span>Youtube</span>
            </Link>

            <br />
          </div>
        </div>
      </div>
      <hr></hr>
      <p className="copyright">Laymans Tax@ 2023 - All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
