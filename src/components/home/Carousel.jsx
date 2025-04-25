import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import banner from "../../assets/banner.png";
 
const slides = [
{
title: "TRENDING",
subtitle: "SUMMER",
description: "THE S COLLECTION",
cta: "EXPLORE",
image:
"https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80",
path: "/shop",
},
{
title: "FEATURED",
subtitle: "ELEGANCE",
description: "THE E COLLECTION",
cta: "DISCOVER",
image:
"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80",
path: "/shop",
},
{
title: "FEATURED",
subtitle: "ELEGANCE",
description: "THE E COLLECTION",
cta: "DISCOVER",
image: banner,
path: "/shop",
},
];
 
export default function Carousel() {
const [currentSlide, setCurrentSlide] = useState(0);
const [isTransitioning, setIsTransitioning] = useState(false);
 
const nextSlide = useCallback(() => {
if (isTransitioning) return;
setIsTransitioning(true);
setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
}, [isTransitioning]);
 
const prevSlide = useCallback(() => {
if (isTransitioning) return;
setIsTransitioning(true);
setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
}, [isTransitioning]);
 
const goToSlide = (index) => {
if (isTransitioning || index === currentSlide) return;
setIsTransitioning(true);
setCurrentSlide(index);
};
 
useEffect(() => {
const timer = setInterval(nextSlide, 5000);
return () => clearInterval(timer);
}, [nextSlide]);
 
// Reset transitioning state after animation completes
useEffect(() => {
const timer = setTimeout(() => {
setIsTransitioning(false);
}, 500);
 
return () => clearTimeout(timer);
}, [currentSlide]);
 
return (
<div className="p-4 md:p-8">
<div className="relative h-[450px] w-full overflow-hidden rounded-[18px]">
<div
className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
style={{ transform: `translateX(-${currentSlide * 100}%)` }}
>
{slides.map((slide, index) => (
<div key={index} className="flex-shrink-0 w-full h-full">
<div className="relative w-full h-full">
<img
src={slide.image}
alt={slide.title}
className="w-full h-full object-cover"
loading={index === currentSlide ? "eager" : "lazy"}
/>
<div className="absolute inset-0 bg-black bg-opacity-40">
<div className="flex flex-col items-center justify-center h-full text-white">
<span className="text-purple-400 text-xl mb-2 animate-fade-in">
{slide.title}
</span>
<h2 className="text-6xl font-bold mb-4 animate-fade-in">
{slide.subtitle}
</h2>
<p className="text-2xl mb-8 animate-fade-in">
{slide.description}
</p>
<Link
to={slide.path}
className="px-8 py-3 bg-white text-black font-semibold hover:bg-purple-100 transition-colors duration-300 transform hover:scale-105"
>
{slide.cta}
</Link>
</div>
</div>
</div>
</div>
))}
</div>
 
{/* Navigation Arrows */}
<button
onClick={prevSlide}
className="absolute left-4 top-[90%] -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors duration-300"
aria-label="Previous slide"
>
<ChevronLeft className="w-6 h-6 text-white" />
</button>
<button
onClick={nextSlide}
className="absolute right-4 top-[90%] -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors duration-300"
aria-label="Next slide"
>
<ChevronRight className="w-6 h-6 text-white" />
</button>
 
{/* Dots Navigation */}
<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
{slides.map((_, index) => (
<button
key={index}
onClick={() => goToSlide(index)}
className={`w-3 h-3 rounded-full transition-all duration-300 ${
index === currentSlide
? "bg-white w-6"
: "bg-white/50 hover:bg-white/70"
}`}
aria-label={`Go to slide ${index + 1}`}
/>
))}
</div>
</div>
</div>
);
}