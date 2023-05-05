import React from "react";
import { motion } from "framer-motion";
import { Button } from "./Anime";
import { Link,useNavigate } from "react-router-dom";
export const Footer = () => {

  const navigate=useNavigate();
  
  return (
    <section className="mt-4 mb-0 h-[50vh]   w-full   bg-zinc-800  ">
      <div className="flex flex-col justify-center px-10 h-full items-center ">
        <h1 className="text-white text-4xl font-quick font-bold py-4 ">
          Feeling in love?<span className="italic">Post Ads !</span>{" "}
        </h1>
        <p className="text-white text-bold py-3 ">
          easy posting, powerful boosting, and easy customization
        </p>

        <motion.button
          variants={Button}
          whileHover="animate"
          className="bg-white py-4 px-6 rounded-md font-semibold  my-4  hover:bg-slate-200"

          onClick={()=>{

            navigate("/userDashboard")
          }}
        >
          Post Now
        </motion.button>
        <div className="flex flex-col text-center  justify-between  sm:w-80  sm:flex-row text-white font-quick font-bold">
          <a href="mailto:mohnawaz6393@gmail.com">support</a>
          <Link to="/about">about us </Link>
          <Link  to="/terms">
          terms and conditions
        </Link>
        </div>
      
      
      </div>
    </section>
  );
};
