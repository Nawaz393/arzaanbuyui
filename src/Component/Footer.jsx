import React from "react";
import { motion } from "framer-motion";
import { Button } from "./Anime";
export const Footer = () => {
  return (
    <section className="mt-4 mb-0 h-[70vh]   w-full   bg-pink-600  ">
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
        >
          Post Now
        </motion.button>
        <div className="flex flex-col  justify-between  sm:w-40  sm:flex-row text-white font-quick font-bold">
          <a href="mailto:mohnawaz6393@gmail.com">support</a>
          <a href="#">about us </a>
        </div>
      </div>
    </section>
  );
};
