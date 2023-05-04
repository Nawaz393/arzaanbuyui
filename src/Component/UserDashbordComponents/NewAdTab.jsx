import React, { useState, useRef } from "react";
import { options } from "../options";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

import Loader from "../Loader";

const NewAd = ({ userid, role }) => {
  const [loading, setloading] = useState(false);

  const imageinput = useRef(null);

  const [length, setlength] = useState(0);
  const customid = "toast";
  const [selectedfiles, Setselectedfiles] = useState([]);

  const [form, setForm] = useState({
    name: "",
    tagline: "",
    price: "",
    category: "",
    detail: "",
    description: "",
    images: [],
    email: "",
    whatsapp: "",
    phone: "",
    address: "",
    website: "",
  });

  const handelfiles = (e) => {
    let arrfiles = [];
    if (selectedfiles.length === 4) {
      toast.error("you can only select 4 images");
      return;
    }

    if (length + e.target.files.length > 4) {
      toast.error("you can only select 4 images");
      return;
    }

    const files = e.target.files;

    arrfiles = Array.from(files);

    setlength(length + files.length);

    Setselectedfiles((prev) => [...prev, ...arrfiles]);
    console.log(selectedfiles);
  };
  const handleImage = async (e) => {
    const files = e.target.files;

    let newarr = [];
    if (form.images.length === 4) {
      toast.error("you can only select 4 images");
      return;
    }

    if (form.images.length + files.length > 4) {
      toast.error("you can only select 4 images");
      return;
    }

    // convert filelist to array and then to base64 and push to newarr
    const fileArray = Array.from(files);

    // if (fileArray.length != 4) {
    //   toast.error("you should have to select 4 images");
    //   return;
    // }

    // create an array of Promises that will resolve with the base64 encoded strings
    const promises = fileArray.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    // wait htmlFor all Promises to resolve
    const results = await Promise.all(promises);
    console.log(results);
    // add the base64 encoded strings to the newarr array

    // rest of the code

    // setForm({ ...form, images: [...form.images, newarr] });
    setForm((prev) => ({ ...prev, images: [...prev.images, ...results] }));

    console.log(form.images);

    // make the input empty

    e.target.value = null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // dispatch(setAdValues({ name, value }));

    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.name) {
      toast.error("Please enter a name.");
      return false;
    }
    if (!form.tagline) {
      toast.error("Please enter a tagline.");
      return false;
    }
    if (!form.price) {
      toast.error("Please enter a price.");
      return false;
    }
    if (!form.category) {
      toast.error("Please select a category.");
      return false;
    }
    if (!form.detail) {
      toast.error("Please enter details.");
      return false;
    }
    if (!form.description) {
      toast.error("Please enter a description.");
      return false;
    }
    if (form.images.length !== 4) {
      toast.error("Please select 4 images.");
      return false;
    }
    if (!form.email) {
      toast.error("Please enter an email address.");
      return false;
    }
    if (!form.website) {
      toast.error("Please enter a website.");
      return false;
    }
    if (!form.whatsapp && !form.phone) {
      toast.error("Please enter at least one contact method.");
      return false;
    }
    if (!form.address) {
      toast.error("Please enter an address.");
      return false;
    }
    return true;
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setloading(true);

    const ptaost = toast.loading("Uploading your Ad please wait...", {
      autoClose: false,
    });
    console.log(form);



    try {
      const res = await axios.post("personal/pending", {
        ...form,
        userid,
        role,
      });

      if (res.status === 200) {
        toast.success(res.data);
        setForm({
          name: "",
          tagline: "",
          price: "",
          category: "",
          detail: "",
          description: "",
          images: [],
          email: "",
          website: "",
          whatsapp: "",
          phone: "",
          address: "",
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else if (error.code === "ERR_NETWORK") {
        toast.error("Network Error please refresh the page");
      } else {
        toast.error("Something went wrong please refresh the page ");
      }
    } finally {
      toast.dismiss(ptaost);
      setloading(false);
    }
  };

  return (
    <div className="mt-10 sm:mt-0">
      <ToastContainer />

      <div className="md:grid md:w-[70vw] w-[70vw]  md:gap-6">
        <div className="px-4 sm:px-0 md:col-span-2  w-full">
          <h3 className="text-xl font-quick  font-bold  leading-6 text-gray-900  text-center">
            Post New Ad
          </h3>
        </div>

        <div className="mt-5 md:col-span-2 md:mt-0">
          {loading ? (
            <div className="h-full flex justify-center items-center">
              {" "}
              <Loader />
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                handelSubmit(e);
              }}
            >
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        min={3}
                        required
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Tagline (small description/Title)
                      </label>
                      <input
                        type="text"
                        name="tagline"
                        value={form.tagline}
                        required
                        onChange={handleChange}
                        min={10}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Price (with $ ,Rs like 10 $ )
                      </label>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        onChange={handleChange}
                        value={form.price}
                        required
                        min={1}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <select
                        required
                        onChange={handleChange}
                        value={form.category}
                        name="category"
                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        {options.map((item) => {
                          return (
                            <option value={item.value} key={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Detail
                      </label>
                      <textarea
                        type="text"
                        name="detail"
                        value={form.detail}
                        onChange={handleChange}
                        min={15}
                        required
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        min={15}
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
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Attach files</span>
                            <input
                              id="file-upload"
                              name="images"
                              type="file"
                          
                              accept="image/*"
                              multiple
                              ref={imageinput}
                              onChange={handleImage}
                              className="sr-only"
                    
                            />
                          </label>
                          <p className="pl-1">or drag and drop 4 Images </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 10MB 1080x1080 pixels
                        </p>
                        <p className="text-xs text-blue-600 font-semibold">
                          {/* {selectedfiles.map((item) => item.name).join(", ")}{" "} */}
                          {form.images.length} files selected
                        </p>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        whatsapp number
                      </label>
                      <input
                        type="text"
                        name="whatsapp"
                        value={form.whatsapp}
                        onChange={handleChange}
                        required
                        min={5}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Mobile number
                      </label>
                      <input
                        onChange={handleChange}
                        value={form.phone}
                        type="number"
                        name="phone"
                        required
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        website link or socail media link
                      </label>
                      <input
                        type="text"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        min={10}
                        required
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="address"
                        value={form.address}
                        required
                        min={10}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Publish
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default NewAd;
