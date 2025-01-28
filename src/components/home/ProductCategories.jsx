import React from "react";
import { useNavigate } from "react-router-dom";
import sunglass from "../../assets/sunglass.jpg";
import eyeglass from "../../assets/eyeglass.jpg";
import contactlens from "../../assets/contactlens.jpg";
import { IoMdArrowForward } from "react-icons/io";
import eyeglass2 from "../../assets/Category_Image.webp"
const categories = [
  {
    title: "Sunglasses",
    image: sunglass,
    path:'/shop/sunGlasses'
  },
  {
    title: "Eyeglasses",
    image: eyeglass,
    path:'/shop/eyeGlasses'
  },
  {
    title: "Contact lenses",
    image: contactlens,
    path:'/shop/contactLenses'
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
          className="w-full h-full  object-cover transition-transform duration-300 group-hover:scale-110"
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
      <div className="h-[400px] hidden md:flex">
        <div className=" mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className=" font-bold text-gray-900 md:text-2xl mb-4 mt-5">
              Product Categories
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
        <div className="flex" onClick={()=>{navigate('/sunglasses')}}>
          <div className="flex items-center justify-center gap-2 h-[150px] bg-custom-gray w-[40%] rounded-tl-xl rounded-bl-xl ">
            <h1 className="text-md">sunglass </h1>
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

        <div className="flex" onClick={()=>{navigate('/eyeglasses')}}>
          <div className="flex items-center justify-center gap-2 h-[150px]  w-[60%] ">
            <img
              src={eyeglass2}
              alt="eyeglass"
              className="w-full h-full  object-cover rounded-tl-xl rounded-bl-xl"
            />
          </div>
          <div className="flex items-center justify-center gap-2 h-[150px] bg-custom-gray w-[40%] rounded-tr-xl rounded-br-xl ">
            <h1 className="text-md">Eyeglass</h1>
            <IoMdArrowForward />
          </div>
        </div>

        <div className="flex"  onClick={()=>{navigate('/eyeglasses')}}>
          <div className="flex items-center justify-center gap-2 h-[150px] bg-custom-gray w-[40%] rounded-tl-[18px] rounded-bl-[18px] ">
            <h1 className="text-md">Contact lenses </h1>
            <IoMdArrowForward />
          </div>

          <div className="flex items-center justify-center gap-2 h-[150px]  w-[60%] "onClick={()=>{navigate('/contactLenses')}}>
            <img
              src={contactlens}
              alt="contactlens"
              className="w-full h-full  object-cover rounded-tr-xl rounded-br-xl"
            />
          </div>
        </div>

      </div>
    </>
  );
}

export default ProductCategories;
