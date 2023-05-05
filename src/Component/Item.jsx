import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { image } from "./Anime";
import { useLocation, useNavigate } from "react-router-dom";
const Item = ({ link, title, tagline, id, price }) => {
  const navigate = useNavigate();
  return (
    <div //
      className="group relative"
      onClick={(e) => {
        e.preventDefault();

        navigate(`/product/${id}`, { state: null });
    
      }}
    >
      <div className="min-h-80 aspect-w-1 aspect-h-1  w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <img
          src={link}
          alt="Front of men&#039;s Basic Tee in black."
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{tagline}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{price}</p>
      </div>
    </div>
  );
};

export default Item;
