import { useEffect, useRef, useState } from "react";
import { ScrollButton } from "./ScrollButton";
import { ProductCard } from "../productCard/ProductCard";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export function ProductCarousel2({ title, category = "" }) {
  const scrollContainerRef = useRef(null);
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const targetScroll =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);
    console.log(targetScroll);
    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const [products,setProducts] = useState([])
  
    // Properly handle async in useEffect
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5558/api/products?limit=10&category=${category}`
          );
          console.log("response ///:: ", res.data.products);
          setProducts(res.data.products)
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts();
    }, [category]);

  return (
    <div className="relative mx-auto  px-8 py-10">
      {/* Header */}
      <div className="mb-12 flex justify-between items-center align">
        <h2 className="mb-4 text-[22px] md:text-[28px]  md:text-1xl font-bold tracking-tight text-gray-900">
          {title ? title : "Explore Our Products"}
        </h2>
        <Link to="/shop">
          <span className=" items-center justify-center gap-3 hidden md:flex">
            <p className="text-lg text-gray-600 ">View all</p>
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
          {products.filter((product) =>
            category && category.length > 0
              ? category.includes(product.productType)
              : true
          ).map((product) => (
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
