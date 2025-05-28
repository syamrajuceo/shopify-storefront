import { ProductCard } from "../productCard/ProductCard";
import { ScrollButton } from "../home/ScrollButton";
import { useSelector } from "react-redux";
import { useRef } from "react";

export default function ProductList({ title, category = "" }) {
  const scrollContainerRef = useRef(null);
  const { products, status, error } = useSelector((state) => state.products);

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
      category
        ? product.productType.toLowerCase() === category.toLowerCase()
        : true
    )
    .slice(0, 10);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[95vw] py-7">
        <h2 className="text-[22px] md:text-[28px] font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        <div className="relative mx-auto py-5">
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
                  />
                </div>
              ))}
            </div>

            {/* Scroll Buttons */}
            <ScrollButton direction="left" onClick={() => scroll("left")} />
            <ScrollButton direction="right" onClick={() => scroll("right")} />
          </div>
        </div>
      </div>
    </div>
  );
}