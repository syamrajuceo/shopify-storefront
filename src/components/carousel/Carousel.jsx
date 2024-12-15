// import React, { useState, useEffect } from "react";
// import { ProductCard } from "../productCard/ProductCard";
// import productImg1 from "../../assets/Rectangle 25.png";
// import productImg2 from "../../assets/Rectangle 26 (1).png";
// import productImg3 from "../../assets/Rectangle 26 (2).png";
// import productImg4 from "../../assets/Rectangle 26.png";

// const SimilarProductsCarousel = () => {
//   const products = [
//     { id: 1, image:  productImg1},
//     { id: 2, image: productImg1 },
//     { id: 3, image: productImg1 },
//     { id: 4, image: productImg1 },
//     {
//       id: 5,
//       image:
//         "https://intellilens.in/cdn/shop/products/51pYcM8vleL_7b96e926-1b64-4be7-aa28-b61c2604db4b.jpg?v=1688856502",
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? products.length - 1 : prevIndex - 1
//     );
//   };

//   // Auto-scroll every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 3000);
//     return () => clearInterval(interval); // Clear interval on component unmount
//   }, []);

//   return (
//     <div className="relative w-full max-w-[600px] mx-auto">
//       <h3 className="mt-10 text-[20px] lg:text-[25px] font-normal">
//         Similar Products
//       </h3>
//       <div className="overflow-hidden relative mt-2">
//         <div
//           className="flex transition-transform duration-500"
//           style={{
//             transform: `translateX(-${currentIndex * 100}%)`,
//           }}
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="min-w-full flex-shrink-0 flex-grow-0"
//             >
//               <img
//                 src={product.image}
//                 alt="Product"
//                 className="w-full h-auto rounded-lg"
//               />
//             </div>
//           ))}
//         </div>
//         {/* Buttons */}
//         <button
//           className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-full"
//           onClick={prevSlide}
//         >
//           &#10094;
//         </button>
//         <button
//           className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-full"
//           onClick={nextSlide}
//         >
//           &#10095;
//         </button>
//       </div>
//       {/* Dots */}
//       <div className="flex justify-center gap-2 mt-4">
//         {products.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === index ? "bg-black" : "bg-gray-400"
//             }`}
//             onClick={() => setCurrentIndex(index)}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SimilarProductsCarousel;
