import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import expressLogo from "../../assets/images/Frame 390 1.png";
import truckImg from "../../assets/images/hugeicons_truck-delivery.png";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { ProductCard } from "../productCard/ProductCard";
import { ProductCarousel2 } from "../home/ProductCarousel2";
import "./style.css";
import { useEffect, useRef } from "react";
import { ScrollButton } from "../home/ScrollButton";
import { FaArrowRight } from "react-icons/fa";
import useShopifyStore from "../../store/useShopifyStore";

export default function ProductList({ title, category = "" }) {
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
    <div className="bg-white">
      <div className="mx-auto max-w-[95vw] py-7">
        <h2 className="text-[22px] md:text-[28px] font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        <div className="relative mx-auto   py-5">
          {/* Header */}

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
              {Products.filter((product) =>
                category
                  ? product.productType.toLowerCase() === category.toLowerCase()
                  : true
              ).map((product) => (
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
