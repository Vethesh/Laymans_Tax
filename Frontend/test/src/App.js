import React from "react";
import "./App.css";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";

import PageNotFound from "./Pages/PageNotFound";
import LogingIn from "./Pages/LogingIn.js";
import Bookeeping from "./Pages/Bookeeping";
import Income from "./Pages/Income";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LogingIn />} />
        <Route path="/bookkeeping" element={<Bookeeping/>}/>
        <Route path="/income" element={<Income/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
