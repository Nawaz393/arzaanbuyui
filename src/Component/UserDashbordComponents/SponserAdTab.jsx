import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Popup } from "reactjs-popup";
import Loader from "../Loader";
const SponserAdTab = ({ id }) => {
  const [image, setImages] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const packages = [
    {
      name: "Starter",
      description: "Show your logo at the top of page",
      price: "9.99",
      features: [
        "your logo will be shown at the top of the page",
        "your logo will be at key top position ",
      ],
      location: "top",
    },

    {
      name: "Pro",
      description: "Boost your ad htmlFor 2 weeks",
      price: "19.99",
      features: [
        "your logo will be shown at the bottom of the page",
        "your logo will be at key bottom position ",
      ],
      location: "bottom",
    },
  ];
  const handleImage = (e) => {
    const files = e.target.files;
    // convert to base64
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImages(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleSubmit = async (data) => {
    console.log(image, link);
    setLoading(true);

    var load = toast.loading("Sponsering your Ad");
    try {
      const res = await axios.post("/sponserad/user", {
        logodata: {
          image,
          link,
          location: data.location === "top" ? 1 : 0,
          days: 0.00338889,
          userid: id,
        },

        paymentdata: {
          name: data.name,
          price: data.price,
          currency: "USD",
          description: data.description,
          quantity: 1,
          sku: "sponsering logo",
        },
      });

      if (res.status === 200) {
        console.log(res);
        window.location.assign(res.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      toast.dismiss(load);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-md md:max-w-2xl">
      <ToastContainer />
      <div className="bg-white shadow-inner shadow-gray-300 rounded-lg px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-quick font-semibold text-center py-3">
          {" "}
          Sponser your Ad
        </h3>
        <div className="col-span-6 sm:col-span-6 ">
          <label
            htmlFor="link"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Link to your website
          </label>
          <input
            type="text"
            name="link"
            id="link"
            onChange={(e) => {
              setLink(e.target.value);
            }}
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2 flex col-span-6 sm:col-span-6 justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className=" cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Your Logo/image</span>
                <input
                  id="file-upload"
                  name="image"
                  type="file"
                  required
                  accept="image/*"
                  onChange={handleImage}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop an Image </p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG </p>
          </div>
        </div>
        <Popup
          closeOnEscape={true}
          contentStyle={{
            borderRadius: "10px",
            width: "90%",
            height: "70%",
            overflowY: "scroll",
          }}
          trigger={
            <button className="bg-blue-500 my-3 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Sponser
            </button>
          }
          modal
        >
          <div className="">
            <div className="flex flex-col md:flex-row justify-center space-x-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="w-4/5 bg-white shadow-lg rounded-lg overflow-hidden mx-4 my-8"
                >
                  <div className="py-4 px-6">
                    <h2 className="text-lg font-bold text-gray-800">
                      {pkg.name}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                      {pkg.description}
                    </p>
                    <p className="mt-2 text-xl font-bold text-gray-800">
                      ${pkg.price}
                    </p>
                    <ul className="mt-4">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center text-gray-600 mb-2"
                        >
                          <svg
                            className="h-4 w-4 fill-current text-green-500 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M18.21 5.05c-.39-.36-.98-.38-1.4-.04L7.25 13.44l-3.47-3.7a1 1 0 1 0-1.45 1.38l4.17 4.44a1 1 0 0 0 1.45 0l11.16-11.9a1 1 0 0 0 .04-1.4l-.02-.02z" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                      onClick={() => handleSubmit(pkg)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default SponserAdTab;
