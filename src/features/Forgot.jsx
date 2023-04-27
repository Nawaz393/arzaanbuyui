import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Popup } from "reactjs-popup";
import axios from "axios";
export default function Forgot() {
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({
    otp: "",
    password: "",
  });

  const [success, setsuccess] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const handelchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      var loadingtoast = toast.loading("Sending Code to email...", {
        autoClose: false,
      });
      setIsloading(true);
      const res = await axios.post("/user/forgotpassword", { email });

      if (res.status === 200) {
        setsuccess(true);
        toast.success(res.data);
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data);
      } else if (error.code === "ERR_NETWORK") {
        toast.error("Network Error");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsloading(false);
      toast.dismiss(loadingtoast);
    }
  };

  const handelNewpassword = async (e) => {
    e.preventDefault();

    try {
      var loadingtoast = toast.loading("verifying otp...", {
        autoClose: false,
      });
      setIsloading(true);
      const res = await axios.put("/user/verifyforgotpassword", form);

      if (res.status === 200) {
        setsuccess(false);
        toast.success(res.data);
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data);
      } else if (error.code === "ERR_NETWORK") {
        setsuccess(false);
        toast.error("Network Error");
      } else {
        toast.error("Something went wrong");
      }

      if (error.response.status === 500) {
        setsuccess(false);
      }
    } finally {
      setIsloading(false);
      toast.dismiss(loadingtoast);
    }
  };

  return (
    <>
      <div className="flex min-h-full  justify-center mb-20  px-4 sm:px-6 lg:px-8 ">
        <ToastContainer />
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl  font-quick font-bold tracking-tight text-gray-900">
              Forgot Password
            </h2>
          </div>
          <form onSubmit={handelSubmit} className="mt-11 space-y-8">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  value={email}
                  type="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  className=" block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isloading}
                className="group  flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isloading ? "Forgotting..." : "Forgot"}
              </button>
            </div>
          </form>
          <Popup
            open={success}
            onClose={success}
            modal
            closeOnDocumentClick={false}
          >
            <div className="h-[50vh]  flex flex-col  ">
              <form onSubmit={handelNewpassword}>
                <h1 className="text-center text-xl font-quick font-bold here">
                  Enter forgot code Here
                </h1>
                <div className="my-10">
                  <div className="">
                    <label htmlFor="otp" className="sr-only">
                      Code
                    </label>
                    <input
                      id="otp"
                      name="otp"
                      type="number"
                      value={form.otp}
                      required
                      onChange={handelchange}
                      minLength={6}
                      maxLength={6}
                      className=" block  
                    appearance-none  w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="OTP"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      New Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={handelchange}
                      autoComplete="current-password"
                      required
                      minLength={8}
                      value={form.password}
                      className=" block w-full  rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isloading}
                  className="group  flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isloading ? "Verifying..." : "verify"}
                </button>
                <p className="text-sm mt-4 px-2 text-gray-500 align-bottom font-nunito ">
                  if you did not recieve otp check your spam or junk folder of
                  mail
                </p>
              </form>
            </div>
          </Popup>
        </div>
      </div>
    </>
  );
}
