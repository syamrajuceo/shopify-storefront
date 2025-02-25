import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../store/auth";
// import { updateCartBuyerIdentity } from "../../store/cart";
import toast from "react-hot-toast";
import { updateCartBuyerIdentity } from "../../redux/slices/cartSlice";

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [loading, setLoading] = useState(false);

  // Check if user is already logged in
  //   useEffect(() => {
  //     const accessToken = localStorage.getItem("accessToken");
  //     if (accessToken) {
  //       navigate("/"); // Redirect to home page if already logged in
  //     }
  //   }, [navigate]);

  const onSubmit = async (data) => {
    console.log("Data ", data);
    try {
      const { firstName, lastName, email, password } = data;
      setLoading(true);
      const customer = await signUp(firstName, lastName, email, password);
      console.log("Customer ", customer);
      setLoading(false);
      const { accessToken } = customer;

      localStorage.setItem("accessToken", accessToken);
      const redirectUrl = localStorage.getItem("redirectAfterLogin");
      console.log("Account created successfully:", customer);
      if (redirectUrl && redirectUrl === "/cart") {
        const accessToken = localStorage.getItem("accessToken");
        const cartId = localStorage.getItem("cartId");
        const updatedCart = await updateCartBuyerIdentity(cartId, accessToken);
        if (updatedCart) {
          localStorage.setItem("checkoutUrl", updatedCart.checkoutUrl);
        }
        console.log("Updated Cart:", updatedCart);

        navigate(updatedCart.checkoutUrl);
        localStorage.removeItem("redirectAfterLogin");
      } else if (redirectUrl) {
        // Navigate to the stored URL
        navigate(redirectUrl);
        localStorage.removeItem("redirectAfterLogin"); // Cleanup
      } else {
        // Default navigation
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      // toast.error(error.message);
      console.error("Error during registration:", error.message);
    }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
          Or
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150 ml-2"
          >
            login to your account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  type="text"
                  required
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Last Name */}
            <div className="mt-6">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  type="text"
                  required
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  placeholder="user@example.com"
                  type="email"
                  required
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mt-6">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  required
                  {...register("password_confirmation", {
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  {loading ? "Loading..." : "Create Account"}
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
