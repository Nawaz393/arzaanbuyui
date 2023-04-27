import React, { useState, useEffect } from "react";
import Grids from "../Component/Grids";
import Navbar from "../Component/Navbar";
import Slide from "../Component/Slide";
import Item from "../Component/Item";
import { toast } from "react-toastify";
import { BiSearch } from "react-icons/bi";
import { Footer } from "../Component/Footer";
import { getrecentProducts } from "./RecentProductSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Component/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const recentProducts = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [data, setdata] = useState([]);
  const [show, setshow] = useState(4);
  const [show1, setshow1] = useState([]);
  const [sponseredads, setSponseredads] = useState([{}]);
  const [search, setsearch] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getrecentProducts());
    setdata(recentProducts?.value);

    if (recentProducts?.value?.length === 0) {
      setMessage("No Products Found");
    } else {
      setMessage("");
    }

    if (!recentProducts?.value) {
      setMessage("No Products Found");
    }
    setshow1(data?.slice(0, show));
    (async () => {
      try {
        const res = await axios.get("sponserad/all");

        const data = await res.data;
        setSponseredads(data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data);
        } else if (error.code === "ERR_NETWORK") {
          toast.error("Network Error");
        } else {
          toast.error("Something went wrong");
        }
      }
    })();
  }, [dispatch, recentProducts?.value, show, data]);

  return (
    <div className="flex">
      <div className=" w-full fixed">
        <Navbar />
        <Slide />
      </div>
      <main className="flex flex-col my-32  absolute -z-10">
        <div className="w-full   my-6 flex justify-center">
          <div className="relative w-5/6 sm:w-1/3">
            <input
              type={"text"}
              placeholder={"search"}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
              className="  h-12 w-full border-2    border-gray-300 rounded-md px-2  focus:outline-none focus:border-gray-500"
            />

            <BiSearch
              role={"button"}
              className=" h-10 w-8 absolute right-4 top-2    text-gray-500 cursor-pointer"
              onClick={() => {
                if (search === "") {
                  alert("please enter something to search");
                  return;
                }
                navigate(`/search/${search}`);
                console.log(search);
              }}
            />
          </div>
        </div>

        <section className="my-4">
          <h3 className="text-center text-xl font-bold font-quick ">
            Find deals on anythings
          </h3>
          <p className="text-center text-lg text-gray-500">
            {" "}
            Discover unbeatable bargains on a vast range of products and
            services with our comprehensive platform for finding deals on
            anything you need.
          </p>
        </section>

        <section className="my-4 w-full">
          <div className="  grid lg:grid-cols-15 md:grid-cols-10 sm:grid-cols-8  grid-cols-5  px-8 gap-x-8">
            {sponseredads?.map((item) => {
              if (item.location === 1) {
                return (
                  <img
                    src={item.image}
                    key={item._id}
                    onClick={() => {
                      window.open(
                        item.link.match("http")
                          ? item.link
                          : `https://${item.link}`,
                        "_blank"
                      );
                    }}
                    className="cursor-pointer"
                  />
                );
              }
            })}
          </div>
        </section>

        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Recent listings
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {show1?.map((item, index) => {
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


              <div className="h-full  w-full flex justify-center items-center">
                {" "}
                <h1 className="text-2xl font-bold text-center tracking-tight text-gray-900">
                  {message}
                </h1>
              </div>

              {/* More products... */}
            </div>
          </div>
        </div>

        {data?.length > show1?.length && (
          <button
            className="h-10"
            onClick={() => {
              setshow((prev) => prev + 8);

              setshow1(data?.slice(0, show));
            }}
          >
            show more
          </button>
        )}

        <section className="my-4 px-2 -z-10  bg-blue-700">
          <h1 className="text-white font-Dance text-4xl  lg:text-6xl font-light px-20 py-10">
            Looking to expand your business and reach a wider audience
          </h1>
          <div className="flex flex-col md:flex-row">
            <div>
              <h1 className="text-orange-400 font-bold text-3xl pl-11 py-4">
                Boost Your Business
              </h1>
              <p className="text-white lg:w-1/2  pl-11 font-quick">
                {" "}
                Post Your Ads on Our Website and Expand Your Reach Today!
              </p>
              <p className="text-white lg:w-1/2  pl-11 font-quick">
                Maximize your exposure and attract more customers by posting
                your ads on our website, offering a wide range of products and
                services. With our user-friendly platform, it's easy to create
                and manage your ad campaigns to drive your business growth.
              </p>
            </div>
            <div>
              <h1 className="text-orange-400 font-bold text-3xl pl-11 py-4">
                Promote Your Business
              </h1>
              <p className="text-white lg:w-1/2  pl-11 font-quick">
                {" "}
                Post Your Offers on Our Website and Increase Your Sales Today!
              </p>
              <p className="text-white  lg:w-1/2 pl-11 font-quick pb-10">
                Attract more customers and grow your business by posting your
                ads on our website today. Our user-friendly platform makes it
                easy to create and manage ad campaigns to help you reach a wider
                audience.
              </p>
            </div>
          </div>
        </section>

        <section>
          <Grids />
        </section>

        <section className="my-4 w-full">
          <div className="  grid lg:grid-cols-15 md:grid-cols-10 sm:grid-cols-8  grid-cols-5  px-8 gap-x-8">
            {sponseredads?.map((item) => {
              if (item.location === 0) {
                return (
                  <img
                    key={item._id}
                    src={item.image}
                    onClick={() => {
                      window.open(
                        item.link.match("http")
                          ? item.link
                          : `https://${item.link}`,
                        "_blank"
                      );
                    }}
                    className="cursor-pointer"
                  />
                );
              }
            })}
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Landing;
