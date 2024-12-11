import React from 'react';
import { ArrowRight } from 'lucide-react';
const ProductCategories = () => {
  return(

  
  <div className="flex  items-center w-[500px] bg-green-200 md:h-[250px">
      <div className=" md:hidden w-[40%] flex items-center justify-center  gap-5">
          <span className="text-xl font-medium text-gray-800">sunglass</span>
          <ArrowRight className="text-black group-hover:text-gray-600 transition-colors" />
        </div>

        <div className="aspect-square  w-[60%] bg-red-200 rounded-md h-[250px] md:w-full ">
          <img
            src='https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80'
            alt='hhh'
            className="w-full h-full object-cover"
          />
        </div>
      
      </div>
  )
};

export default ProductCategories;