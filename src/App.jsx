import React from "react";
import Landing from "./features/Landing";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./features/ProductDetail";
import axios from "axios";
import Oulit from "./Component/Oulit";
import UserDashboard from "./features/UserDashboard";
import Register from "./features/Register";
import Forgot from "./features/Forgot";
import Login from "./features/Login";
import Catagory from "./features/Catagory";
import Search from "./features/Search";
import Success from "./features/payment/Success";
import SponserSuccess from "./features/payment/SponserSuccess";
import { useSelector } from "react-redux";
import SecureRoute from "./features/SecureRoute";
import AboutUs from "./features/AboutUs";
import TermsAndConditions from "./features/TermsAndConditions";
const App = () => {
  const user = useSelector((state) => state.user.value);
  // base url for api
  axios.defaults.baseURL = "https://demo-s4hp.onrender.com";
  // axios.defaults.baseURL = "http://localhost:3000";

  const token = localStorage.getItem("token")?.token ?? "";
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user?.token || token}`;
   
    return config;
  });
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Oulit />}>
        <Route path="/product/:productid" element={<ProductDetail />} />
        <Route path="/catagory/:catagory" element={<Catagory />} />
        <Route path="/search/:search" element={<Search />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route element={<SecureRoute />}>
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/success" element={<Success />} />
          <Route path="/sponserSuccess" element={<SponserSuccess />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
