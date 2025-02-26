import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/auth";
import { toast } from "react-hot-toast";
import ScrollToTop from "../../utils/ScrollToTop";
import { updateCartBuyerIdentity } from "../../redux/slices/cartSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  ScrollToTop();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { email, password } = data;
      const customer = await signIn(email, password);
      setLoading(false);

      if (customer) {
        toast.success("Logged in successfully!");

        // Get the redirect URL from localStorage
        const redirectUrl = localStorage.getItem("redirectAfterLogin");

        if (redirectUrl === "/cart") {
          const accessToken = localStorage.getItem("accessToken");
          const cartId = localStorage.getItem("cartId");

          if (cartId && accessToken) {
            dispatch(updateCartBuyerIdentity({ cartId, accessToken }))
              .unwrap()
              .then((updatedCart) => {
                if (updatedCart) {
                  localStorage.setItem("checkoutUrl", updatedCart.checkoutUrl);
                  console.log("Updated Cart:", updatedCart);
                }
                window.location.href = updatedCart.checkoutUrl;
              })
              .catch((error) => {
                toast.error("Failed to update cart: " + error);
              });
          } else {
            navigate(redirectUrl);
          }
          localStorage.removeItem("redirectAfterLogin");
        } else {
          navigate(redirectUrl || "/");
        }

        // window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      // toast.error(error)
      console.error("Error during login:", error);

      if (
        error.message === "User not found" ||
        error.message === "Invalid password" ||
        error.message === "Unidentified customer"
      ) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Login"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Don't have an account?
          <a
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500 ml-2"
          >
            Sign up
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="user@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
