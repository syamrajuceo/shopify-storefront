
import React from 'react';
import sunglass from '../../assets/sunglass.jpg'
import eyeglass from '../../assets/eyeglass.jpg'
import contactlens from '../../assets/contactlens.jpg'
const categories = [
  {
    title: 'Sunglasses',
    image:sunglass,
  },
  {
    title: 'Eyeglasses',
    image:eyeglass,
  },
  {
    title: 'Contact lenses',
    image:contactlens,
  },
];

// ProductCard Component
const ProductCard = ({ title, image }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-[320px]">
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
  return (
    //desktop
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
            />
          ))}
        </div>
      </div>
    </div>
//mobile 


    
  );
}

export default ProductCategories;

