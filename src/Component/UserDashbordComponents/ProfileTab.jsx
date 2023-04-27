import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Popup } from "reactjs-popup";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Avatar from "../../assets/img/user.png";
import { BsCloudUploadFill } from "react-icons/bs";
import UpdatePassword from "./UpdatePassword";
import Loader from "../Loader";

const Profile = ({ id }) => {
  const user = useSelector((state) => state.user.value);
  const [call, setCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const res = await axios.get("personal/userdashboard", {
          params: { id: id },
        });

        if (res.status == 200) {
          setUserinfo(res.data);
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
        setIsLoading(false);
      }
    })();
  }, [call]);

  const [form, setForm] = useState({
    name: userinfo?.name,
    bio: userinfo?.bio || "",
    phone: userinfo?.phone || "",
    address: userinfo?.address || "",
  });

  console.log(userinfo);

  const [image, setImage] = useState(userinfo?.image || Avatar);

  useEffect(() => {
    setForm({
      name: userinfo?.name,
      bio: userinfo?.bio,
      phone: userinfo?.phone,
      address: userinfo?.address,
    });
    setImage(userinfo?.image || Avatar);
  }, [userinfo]);
  const [imageUpload, setImageUpload] = useState(null);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      //convert image to base64 string
      const reader = new FileReader();
      reader.onload = () => {
        setImageUpload(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const submitImage = () => {
    try {
      setIsLoading(true);
      var load = toast.loading("Uploading Image");

      const res = axios.post("personal/uploadprofile", {
        id: user.user._id,
        imageUpload,
      });

      if (res.status == 200) {
        toast.dismiss(load);
        toast.success("Image Uploaded");
        setIsLoading(false);

        //call use Effect to update image
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
      setIsLoading(false);
      toast.dismiss(load);
      setCall(!call);
    }
  };

  const handelSubmit = async (e) => {
    console.log(form);
    e.preventDefault();
    try {
      setIsLoading(true);
      var load = toast.loading("Updating Profile");
      const res = await axios.post("personal/updateinformation", {
        id: user.user._id,
        ...form,
      });

      if (res.status == 200) {
        toast.success("Profile Updated");
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
      setIsLoading(false);
      toast.dismiss(load);
      setCall(!call);
      setOpen(false);
    }
  };

  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log("form", form);
  return (
    <div className="min-h-screen w-full ">
      <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full flex justify-center">
                <div className=" ">
                  <div className="shadow-xl overflow-hidden rounded-full align-middle border-none  -m-16 -ml-20 lg:-ml-16 h-[140px] max-w-[150px]">
                    <img
                      src={image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      // className="shadow-xl rounded-full align-middle border-none  -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full text-center mt-20">
                <div className="flex items-center justify-evenly">
                  {!userinfo?.image && (
                    <div className="   ">
                      {" "}
                      <input
                        name="images"
                        type="file"
                        required
                        accept="image/*"
                        min={1}
                        max={1}
                        onChange={handleImage}
                      />
                    </div>
                  )}
                  {imageUpload && (
                    <button
                      disabled={isLoading}
                      onClick={submitImage}
                      className=" flex items-center  justify-evenly hover:bg-blue-600   bg-blue-500 rounded-md  px-4 py-1 text-gray-200
                 mb-0"
                    >
                      {" "}
                      Upload
                      <BsCloudUploadFill className="  ml-1  cursor-pointer" />
                    </button>
                  )}
                </div>
                <div className="flex justify-center lg:pt-4 pt-8 pb-0"></div>
              </div>
            </div>
            <div className="text-center mt-2">
              <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                {userinfo?.name}
              </h3>
              <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                {userinfo?.email}
              </div>
              <div className="text-xs mt-0 mb-2 text-slate-400 ">
                {userinfo?.phone || "your phone number"}
              </div>
              <div className="text-xs mt-0 mb-2 text-slate-400 ">
                {userinfo?.address || "your address"}
              </div>
            </div>
            <div className="mt-6 py-6 border-t border-slate-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <p className="font-light leading-relaxed text-slate-600 mb-4">
                    {userinfo?.bio ||
                      "An artist of considerable range, Mike is the name taken b Melbourne-raised, Brooklyn-based Nick Murphy writes, performsand records all of his own music, giving it a warm."}
                  </p>

                  <Popup
                    trigger={
                      <button className="ml-auto block">
                        <CiEdit className=" text-2xl text-red-500  cursor-pointer " />
                      </button>
                    }
                    modal
                    closeOnEscape
                    closeOnDocumentClick
                    contentStyle={{
                      borderRadius: "10px",
                    }}
                  >
                    <div className="bg-white p-4 rounded-lg">
                      <form onSubmit={handelSubmit}>
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
                            minLength={3}
                            onChange={handelChange}
                            required
                            value={form.name}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            minLength={3}
                            onChange={handelChange}
                            required
                            value={form.address}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="Number"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Number
                          </label>
                          <input
                            type="text"
                            name="phone"
                            onChange={handelChange}
                            value={form.phone}
                            id="Number"
                            minLength={5}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="Bio"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Bio
                          </label>
                          <textarea
                            type="text"
                            name="bio"
                            onChange={handelChange}
                            minLength={15}
                            id="Bio"
                            value={form.bio}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div className="w-full">
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                            disabled={isLoading}
                          >
                            <span>Update</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </Popup>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <UpdatePassword id={id} />
    </div>
  );
};

export default Profile;
