import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, showHeaderAndFooter = true }) => {
  return (
    <div>
      {showHeaderAndFooter && <Header />}
      {children}
      {showHeaderAndFooter && <Footer />}
    </div>
  );
};

export default Layout;