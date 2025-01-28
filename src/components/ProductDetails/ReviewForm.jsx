import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from 'react';
import RatingContainer from './RatingContainer';
import { addReview } from "../../store/review";

function ReviewForm({ SetIsShow,product_handle , handleReview}) {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
  const [rating, setRating] = useState(0);
  const user = JSON.parse(localStorage.getItem("user")); 

  let reviewer_name = user.firstName + " " + user.lastName
  let reviewer_email = user.email

  console.log("user", reviewer_email)

  // Handle form submission
  const onSubmit = async (data) => {
    const reviewData = {
      ...data,
      rating,
      product_handle,
      reviewer_email,
      reviewer_name
    };
    console.log(reviewData)
    try {
      const res = await handleReview(reviewData)
      SetIsShow(false);
    } catch (error) {
      console.error("Error submitting review:", error.message);
    }
  };

  // Handle rating change (you can use a component like RatingContainer)
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  useEffect(() => {
    // Disable scrolling 
    document.body.style.overflow = 'hidden';
    // Clean up when the component unmounts
    return () => {
        document.body.style.overflow = 'auto';
    };
}, []);
  return (
    <div className="z-40 absolute top-0 left-0 right-0 bottom-0 bg-slate-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-4/5 md:w-1/3 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leave a Review</h2>

        {/* Rating Container */}
        <RatingContainer rating={rating} setRating={handleRatingChange} />

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            {...register("title", { required: "Title is required" })}
            className="w-full p-3 border-2 border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
            placeholder="Review Title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

          <textarea
            {...register("review_body", { required: "Review body is required" })}
            className="w-full p-3 border-2 border-gray-300 rounded-md mb-6 focus:outline-none focus:border-blue-500"
            placeholder="Write your review..."
            rows="4"
          />
          {errors.review_body && <p className="text-red-500 text-sm">{errors.review_body.message}</p>}

          <div className="grid grid-cols-2 gap-4 justify-between items-center">
            <button
              type="button"
              onClick={() => SetIsShow(false)}
              className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-200 w-full"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`px-6 py-2 bg-blue-500 text-white rounded-md ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-600 transition duration-200'} w-full`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
