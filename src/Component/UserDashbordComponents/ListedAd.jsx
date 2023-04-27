import React, { useState } from "react";
import { FaTrash, FaEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { Popup } from "reactjs-popup";
import Loader from "../Loader";

function ListedAd({ ad, setLoad }) {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const packages = [
    {
      name: "Starter",
      description: "Boost your ad for 1 week",
      price: "9.99",
      features: [
        "Display your ad at the top of search results",
        "Highlight your ad in search results",
      ],
    },
    {
      name: "Pro",
      description: "Boost your ad for 2 weeks",
      price: "19.99",
      features: [
        "Display your ad at the top of search results",
        "Highlight your ad in search results",
      ],
    },
  ];

  const [isEditable, setIsEditable] = useState(false);
  const [newad, setAd] = useState({
    tagline: ad.tagline,
    description: ad.description,
    phone: ad.phone,
    email: ad.email,
    website: ad.website,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAd({ ...newad, [name]: value });
  };

  const handleCancelClick = () => {
    setIsEditable(false);
    setAd({ tagline, description, phone, email, website });
  };

  const handleSaveClick = async () => {
    try {
      var tload = toast.loading("Updating your Ad");
      const res = await axios.put("/personalads/approved", {
        id: ad._id,
        tagline: newad.tagline,
        description: newad.description,
        phone: newad.phone,
        email: newad.email,
        website: newad.website,
      });

      if (res.status === 200) {
        toast.success(res.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsEditable(false);
      toast.dismiss(tload);
      setLoad();
    }
  };

  const handelDeleteClick = async () => {
    try {
      var tload = toast.loading("Deleting your Ad");
      const res = await axios.delete("/personalads/approved", {
        params: { id: ad._id },
      });

      if (res.status === 200) {
        toast.success(res.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      toast.dismiss(tload);
      setLoad();
    }
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleNextImage = () => {
    if (currentImageIndex === ad.images.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(ad.images.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const submitpayment = async (feature) => {
    setLoading(true);
    console.log(feature);
    const data = {
      id: ad._id,
      name: feature.name,
      description: feature.description,
      quantity: 1,
      price: feature.price,
      currency: "USD",
      sku: "Subscription",
    };

    try {
      const res = await axios.post("/payment", data);
      const rdata = await res.data;
      console.log(rdata);
      if (res.status === 200) {
        window.location.assign(rdata);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return isEditable ? (
    <div className="flex flex-col space-y-4">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="tagline"
        value={newad.tagline}
        onChange={handleInputChange}
        className="border border-gray-400 rounded px-3 py-2"
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={newad.description}
        onChange={handleInputChange}
        className="border border-gray-400 rounded px-3 py-2"
      ></textarea>

      <label htmlFor="phone">Phone</label>
      <input
        type="text"
        id="phone"
        name="phone"
        value={newad.phone}
        onChange={handleInputChange}
        className="border border-gray-400 rounded px-3 py-2"
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={newad.email}
        onChange={handleInputChange}
        className="border border-gray-400 rounded px-3 py-2"
      />

      <label htmlFor="website">Website</label>
      <input
        type="url"
        id="website"
        name="website"
        value={newad.website}
        onChange={handleInputChange}
        className="border border-gray-400 rounded px-3 py-2"
      />

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleCancelClick}
          className="text-red-500 hover:text-red-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveClick}
          className="text-blue-500 hover:text-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-lg overflow-hidden shadow-md my-4">
      <div className="relative">
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-25 hover:bg-opacity-50 text-white px-2 py-1 rounded-full shadow-md transition duration-200 ease-in-out"
          onClick={handlePrevImage}
        >
          <FaChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-25 hover:bg-opacity-50 text-white px-2 py-1 rounded-full shadow-md transition duration-200 ease-in-out"
          onClick={handleNextImage}
        >
          <FaChevronRight className="h-6 w-6" />
        </button>
        <img
          className="w-full h-64 object-cover"
          src={ad.images[currentImageIndex]}
          alt={ad.tagline}
        />
      </div>
      <div className="px-4 py-2 bg-black bg-opacity-50 flex justify-between items-center">
        <h2 className="text-white text-xl font-bold">{ad.tagline}</h2>
        <div className="flex">
          <button
            className="text-gray-300 hover:text-white mr-2"
            onClick={() => setIsEditable(true)}
          >
            <FaEdit className="h-6 w-6" />
          </button>
          <button
            className="text-gray-300 hover:text-white mr-2"
            onClick={handelDeleteClick}
          >
            <FaTrash className="h-6 w-6" />
          </button>

          {!ad.boost.boosted ? (
            <Popup
              closeOnEscape={true}
              clos
              contentStyle={{
                borderRadius: "10px",
                width: "90%",
                height: "70%",
                overflowY: "scroll",
              }}
              trigger={
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                  Boost
                </button>
              }
              modal
            >
              <div className="">
                {loading ? (
                  <div
                    className="flex h-full justify-center items-center 
              "
                  >
                    <Loader />
                  </div>
                ) : (
                  <div className="flex flex-col  md:flex-row justify-center space-x-4">
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
                            onClick={() => submitpayment(pkg)}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Popup>
          ) : (
            <p className="bg-green-500 font-quick text-lg font-bold text-white py-1 px-2 rounded-md ">
              Boosted
            </p>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-600">{ad.description.slice(0, 100)}...</p>
        {expanded && (
          <div className="mt-4">
            <p className="text-gray-600">
              <strong>WhatsApp:</strong> {ad.whatsapp}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {ad.email}
            </p>
            <p className="text-gray-600">
              <strong>Website:</strong>{" "}
              <a
                href={
                  ad.website.match("http") ? ad.website : `http://${ad.website}`
                }
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                {ad.website.match("http") ? ad.website : `http://${ad.website}`}
              </a>
            </p>
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full sm:w-auto"
          onClick={handleExpand}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      </div>
    </div>
  );
}

export default ListedAd;
