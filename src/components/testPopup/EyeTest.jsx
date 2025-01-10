import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const PopupModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-100 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gray-300 bg-opacity-50 p-6 rounded-md shadow-lg max-w-sm w-full relative backdrop-blur-sm">
        {/* Close Icon (MUI) */}
        <button 
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <CloseIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>

        {/* Eye Test Image */}
        <img
          src="https://www.inneseyeclinic.com/wp-content/uploads/2019/01/Heres-What-Goes-on-During-a-Standard-Eye-Exam.jpg.webp"
          alt="Eye Test"
          className="w-full h-auto rounded-md mt-5"
        />

        {/* Title */}
        <h2 className="text-2xl font-semibold mt-4">Eye Test</h2>

        {/* Detailed Description */}
        <p className="mt-2 text-gray-700">
          Taking an eye test regularly helps in early detection of vision problems. Book an eye test to ensure your eyes are healthy and your vision is clear. A professional eye examination will help detect any potential issues before they become serious.
        </p>

        {/* Book Now Button */}
        <div className="mt-6 flex justify-center">
          <a
            href="https://eyestorebooking.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
