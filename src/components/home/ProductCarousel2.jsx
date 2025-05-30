import { useRef } from "react";
import { ScrollButton } from "./ScrollButton";
import { ProductCard } from "../productCard/ProductCard";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export function ProductCarousel2({ title, category = "", products }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const targetScroll =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  // Filter and limit products to 10
  const filteredProducts = products
    ?.filter((product) =>
      category && category.length > 0
        ? category.includes(product.productType)
        : true
    )
    .slice(0, 10);

  return (
    <div className="relative mx-auto px-8 py-10">
      {/* Header */}
      <div className="mb-12 flex justify-between items-center">
        <h2 className="mb-4 text-[22px] md:text-[28px] md:text-1xl font-bold tracking-tight text-gray-900">
          {title ? title : "Explore Our Products"}
        </h2>
        <Link to="/shop">
          <span className="items-center justify-center gap-3 hidden md:flex">
            <p className="text-lg text-gray-600">View all</p>
            <FaArrowRight />
          </span>
        </Link>
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
          {filteredProducts?.map((product) => (
            <div key={product.id} className="snap-start">
              <ProductCard
                className="min-w-[300px] transform transition-all duration-300 hover:scale-105"
                product={product}
                home={title === "Similar Products" ? false : true}
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