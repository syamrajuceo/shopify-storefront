import { useRef } from "react";
import { ScrollButton } from "./ScrollButton";
import { ProductCard } from "../productCard/ProductCard";
import evervaImg from "../../assets/everva.webp";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import useShopifyStore from "../../store/useShopifyStore";
export function ProductCarousel({ Promoimage }) {
  const Products =useShopifyStore((state) => state.products);
  const scrollContainerRef = useRef(null);

  const PromoCard = ({ title, subtitle, buttonText, imageUrl, className }) => {
    return (
      <div
        className={cn(
          "relative max-w-md group rounded-lg overflow-hidden", // Ensure `overflow-hidden` is applied
          className
        )}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt="Promotional background"
            className="w-full h-full object-cover" // `rounded-lg` not needed here
          />
          <div className="absolute inset-0 " />
        </div>

        {/* Content */}
        <div className="relative p-8 flex flex-col items-start h-full">
          <div className="mt-auto">
            <h2 className="md:text-2xl text-white tracking-tig">
              {title}
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-white mb-3">
              {subtitle}
            </p>
            \
            <button className="md:inline-flex items-center gap-2 bg-white text-black px-16 py-3 rounded-md hidden">
              {/* Visible only on medium screens and above */}
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // const Products = [
  //   {
  //     id: 1,
  //     image:
  //       "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=500",
  //     title: "GUESS UV Protected Round Sun Glasses",
  //     originalPrice: 24.0,
  //     discountedPrice: 13.0,
  //     discount: 45,
  //     expressDelivery: true,
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500",
  //     title: "Ray-Ban Aviator Classic",
  //     originalPrice: 179.0,
  //     discountedPrice: 143.2,
  //     discount: 20,
  //     expressDelivery: true,
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500",
  //     title: "Oakley Holbrook",
  //     originalPrice: 156.0,
  //     expressDelivery: false,
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500",
  //     title: "Oakley Holbrook",
  //     originalPrice: 156.0,
  //     expressDelivery: false,
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500",
  //     title: "Oakley Holbrook",
  //     originalPrice: 156.0,
  //     expressDelivery: false,
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500",
  //     title: "Oakley Holbrook",
  //     originalPrice: 156.0,
  //     expressDelivery: false,
  //   },
  // ];

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
          className="flex overflow-x-auto gap-6 xl:gap-0 scroll-smooth snap-x snap-mandatory scrollbar-hide  justify-between p-4 rounded-[18px]"
          style={{
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For IE/Edge
            WebkitOverflowScrolling: "touch", // For iOS scrolling behavior
          }}
        >
          {/* Everva Image Div */}
          {Promoimage?( <PromoCard
            title="BUY 1 GET 2ND"
            subtitle="50% OFF"
            buttonText="View all"
            imageUrl={Promoimage}
            className="snap-start w-[200px] md:w-[370px] rounded-xl flex-shrink-0"
          />):(  <div className="snap-start   md:w-[370px] rounded-xl flex-shrink-0 w-[200px] h-[345px] md:h-[440px]">
            <img
              src={evervaImg}
              alt="everva"
              className="object-cover rounded-xl w-full h-full"
            />
          </div>) }
{/* Everva Image Div */}
         
          {/* Product Cards */}

          {Products.slice(0, 4).map((product) => (

            <div key={product.id} className="snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        <div className="md:hidden">
        <ScrollButton direction="left" onClick={() => scroll("left")} />
        <ScrollButton direction="right" onClick={() => scroll("right")}  />
        </div>
      </div>
   
  );
}
