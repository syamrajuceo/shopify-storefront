import { useEffect, useRef, useState } from "react";
import { ScrollButton } from "./ScrollButton";
import { ProductCard } from "../productCard/ProductCard";
// import evervaImg from "../../assets/everva.webp";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import axios from "axios";
import clearlenses from "../../assets/lenses.jpg"

export function ProductCarousel({ Promoimage, category }) {
  const scrollContainerRef = useRef(null);

  const [products,setProducts] = useState([])

  // Properly handle async in useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5558/api/products?limit=20&category=${category}`
        );
        console.log("response ///:: ", res.data.products);
        setProducts(res.data.products)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  const PromoCard = ({ title, subtitle, buttonText, imageUrl, className }) => {
    return (
      <div
        className={cn(
          "relative max-w-md group rounded-lg overflow-hidden",
          className
        )}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt="Promotional background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" />
        </div>

        {/* Content */}
        <div className="relative p-8 flex flex-col items-start h-full">
          <div className="mt-auto">
            <h2 className="md:text-2xl text-white tracking-tig">{title}</h2>
            <p className="text-3xl md:text-5xl font-extrabold text-white mb-3">
              {subtitle}
            </p>
            <Link
              className="md:inline-flex items-center gap-2 bg-white text-black px-16 py-3 rounded-md hidden"
              to="/shop/sunglass"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

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


  return (
    <div className="relative p-4 md:p-8">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory scrollbar-hide p-4 rounded-xl"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Promo Card or Everva Image */}
        {Promoimage ? (
          <PromoCard
            title="BUY 1 GET 2ND"
            subtitle="50% OFF"
            buttonText="View all"
            imageUrl={Promoimage}
            className="snap-start w-[200px] md:w-[370px] rounded-xl flex-shrink-0 h-auto"
          />
        ) : (
          <div className="snap-start w-[200px] md:w-[370px] rounded-xl flex-shrink-0 h-[430px] md:h-[430px] lg:h-[440px] xl:h-[450px]">
            <img
              src={clearlenses}
              alt="lense"
              className="object rounded-xl w-full h-full mr-2"
            />
          </div>
        )}

        {/* Product Cards */}
        {products?.map((product) => (
          <div key={product.id} className="snap-start flex-shrink-0">
            <ProductCard product={product} home={true} />
          </div>
        ))}
      </div>

      {/* Scroll Buttons */}
      <div className="md:hidden flex justify-center gap-4 mt-4">
        <ScrollButton direction="left" onClick={() => scroll("left")} />
        <ScrollButton direction="right" onClick={() => scroll("right")} />
      </div>
    </div>
  );
}