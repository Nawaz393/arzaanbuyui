import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Item from "../Component/Item";
import Loader from "../Component/Loader";

const Search = () => {
 

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("search page")
  const {search} = useParams();
  console.log(useParams())

  useEffect(() => {
   
  
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`public/approved/search`, {
          params: {
            name: search,
          },
        });

        const data = await res.data;
        setProducts(data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.code === "ERR_NETWORK") {
          console.log("Network Error");
        } else {
          console.log("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen ">
      <h1 className="text-2xl font-bold text-center mt-5">{search} items</h1>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-3 md:px-10">
        {products?.map((item, index) => {
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

export default Search;
