import React from "react";
import "./App.css";
import Layout from "./Componenets/Layout";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login.Js";
import PageNotFound from "./Pages/PageNotFound";
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={Layout(<Home />)} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
