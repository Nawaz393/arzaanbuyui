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
const App = () => {
  // base url for api
  axios.defaults.baseURL = "http://134.209.253.235:3000";
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Oulit />}>
        <Route path="/product/:productid" element={<ProductDetail />} />
        <Route path="/catagory/:catagory" element={<Catagory />} />
        <Route path="/search/:search" element={<Search />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/sponserSuccess" element={<SponserSuccess />} />
      </Route>
    </Routes>
  );
};

export default App;
