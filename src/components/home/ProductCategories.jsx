import React from "react";
import { useNavigate } from "react-router-dom";
import sunglass from "../../assets/sunglass-3.webp";
import eyeglass from "../../assets/eyeglass-2.jpg";
import contactlens from "../../assets/contactlens-2.jpg";
import { IoMdArrowForward } from "react-icons/io";
import eyeglass2 from "../../assets/Category_Image.webp"
import clipOn from "../../assets/clip-on.png"
import readingGlass from "../../assets/readingGlass.jpg"
import safetyglass from "../../assets/safetyglass.avif"

const categories = [
  {
    title: "Sunglasses",
    image: sunglass,
    path:'/shop/Sunglasses'
  },
  {
    title: "Eyeglasses",
    image: eyeglass,
    path:'/shop/Eyeglasses'
  },
  {
    title: "Contact lenses",
    image: contactlens,
    path:'/shop/ContactLenses'
  },
  {
    title: "Clip-on",
    image: clipOn,
    path:'/shop/Clip-on'
  },
  {
    title: "Reading glasses",
    image: readingGlass,
    path:'/shop/Reading-glass'
  },
  {
    title: "Safety glasses",
    image: safetyglass,
    path:'/shop/Safety-glass'
  },
  
];

// ProductCard Component
const ProductCard = ({ title, image,path}) => {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden rounded-[18px] group cursor-pointer h-[320px]" onClick={() => navigate(path)}>
      <div className="aspect-square w-full overflow-hidden relative block">
        <img
          src={image}
          alt={title}
          className="w-full h-auto  object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />   */}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-custom-black text-center">
        <h3 className="text-white text-2xl font-semibold tracking-wide">
          {title}
        </h3>
      </div>
    </div>
  );
};

function ProductCategories() {
  const navigate = useNavigate();
  return (
    <>
      {/* //desktop */}
      <div className="h-a hidden md:flex">
        <div className=" mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className=" font-bold text-gray-900 md:text-2xl mb-4 mt-5">
            Category
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5 w-full">
            {/* Render product cards dynamically */}
            {categories.map((category, index) => (
              <ProductCard
                key={index}
                title={category.title}
                image={category.image}
                path={category.path}
              />
            ))}
          </div>
        </div>
      </div>

      {/* //mobile  */}
      <div className="w-full p-4 flex flex-col gap-3 md:hidden ">
      <div className="w-full flex justify-center">
        <h2 className=" font-bold text-gray-900 text-2xl mb-4 mt-5">
            Frames
            </h2>
        </div>
        <div className="flex" onClick={()=>{navigate('/shop/Sunglasses')}}>
          <div className="flex items-center justify-center gap-2 h-[150px] bg-custom-gray w-[40%] rounded-tl-xl rounded-bl-xl ">
            <h1 className="text-md">Sunglasses </h1>
            <IoMdArrowForward />
          </div>

          <div className="flex items-center justify-center gap-2 h-[150px]  w-[60%] " >
            <img
              src={sunglass}
              alt="sunglass"
              className="w-full h-full  object-cover rounded-tr-xl rounded-br-xl"
            />
          </div>
        </div>

        <div className="flex" onClick={()=>{navigate('/shop/Eyeglasses')}}>
          <div className="flex items-center justify-center gap-2 h-[150px]  w-[60%] ">
            <img
              src={eyeglass2}
              alt="eyeglass"
              className="w-full h-full  object-cover rounded-tl-xl rounded-bl-xl"
            />
          </div>
          <div className="flex items-center justify-center gap-2 h-[150px] bg-custom-gray w-[40%] rounded-tr-xl rounded-br-xl ">
            <h1 className="text-md">Eyeglasses</h1>
            <IoMdArrowForward />
          </div>
        </div>

        <div className="flex"  onClick={()=>{navigate('/shop/ContactLenses')}}>
          <div className="flex items-center justify-center gap-2 h-[150px] bg-custom-gray w-[40%] rounded-tl-[18px] rounded-bl-[18px] ">
            <h1 className="text-md">Contact Lenses </h1>
            <IoMdArrowForward />
          </div>

          <div className="flex items-center justify-center gap-2 h-[150px]  w-[60%] ">
            <img
              src={contactlens}
              alt="contactlens"
              className="w-full h-full  object-cover rounded-tr-xl rounded-br-xl"
            />
          </div>
        </div>

        <div className="flex" onClick={()=>{navigate('/shop/Clip-on')}}>
       <div className="flex items-center justify-center gap-2 h-[150px] bg-custom-gray w-[40%] rounded-tl-[18px] rounded-bl-[18px] ">
    <h1 className="text-md">Clip-on</h1>
    <IoMdArrowForward />
  </div>

  <div className="flex items-center justify-center gap-2 h-[150px]  w-[60%] ">
    <img
      src={clipOn}
      alt="clip-on"
      className="w-full h-full  object-cover rounded-tr-xl rounded-br-xl"
    />
  </div>
</div>

  <div className="flex" onClick={()=>{navigate('/shop/Reading glass')}}>
  <div className="flex items-center justify-center gap-2 h-[150px]  w-[60%] ">
    <img
      src={readingGlass}
      alt="reading-glass"
      className="w-full h-full  object-cover rounded-tl-xl rounded-bl-xl"
    />
    </div>
    <div className="flex items-center justify-center gap-2 h-[150px] bg-custom-gray w-[40%] rounded-tr-xl rounded-br-xl ">
    <h1 className="text-md">Reading Glass</h1>
    <IoMdArrowForward />
  </div>
  </div>

  <div className="flex" onClick={()=>{navigate('/shop/Safety glass')}}>
  <div className="flex items-center justify-center gap-2 h-[150px] bg-custom-gray w-[40%] rounded-tl-[18px] rounded-bl-[18px] ">
    <h1 className="text-md">Safety Glass</h1>
    <IoMdArrowForward />
  </div>

    <div className="flex items-center justify-center gap-2 h-[150px]  w-[60%] ">
    <img
      src={safetyglass} // example online image or import your own
      alt="safety-glass"
      className="w-full h-full  object-cover rounded-tr-xl rounded-br-xl"
    />
  </div>
  </div>

      </div>
    </>
  );
}

export default ProductCategories;
