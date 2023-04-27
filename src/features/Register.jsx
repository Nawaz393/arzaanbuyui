import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Popup } from "reactjs-popup";
import {Link} from "react-router-dom"
import axios from "axios";
export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [otp, setotp] = useState();

  const [success, setsuccess] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const handelchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      var loadingtoast = toast.loading("Registering...", { autoClose: false });
      setIsloading(true);
      const res = await axios.post("/user/register", form);

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

  const handelotp = async (e) => {
    e.preventDefault();

    try {
      var loadingtoast = toast.loading("Verifying...", { autoClose: false });
      setIsloading(true);
      const res = await axios.post("/user/verify", { otp });

      if (res.status === 200) {
        setsuccess(false);
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
      setsuccess(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full  justify-center mb-20  px-4 sm:px-6 lg:px-8 ">
        <ToastContainer />
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center font-quick text-3xl font-bold tracking-tight text-gray-900">
              Register new Account
            </h2>
          </div>
          <form onSubmit={handelSubmit} className="mt-11 space-y-8">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="">
                <label htmlFor="fullname" className="sr-only">
                  Full Name
                </label>
                <input
                  id="fullname"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={3}
                  value={form.name}
                  onChange={handelchange}
                  className=" block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Full Name"
                />
              </div>
              <div className="">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  value={form.email}
                  type="email"
                  autoComplete="email"
                  onChange={handelchange}
                  required
                  className=" block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
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
                  className=" block w-full  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="cpassword" className="sr-only">
                  confirm Password
                </label>
                <input
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  value={form.cpassword}
                  onChange={handelchange}
                  autoComplete="current-password"
                  required
                  minLength={8}
                  className=" block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="confirm Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already have an account?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isloading}
                className="group  flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isloading ? "Registering..." : "Register"}
              </button>
              <Popup open={success} onClose={success} modal>
                <div className="h-[50vh]  flex flex-col  ">
                  <h1 className="text-center text-xl font-quick font-bold here">
                    Enter OTP Here
                  </h1>
                  <div className=" my-10">
                    <label htmlFor="otp" className="sr-only">
                      OTP
                    </label>
                    <input
                      id="otp"
                      name="otp"
                      type="number"
                      value={otp}
                      onChange={(e) => {
                        setotp(e.target.value);
                      }}
                      required
                      minLength={6}
                      maxLength={6}
                      className=" block  
                    appearance-none  w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="OTP"
                    />
                  </div>
                  <button
                    onClick={handelotp}
                    disabled={isloading}
                    className="group  flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isloading ? "Verifying..." : "verify"}
                  </button>
                  <p className="text-sm mt-4 px-2 text-gray-500 align-bottom font-nunito ">
                    if you did not recieve otp check your spam or junk folder of
                    mail
                  </p>
                </div>
              </Popup>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
