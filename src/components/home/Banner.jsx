import React from "react";

function Banner({ image }) {
  return (
    <div className="px-4 md:p-8 md:mt-6 md:h-[500px] ">
        <img src={image} alt="banner" className="w-full h-auto object-fit rounded-lg md:h-[350px]  " />
    </div>
  );
}

export default Banner;
