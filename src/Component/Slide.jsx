import React from "react";
import { motion } from "framer-motion";
import { Button } from "./Anime";
import { options } from "./options";
import { Link, useNavigate } from "react-router-dom";
const Slide = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center  justify-between mb-10  px-12 h-20 bg-gray-100  opacity-80 ">
      <Link
        to="/"
        className=" text-xl sm:text-4xl font-bold font-sans tracking-wide "
      >
        Discover.
      </Link>
      <ul className="lg:flex  w-1/4 justify-evenly  pr-4 sm:pr-0">
        <li className=" sm:text-lg font-open tracking-tighter font-semibold ">
          <select
            className=" bg-gray-100 focus:outline-none  focus:border-transparent"
            onChange={(e) => {
              if (e.target.value === "") return;
              navigate(`/catagory/${e.target.value}`);
            }}
          >
            <option value={""}>Catagory</option>
            {options.map((item) => {
              return (
                <option value={item.value} key={item.label}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </li>
      </ul>
      <motion.button
        variants={Button}
        whileHover="animate"
        onClick={() => {
          navigate("/userDashboard");
        }}
        className="text-sm font-quick font-semibold bg-white py-4 px-8 rounded-md hidden lg:block"
      >
        Sponser Ads
      </motion.button>
    </div>
  );
};

export default Slide;
