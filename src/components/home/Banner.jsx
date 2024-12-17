import React from "react";

function Banner({ image,mobile }) {
  return (
    <div className="px-4 md:px-8 md:mt-6 md:h-[350px] ">
        <img src={image} alt="banner" className="w-full h-auto object-cover rounded-[18px] md:h-[350px] md:flex hidden " />
        <img src={mobile} alt="banner" className="w-full h-auto object-cover rounded-[18px] md:h-[350px]  flex md:hidden" />
    </div>
  );
}

export default Banner;
