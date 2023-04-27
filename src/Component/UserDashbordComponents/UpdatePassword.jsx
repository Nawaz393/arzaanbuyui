import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function UpdatePassword({ id }) {
  const [formState, setFormState] = useState({
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors) {
      setErrors({});
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!formState.password) {
      errors.password = "Password is required";
    }
    if (formState.password !== formState.cpassword) {
      errors.cpassword = "Passwords do not match";
    }
    if (formState.password.length < 8 || formState.cpassword.length < 8) {
      errors.password = "Password must be atleast 8 characters";
    }

    if (Object.keys(errors).length === 0) {
      try {
        var uid = toast.loading("Updating...", { autoClose: false });
        const res = await axios.put("personal/updatepass", {
          ...formState,
          id,
        });

        if (res.status === 200) {
          toast.success(res.data);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data);
        } else if (error.code === "ERR_NETWORK") {
          toast.error("Network Error");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        toast.dismiss(uid);
      }

      console.log("Form submitted successfully");
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="flex flex-col items-center my-16   ">
      <div className="w-full max-w-md md:max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-inner shadow-gray-300 rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h6 className="text-xl font-quick font-semibold text-center text-blue-600">
            {" "}
            change password
          </h6>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              New Password:
            </label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              id="password"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="cpassword"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              name="cpassword"
              value={formState.cpassword}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.cpassword ? "border-red-500" : ""
              }`}
              id="cpassword"
              placeholder="********"
            />
            {errors.cpassword && (
              <p className="text-red-500 text-xs italic">{errors.cpassword}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
