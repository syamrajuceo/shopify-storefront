import { useRef } from 'react';
import { ScrollButton } from './Scrollbutton';
import { ProductCard } from '../productCard/ProductCard';
import evervaImg from '../../assets/everva.webp';

export function ProductCarousel() {
  const scrollContainerRef = useRef(null);

  const Products = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=500",
      title: "GUESS UV Protected Round Sun Glasses",
      originalPrice: 24.0,
      discountedPrice: 13.0,
      discount: 45,
      expressDelivery: true,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500",
      title: "Ray-Ban Aviator Classic",
      originalPrice: 179.0,
      discountedPrice: 143.2,
      discount: 20,
      expressDelivery: true,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500",
      title: "Oakley Holbrook",
      originalPrice: 156.0,
      expressDelivery: false,
    },
  ];

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
    <div className="relative mx-auto  p-4 bg-custom-rose">
      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Everva Image Div */}
          <div className="bg-red-200  md:w-[400px] md:h-[460px] rounded-xl flex-shrink-0  w-[200px]">
            <img
              src={evervaImg}
              alt="everva"
              className="h-full w-full object-cover rounded-xl"
            />
          </div>

          {/* Product Cards */}
          {Products.map((product) => (
            <div key={product.id} className="snap-start flex-shrink-0">
              <ProductCard
                image={product.image}
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
