import React from "react";
import "./App.css";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import LogingIn from "./Pages/LogingIn.js";
import Bookeeping from "./Pages/Bookeeping";
import Income from "./Pages/Income";
import About from "./Pages/About";
import Blog from "./Pages/Blog";
import Pricing from "./Pages/Pricing";
import Contact from "./Pages/Contact";
import KnowledgeConfer from "./Pages/KnowledgeConfer";
import User from "./Users/User";
import Admin from "./Admin/Admin";
import FormData from "./Componenets/FormData";
import Gst from "./Services/Gst";
import Forgotpassword from "./Pages/Forgotpassword";
function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Routes>
        <Route
          path="/"
          element={
            <Wrap>
              <Home />
            </Wrap>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LogingIn />} />
        <Route path="/bookkeeping" element={<Bookeeping />} />
        <Route path="/income" element={<Income />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/knowledge" element={<KnowledgeConfer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />{" "}
        <Route path="/modal" element={<FormData />} />
        <Route path="/forgot" element={<Forgotpassword />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/gst" element={<Gst />} />
        <Route path="/admin/:id" element={<Admin />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export function Wrap({ child }) {
  const data = localStorage.getItem("user");
  const a = JSON.parse(data);
  if (data) {
    if (a.type === "admin") {
      return <Navigate to={`/admin/${a.id}`} />;
    } else {
      return <Navigate to={`/user/${a.id}`} />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
}
export default App;
