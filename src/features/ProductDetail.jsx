import { useState, useEffect } from "react";

import { FaWhatsapp, FaRegAddressCard } from "react-icons/fa";
import { AiOutlineMail, AiOutlineMobile } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Component/Loader";
import axios from "axios";

export default function ProductDetail() {
  const [item, setitem] = useState();
  const [loading, setloading] = useState(false);
  const productid = useParams().productid;
  useEffect(() => {
    (async () => {
      try {
        setloading(true);
        const res = await axios.get(`public/approved/single`, {
          params: { id: productid },
        });
        const data = await res.data;
        setitem(data);
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-white  ">
      <div className="pt-6 ">
        <div className="mx-auto mt-6 max-w-2xl gap-y-2 sm:px-6 grid md:max-w-7xl md:grid-cols-3 md:gap-x-8 md:px-8">
          <div className="aspect-w-3 aspect-h-4  overflow-hidden rounded-lg md:block">
            <img
              src={item?.images[0]}
              alt="not found"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className=" grid gap-y-2 md:grid-cols-1 md:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={item?.images[1]}
                alt="not found"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={item?.images[2]}
                alt="not found"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg md:aspect-w-3 md:aspect-h-4">
            <img
              src={item?.images[3]}
              alt="not found"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 md:grid md:max-w-7xl md:grid-cols-3 md:grid-rows-[auto,auto,1fr] md:gap-x-8 md:px-8 md:pt-16 md:pb-24">
          <div className="md:col-span-2 md:border-r md:border-gray-200 md:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {item?.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 md:row-span-3 md:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {item?.price}
            </p>

            {/* Contact detail */}
            <div className="mt-6">
              <h3 className="text-indigo-500 flex items-center ">
                <FaWhatsapp className="mr-2" />
                Whatsapp
              </h3>
              <p className="mt-1 text-sm text-gray-500">{item?.whatsapp}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-indigo-500 flex items-center ">
                {" "}
                <AiOutlineMobile className="mr-2" /> Mobile Number
              </h3>
              <p className="mt-1 text-sm text-gray-500">{item?.phone}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-indigo-500 flex items-center ">
                {" "}
                <AiOutlineMail className="mr-2" /> Email
              </h3>
              <p className="mt-1 text-sm text-gray-500">{item?.email}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-indigo-500 flex items-center ">
                <FaRegAddressCard className="mr-2" />
                Address
              </h3>
              <p className="mt-1 text-sm text-gray-500">{item?.address}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-indigo-500 flex items-center ">
                <FaRegAddressCard className="mr-2" />
                Website
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                <a
                  href={
                    item?.website.match("http")
                      ? item?.website
                      : `http://${item?.website}`
                  }
                  target={"_blank"}
                >
                  {item?.website}
                </a>
              </p>
            </div>
          </div>

          <div className="py-10 md:col-span-2 md:col-start-1 md:border-r md:border-gray-200 md:pt-6 md:pb-16 md:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{item?.description}</p>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{item?.detail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
