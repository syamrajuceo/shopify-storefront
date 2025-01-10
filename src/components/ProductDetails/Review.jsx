import { Rating } from "@mui/material";
import ReviewForm from "./ReviewForm";
import { useState } from "react";
import useShopifyStore from "../../store/useShopifyStore";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const Review = ({
  product_handle,
  filteredReviews,
  ratingDistribution,
  handleReview,
  averageRating,
  ratingCount,
}) => {
  // const { reviews } = useShopifyStore.getState();
  const [isShow, SetIsShow] = useState(false);
  const [loadmore, setLoadmore] = useState(3);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const handleLoadmore = (loadmore) => {
    setLoadmore(loadmore);
  };

  return (
    <div className="w-full">
      {isShow && (
        <ReviewForm
          SetIsShow={SetIsShow}
          product_handle={product_handle}
          handleReview={handleReview}
        />
      )}
      <section className="px-[20px] w-full ">
        <div className="w-full lg-6 mx-auto">
          <div className="w-full">
            <div className="flex-col md:flex-row flex h-full w-full">
              <div className="relative md:sticky h-full md:top-10 w-full md:w-1/2 pr-1 md:pr-10">
                {/* Overall rating section */}
                <h1 className="text-[22px] text-gray-800 font-[500]">Reviews</h1>
                <div className="flex items-center gap-3 mt-4 ">
                  <Rating
                    value={averageRating.toFixed(1)}
                    precision={0.5}
                    readOnly
                  />
                  <p className="text-xl text-gray-800 font-semibold">
                    {averageRating.toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-500">
                    ({ratingCount} reviews)
                  </p>
                </div>

                {/* Rating breakdown section */}
                <div className="flex gap-1 pb-11 border-b border-gray-100 w-full max-xl:mx-auto mt-3">
                  <div className="box flex flex-col gap-y-1 w-full">
                    {Object.entries(ratingDistribution).map(([star, count]) => (
                      <div key={star} className="flex items-center w-full">
                        {/* Star count */}
                        <p className="font-medium text-lg text-black mr-0.5">
                          {star}
                        </p>

                        {/* Star SVG */}
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

                        {/* Progress Bar */}
                        <p className="h-1.5 w-full min-w-[170px] sm:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                          <span
                            className="h-full rounded-3xl bg-amber-400 flex"
                            style={{ width: `${(count / ratingCount) * 100}%` }}
                          />
                        </p>

                        {/* Count of reviews */}
                        <p className="font-medium text-lg text-black mr-0.5">
                          {count}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <hr /> */}
              </div>
              {/* All Reviews */}

              <div className="py-2 w-full md:w-1/2">
                <div className="flex items-center justify-between">
                  <p className="font-bold ">All Reviews ({ratingCount})</p>
                  <p
                    className="font-bold text-blue-500 cursor-pointer"
                    onClick={() => {
                      {
                        accessToken ? SetIsShow(true) : navigate("/login");
                      }
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    + Add Review
                  </p>
                </div>
                <div className="w-full mt-5">
                  {filteredReviews.length > 0 ? (
                    filteredReviews.slice(0, loadmore).map((review, index) => (
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
                            {moment(review.created_at).fromNow()}
                          </p>
                        </div>
                        <p className="text-gray-700 text-md font-[600] mt-2 capitalize">
                          {review.title}
                        </p>
                        <p className="text-gray-500 text-sm font-[600] mt-2 capitalize">
                          {review.body}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>Reviews not available</p>
                  )}

                  <div className="flex items-center justify-center mt-6">
                    <button
                      className="rounded px-3 py-1 font-[500] bg-orange-500 text-white"
                      onClick={() => handleLoadmore(loadmore + 3)}
                    >
                      Load more
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};
