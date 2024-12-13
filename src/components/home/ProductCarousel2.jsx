import { useEffect, useRef } from 'react';
import { ScrollButton } from './Scrollbutton';
import { ProductCard } from '../productCard/ProductCard';
import { FaArrowRight } from "react-icons/fa";
import useShopifyStore from "../../store/useShopifyStore";

export function ProductCarousel2() {
  const scrollContainerRef = useRef(null);
  const Products = useShopifyStore((state) => state.products);
// console.log(products);
  // const Products = [
  //   {
  //     id: 1,
  //     image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=500",
  //     title: "GUESS UV Protected Round Sun Glasses",
  //     originalPrice: 24.0,
  //     discountedPrice: 13.0,
  //     discount: 45,
  //     expressDelivery: true,
  //   },
  //   {
  //     id: 2,
  //     image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500",
  //     title: "Ray-Ban Aviator Classic",
  //     originalPrice: 179.0,
  //     discountedPrice: 143.2,
  //     discount: 20,
  //     expressDelivery: true,
  //   },
  //   {
  //     id: 3,
  //     image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500",
  //     title: "Oakley Holbrook",
  //     originalPrice: 156.0,
  //     expressDelivery: false,
  //   },
  //   {
  //       id: 1,
  //       image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=500",
  //       title: "GUESS UV Protected Round Sun Glasses",
  //       originalPrice: 24.0,
  //       discountedPrice: 13.0,
  //       discount: 45,
  //       expressDelivery: true,
  //     },
  //     {
  //       id: 2,
  //       image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500",
  //       title: "Ray-Ban Aviator Classic",
  //       originalPrice: 179.0,
  //       discountedPrice: 143.2,
  //       discount: 20,
  //       expressDelivery: true,
  //     },
  //     {
  //       id: 3,
  //       image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500",
  //       title: "Oakley Holbrook",
  //       originalPrice: 156.0,
  //       expressDelivery: false,
  //     },
  //     {
  //       id: 2,
  //       image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500",
  //       title: "Ray-Ban Aviator Classic",
  //       originalPrice: 179.0,
  //       discountedPrice: 143.2,
  //       discount: 20,
  //       expressDelivery: true,
  //     },
  //     {
  //       id: 3,
  //       image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500",
  //       title: "Oakley Holbrook",
  //       originalPrice: 156.0,
  //       expressDelivery: false,
  //     },
  // ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400; // Adjust scroll amount as needed
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
console.log(targetScroll)
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative mx-auto  px-8 py-16">
    {/* Header */} 
    <div className="mb-12 flex justify-between items-center align">
      <h2 className="mb-4 text-1xl  md:text-1xl font-bold tracking-tight text-gray-900">Top Selling Products</h2>
      <span className=' items-center justify-center gap-3 hidden md:flex'>
      <p className="text-lg text-gray-600 ">View all</p>
      < FaArrowRight/>
      </span>
    </div>

    {/* Carousel */}
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {Products.map((product) => (
          <div key={product.id} className="snap-start">
            <ProductCard
              className="min-w-[300px] transform transition-all duration-300 hover:scale-105"
              product={product}
            />
          </div>
        ))}
      </div>

      {/* Scroll Buttons */}
      <ScrollButton direction="left" onClick={() => scroll('left')} />
      <ScrollButton direction="right" onClick={() => scroll('right')} />
    </div>
  </div>
  );
}


