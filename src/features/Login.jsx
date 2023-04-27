import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "./useSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isloading, setIsloading] = useState(false);

  const handelchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      var loadingtoast = toast.loading("Logining...", { autoClose: false });
      setIsloading(true);
      const res = await axios.post("/user/login", form);
      if (res.status === 200) {
        toast.success("Logined successfully");
        dispatch(setToken(res.data));
        sessionStorage.setItem("token", JSON.stringify(res.data));
        navigate("/userDashboard");
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

  return (
    <>
      <div className="flex min-h-full  justify-center mb-20  px-4 sm:px-6 lg:px-8 ">
        <ToastContainer />
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight font-quick text-gray-900">
              Login To Your Account
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
                  value={form.email}
                  type="email"
                  autoComplete="email"
                  onChange={handelchange}
                  required
                  className=" block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className=" block w-full  rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/Forgot"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isloading}
                className="group  flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isloading ? "Logining..." : "Login"}
              </button>
              <div className="text-sm py-3">
                <span className="text-sm font-nunito font-bold text-gray-500">
                  New to Arzaan buy{" "}
                </span>
                <Link
                  to="/Signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up now !
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
