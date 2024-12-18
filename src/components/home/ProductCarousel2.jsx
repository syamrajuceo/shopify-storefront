import { useEffect, useRef } from "react";
import { ScrollButton } from "./ScrollButton";
import { ProductCard } from "../productCard/ProductCard";
import { FaArrowRight } from "react-icons/fa";
import useShopifyStore from "../../store/useShopifyStore";

export function ProductCarousel2() {
  const scrollContainerRef = useRef(null);
  const Products = useShopifyStore((state) => state.products);
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400; // Adjust scroll amount as needed
    const targetScroll =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);
    console.log(targetScroll);
    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mx-auto  px-8 py-16">
      {/* Header */}
      <div className="mb-12 flex justify-between items-center align">
        <h2 className="mb-4 text-1xl  md:text-1xl font-bold tracking-tight text-gray-900">
          Top Selling Products
        </h2>
        <span className=" items-center justify-center gap-3 hidden md:flex">
          <p className="text-lg text-gray-600 ">View all</p>
          <FaArrowRight />
        </span>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {Products.map((product) => (
            <div key={product.id} className="snap-start">
              <ProductCard
                className="min-w-[300px] transform transition-all duration-300 hover:scale-105"
                product={product}
                home={true}
              />
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        <ScrollButton direction="left" onClick={() => scroll("left")} />
        <ScrollButton direction="right" onClick={() => scroll("right")} />
      </div>
    </div>
  );
}
