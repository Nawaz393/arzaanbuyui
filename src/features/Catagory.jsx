import React, { useState, useEffect } from "react";
import Loader from "../Component/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCatagory } from "./CatagoryProducts";
import Item from "../Component/Item";

const Catagory = () => {
  const catagory = useParams().catagory;

  const products = useSelector((state) => state.catagory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCatagory(catagory));
  }, [catagory]);

  //   if (loading) {
  //     return <Loader />;
  //   }

  return (
    <div className="min-h-screen ">
      <h1 className="text-2xl font-bold text-center mt-5">{catagory} items</h1>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-3 md:px-10">
        {products?.value?.map((item, index) => {
          return (
            <Item
              key={index}
              link={item.images[0]}
              title={item.name}
              id={item._id}
              price={item.price}
              tagline={item.tagline || "this is tagline by the author"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Catagory;
