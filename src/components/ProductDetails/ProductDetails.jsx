

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Breadcrumbs, Rating, Typography } from "@mui/material";
import deliveryIcon from "../../assets/images/hugeicons_truck-delivery.png";
import stockIcon from "../../assets/images/Vector.png";
import tamaraLogo from "../../assets/images/image 1.png";
import tabbyLogo from "../../assets/images/image 2.png";
import ProductList from "./ProductList";
import { Review } from "./Review";
import ProductDescription from "./ProductDescription";

export const ProductDetails = () => {
  return (
    <div className="px-4 mb-[160px] md:mb-[30px]">
      <div className="block md:hidden">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography
            underline="hover"
            fontSize={"11px"}
            color="inherit"
            href="/"
          >
            Shop
          </Typography>
          <Typography
            fontSize={"11px"}
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Eyewear
          </Typography>
          <Typography sx={{ color: "text.primary" }} fontSize={"11px"}>
            Sunglasses
          </Typography>
        </Breadcrumbs>
        <h2 className="text-sm font-normal text-gray-400">Urban Utility</h2>

        <p className="text-xl font-normal text-gray-700">
          Trendy Men's Sunglasses, Stylish Shades with UV & Polarized for
          Sports, Fashionable Eyewear in Dubai, Goggles for Blocking, Retro
          Square Cycling Sunglass with Blue Lens - Latest in Fashion Online UAE
        </p>
        <div className="flex space-x-2 mt-4">
          <Rating
            name="half-rating-read"
            defaultValue={4.5}
            precision={0.5}
            readOnly
          />
          <h4 className="text-gray-800 text-base">500 Reviews</h4>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Main image and sub-images section */}
        <div className="flex flex-col items-center shadow-xl object-cover p-3 max-h-auto w-full h-[450px]">
          {/* Main Image */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2SWEFq039QUATP0z_Dp5vqqj2tx9ej3fw_g&s"
            alt="Product"
            className="h-[300px]  w-auto rounded-md object-cover"
          />
          {/* Sub-images Container (displayed in a row below the main image) */}
          <div className="flex flex-row gap-2 mt-4 overflow-x-auto no-scrollbar px-4">
            <img
              src="https://carltonlondon.co.in/cdn/shop/files/clsw232_3.jpg?v=1684318860e"
              alt="Sub Image 1"
              className="w-20 h-20 object-cover cursor-pointer rounded-md border"
            />
            <img
              src="https://www.rkumar.in/cdn/shop/files/BAILEY_BROWN_A.png?v=1725276588"
              alt="Sub Image 2"
              className="w-20 h-20 object-cover cursor-pointer rounded-md border"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmcdJcV9Jfhd4JvGGpGw0ftfyMcf3Er-YU0g&s"
              alt="Sub Image 3"
              className="w-20 h-20 object-cover cursor-pointer rounded-md border"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2SWEFq039QUATP0z_Dp5vqqj2tx9ej3fw_g&s"
              alt="Sub Image 4"
              className="w-20 h-20 object-cover cursor-pointer rounded-md border"
            />
            <img
              src="https://carltonlondon.co.in/cdn/shop/files/clsw232_3.jpg?v=1684318860e"
              alt="Sub Image 1"
              className="w-20 h-20 object-cover cursor-pointer rounded-md border"
            />
            <img
              src="https://www.rkumar.in/cdn/shop/files/BAILEY_BROWN_A.png?v=1725276588"
              alt="Sub Image 2"
              className="w-20 h-20 object-cover cursor-pointer rounded-md border"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmcdJcV9Jfhd4JvGGpGw0ftfyMcf3Er-YU0g&s"
              alt="Sub Image 3"
              className="w-20 h-20 object-cover cursor-pointer rounded-md border"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2SWEFq039QUATP0z_Dp5vqqj2tx9ej3fw_g&s"
              alt="Sub Image 4"
              className="w-20 h-20 object-cover cursor-pointer rounded-md border"
            />
          </div>
          {/* Quantity and Add to Cart Section */}
          <div className="mt-2 h-[50px] w-full hidden sm:flex justify-center items-center gap-2">
            <div className="flex w-[30%] justify-around items-center gap-4 bg-gray-200 py-2 px-4 rounded-md">
              <p>-</p>
              {/* <span className="text-gray-400">|</span> */}
              <p className="text-lg font-bold">1</p>
              {/* <span className="text-gray-400">|</span> */}
              <p>+</p>
            </div>
            <div className="w-full">
              <button
                type="button"
                className="w-full bg-orange-500 py-2.5 px-4 hover:bg-orange-600 text-white text-sm font-semibold rounded-md disabled:opacity-60"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="ml-2 h-[450px] overflow-y-auto">
          <div className="hidden md:block">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography
                underline="hover"
                fontSize={"11px"}
                color="inherit"
                href="/"
              >
                Shop
              </Typography>
              <Typography
                fontSize={"11px"}
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Eyewear
              </Typography>
              <Typography sx={{ color: "text.primary" }} fontSize={"11px"}>
                Sunglasses
              </Typography>
            </Breadcrumbs>

            <h2 className="text-sm font-normal text-gray-400">Urban Utility</h2>

            <p className="text-xl font-normal text-gray-700">
              Trendy Men's Sunglasses, Stylish Shades with UV & Polarized for
              Sports, Fashionable Eyewear in Dubai, Goggles for Blocking, Retro
              Square Cycling Sunglass with Blue Lens - Latest in Fashion Online
              UAE
            </p>
            <div className="flex space-x-2 mt-4">
              <Rating
                name="half-rating-read"
                defaultValue={4.5}
                precision={0.5}
                readOnly
              />
              <h4 className="text-gray-800 text-base">500 Reviews</h4>
            </div>
          </div>
          <div className="flex flex-col flex-wrap gap-1 mt-4">
            <p className="text-gray-400 text-sm font-bold">
              was : <strike>AED 99.99</strike>
            </p>
            <p className="text-gray-800 text-md font-bold">Now : AED 59.99</p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              You save
              <span className="text-gray-700 font-bold">AED 40.00</span>
              <span className="text-gray-700 text-[10px] bg-[#6fd28ee1] py-[1px] px-[3px] rounded">
                40% off
              </span>
            </p>
          </div>

          <form action="">
            <div className="mt-3">
              <h3 className="text-md font-normal text-gray-600">
                Available Shades
              </h3>
              <div className="text mt-3">
                <div className="flex items-center justify-start gap-3 md:gap-6 relative mb-6 ">
                  <button
                    data-ui="checked active"
                    className="p-1.5 border border-gray-200 rounded-full transition-all duration-300 hover:border-emerald-500 :border-emerald-500"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="20" cy="20" r="20" fill="#10B981" />
                    </svg>
                  </button>
                  <button className="p-1.5 border border-gray-200 rounded-full transition-all duration-300 hover:border-amber-400 focus-within:border-amber-400">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="20" cy="20" r="20" fill="#FBBF24" />
                    </svg>
                  </button>
                  <button className="p-1.5 border border-gray-200 rounded-full transition-all duration-300 hover:border-red-500 focus-within:border-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <circle cx="20" cy="20" r="20" fill="#F43F5E" />
                    </svg>
                  </button>
                  <button className="p-1.5 border border-gray-200 rounded-full  transition-all duration-300 hover:border-blue-400 focus-within:border-blue-400">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="20" cy="20" r="20" fill="#2563EB" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="flex justify-start items-center w-auto max-w-[350px] text-gray-600 gap-2">
            <div className="flex justify-between items-center bg-[#EBF1FC] px-2 py-1 rounded-md gap-2 ">
              <img src={deliveryIcon} alt="" />
              <p className="text-[12px]">Free Delivery</p>
            </div>
            <div className="flex justify-between items-center bg-[#EBF1FC] px-2 py-1.5 rounded-md gap-2">
              <img src={stockIcon} alt="" />
              <p className="text-[12px]">Only one left in stock</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center gap-3 w-auto max-w-[400px] bg-[#FFF6EC] border rounded px-2 py-1 my-2">
              <img src={tamaraLogo} alt="" />
              <p className="text-[12px]">
                Split 4 payments of AEW 15.50 - No late fees, Sharia Complaints{" "}
              </p>
            </div>
            <div className="flex justify-between items-center gap-3 w-auto max-w-[400px] bg-[#ecffec] border rounded px-2 py-1">
              <img src={tabbyLogo} alt="" />
              <p className="text-[12px]">
                4 interest-free payments of AED 15.50. No fees.
                Shariah-compliant{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full flex gap-2 flex-col-reverse md:flex-row h-auto">
        <Review />
        <div className=" w-full">
          <ProductDescription />
        </div>
      </div>

      <div className="w-full ">
        <ProductList title={"Similar Products"}/>
      </div>
      <div className="w-full ">
        <ProductList title={"Popular Products"}/>
      </div>

      {/* Mobile fixed bottom Add to Cart */}
      <div className="fixed bottom-[65px] left-0 w-full sm:hidden bg-white border-t p-4 flex justify-between items-center gap-2 shadow-md">
        <div className="flex w-[45%] justify-around items-center gap-4 bg-gray-200 py-2 px-4 rounded-md">
          <p>-</p>
          <span className="text-gray-400">|</span>
          <p className="text-lg font-bold">1</p>
          <span className="text-gray-400">|</span>
          <p>+</p>
        </div>
        <button
          type="button"
          className="w-full bg-orange-500 py-2.5 px-4 hover:bg-orange-600 text-white text-sm font-semibold rounded-md disabled:opacity-60"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};