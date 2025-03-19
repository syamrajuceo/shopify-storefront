import { useRef } from "react";
import { ScrollButton } from "./ScrollButton";
import { ProductCard } from "../productCard/ProductCard";
import evervaImg from "../../assets/everva.webp";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export function ProductCarousel({ Promoimage, category ,products}) {
  
  const scrollContainerRef = useRef(null);

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
          <div className="absolute inset-0 " />
        </div>

        {/* Content */}
        <div className="relative p-8 flex flex-col items-start h-full">
          <div className="mt-auto">
            <h2 className="md:text-2xl text-white tracking-tig">{title}</h2>
            <p className="text-3xl md:text-5xl font-extrabold text-white mb-3">
              {subtitle}
            </p>
            \
            <Link
              className="md:inline-flex items-center gap-2 bg-white text-black px-16 py-3 rounded-md hidden"
              to="/query?query="
            >
              {/* Visible only on medium screens and above */}
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

    const scrollAmount = 400; // Adjust scroll amount as needed
    const targetScroll =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative p-4 md:p-8 ">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory scrollbar-hide p-4 rounded-xl"
        style={{
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For IE/Edge
          WebkitOverflowScrolling: "touch", // For iOS scrolling behavior
        }}
      >
        {/* Everva Image Div */}
        {Promoimage ? (
          <PromoCard
            title="BUY 1 GET 2ND"
            subtitle="50% OFF"
            buttonText="View all"
            imageUrl={Promoimage}
            className="snap-start w-[200px] md:w-[370px] rounded-xl flex-shrink-0"
          />
        ) : (
          <div className="snap-start   md:w-[370px] rounded-xl flex-shrink-0 w-[200px]  md:h-[430px] lg:h-[440px] xl:[450px]">
            <img
              src={evervaImg}
              alt="everva"
              className="object-cover rounded-xl w-full h-full mr-2"
            />
          </div>
        )}
        {/* Everva Image Div */}

        {/* Product Cards */}

        {products?.filter(
          (product) =>
            product.productType.toLowerCase() === category.toLowerCase()
        ).map((product) => (
          <div key={product.id} className="snap-start">
            <ProductCard product={product} home={true} />
          </div>
        ))}
      </div>

      {/* Scroll Buttons */}
      <div className="md:hidden">
        <ScrollButton direction="left" onClick={() => scroll("left")} />
        <ScrollButton direction="right" onClick={() => scroll("right")} />
      </div>
    </div>
  );
}
