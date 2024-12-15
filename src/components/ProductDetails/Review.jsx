import { Rating } from "@mui/material";
import ReviewForm from "./ReviewForm";
import { useState } from "react";
import useShopifyStore from "../../store/useShopifyStore";
const { reviews } = useShopifyStore.getState();
import moment from "moment";

export const Review = ({ product_handle }) => {
  const overallRating = 4.5;
  const totalReviews = 1200;
  const [isShow, SetIsShow] = useState(false);

  console.log("product_handle", product_handle);

  console.log("filteredReviews : ", reviews);
  return (
    <div className="w-full">
      {isShow && (
        <ReviewForm SetIsShow={SetIsShow} product_handle={product_handle} />
      )}
      <section className="">
        <div className="w-full max-w-7xl lg-6 mx-auto">
          <div className="w-full">
            <h1 className="text-[22px] text-gray-800 font-[500]">Reviews</h1>
            {/* Overall rating section */}
            <div className="flex items-center gap-3 mt-4 ">
              <Rating value={overallRating} precision={0.5} readOnly />
              <p className="text-xl text-gray-800 font-semibold">
                {overallRating}
              </p>
              <p className="text-sm text-gray-500">({totalReviews} reviews)</p>
            </div>

            {/* Rating breakdown section */}
            <div className="flex gap-1 pb-11 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto mt-3">
              <div className="box flex flex-col gap-y-1">
                <div className="flex items-center w-full">
                  <p className="font-medium text-lg text-black mr-0.5 ">5</p>
                  <svg
                    width={30}
                    height={30}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="px-1"
                  >
                    <g clipPath="url(#clip0_12042_8589)">
                      <path
                        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                        fill="#FBBF24"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12042_8589">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="h-1.5 w-full min-w-[170px] sm:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                    <span className="h-full w-[70%] rounded-3xl bg-amber-400 flex" />
                  </p>
                  <p className="font-medium text-lg text-black mr-0.5">102</p>
                </div>
                <div className="flex items-center w-full">
                  <p className="font-medium text-lg text-black mr-0.5 ">4</p>
                  <svg
                    width={30}
                    height={30}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="px-1"
                  >
                    <g clipPath="url(#clip0_12042_8589)">
                      <path
                        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                        fill="#FBBF24"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12042_8589">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="h-1.5 w-full min-w-[170px] sm:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                    <span className="h-full w-[30%] rounded-3xl bg-amber-400 flex" />
                  </p>
                  <p className="font-medium text-lg text-black mr-0.5">28</p>
                </div>
                <div className="flex items-center w-full">
                  <p className="font-medium text-lg text-black mr-0.5 ">3</p>
                  <svg
                    width={30}
                    height={30}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="px-1"
                  >
                    <g clipPath="url(#clip0_12042_8589)">
                      <path
                        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                        fill="#FBBF24"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12042_8589">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="h-1.5 w-full min-w-[170px] sm:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                    <span className="h-full w-[50%] rounded-3xl bg-amber-400 flex" />
                  </p>
                  <p className="font-medium text-lg text-black mr-0.5">40</p>
                </div>
                <div className="flex items-center w-full">
                  <p className="font-medium text-lg text-black mr-0.5 ">2</p>
                  <svg
                    width={30}
                    height={30}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="px-1"
                  >
                    <g clipPath="url(#clip0_12042_8589)">
                      <path
                        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                        fill="#FBBF24"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12042_8589">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="h-1.5 w-full min-w-[170px] sm:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                    <span className="h-full w-[26%] rounded-3xl bg-amber-400 flex" />
                  </p>
                  <p className="font-medium text-lg text-black mr-0.5">22</p>
                </div>
                <div className="flex items-center w-full">
                  <p className="font-medium text-lg text-black mr-0.5 ">1</p>
                  <svg
                    width={30}
                    height={30}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="px-1"
                  >
                    <g clipPath="url(#clip0_12042_8589)">
                      <path
                        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                        fill="#FBBF24"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12042_8589">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="h-1.5 w-full min-w-[170px] sm:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                    <span className="h-full w-[20%] rounded-3xl bg-amber-400 flex" />
                  </p>
                  <p className="font-medium text-lg text-black mr-0.5">15</p>
                </div>
              </div>
            </div>
            <hr />

            {/* All Reviews */}

            <div className="py-2 mt-4">
              <div className="flex items-center justify-between">
                <p className="font-bold ">All Reviews (1)</p>
                <p
                  className="font-bold text-blue-500 cursor-pointer"
                  onClick={() => {
                    SetIsShow(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  + Add Review
                </p>
              </div>
              <div className="w-full mt-5">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="px-4 p-2">
                      <h3 className="font-[700] uppercase">
                        {review.reviewer.name}
                      </h3>
                      <div className="flex items-center gap-2 py-1">
                        <Rating
                          value={review.rating}
                          precision={0.5}
                          readOnly
                        />
                        {/* <p className="text-gray-500 text-sm">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date(review.created_at).toLocaleTimeString()}
                        </p> */}
                        <p className="text-gray-500 text-sm">
                          {moment(review.created_at).fromNow()} ago
                        </p>
                      </div>
                      <p className="text-gray-700 text-sm font-[600] mt-2">
                        {review.body}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>Reviews not available</p>
                )}

                <div className="flex items-center justify-center mt-6">
                  <button className="rounded px-3 py-1 font-[500] bg-orange-500 text-white">
                    Load more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
