import React from "react";
import { Outlet } from "react-router-dom";
import Slide from "./Slide";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
// import Header from "./Header";
const Oulit = () => {
  return (
    <div>
      <div className=" sticky  top-0 left-0 right-0  z-50">
        <Navbar />
        <Slide />
      </div>
      <Outlet />

      <Footer />
    </div>
  );
};

export default Oulit;
