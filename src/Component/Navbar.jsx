import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./Anime";
import logo from "../assets/img/ar.png";
import { Link, useNavigate } from "react-router-dom";
import { deleteToken } from "../features/useSlice";
import { useSelector, useDispatch } from "react-redux";
const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  return (
    <nav className=" flex h-14 bg-zinc-800 items-center px-4  ">
      <div>
        <Link to="/">
          {/* <span className='text-white  font-nunito text-2xl tracking-wide' >Arzan</span>
                    <span className='text-yellow-500  text-2xl font-light tracking-normal '>Buy</span> */}

          <img src={logo} className="h-40 w-35" />
        </Link>
      </div>
      <div className="ml-auto">
        {user?.token && (
          <motion.button
            variants={Button}
            whileHover="animate"
            className="text-white font-quick  mr-2 lg:mr-5"
            onClick={() => {
              localStorage.clear();
              dispatch(deleteToken());
              navigate("/");
            }}
          >
            Logout
          </motion.button>
        )}
        {!user?.token ? (
          <motion.button
            variants={Button}
            whileHover="animate"
            className="bg-yellow-500  text-white font-quick px-5 py-1 rounded-md hover:bg-yellow-600 tracking-tight"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </motion.button>
        ) : (
          <motion.button
            variants={Button}
            whileHover="animate"
            className="bg-green-500  text-white font-quick px-5 py-1 rounded-md hover:bg-green-600 tracking-tight"
            onClick={() => {
              if (user?.role === 1200) {
                navigate("/Admindashboard");
              } else {
                navigate("/Userdashboard");
              }
            }}
          >
            Dashboard
          </motion.button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
{
}
