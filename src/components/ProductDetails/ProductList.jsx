
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import expressLogo from "../../assets/images/Frame 390 1.png";
import truckImg from "../../assets/images/hugeicons_truck-delivery.png";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { ProductCard } from "../productCard/ProductCard";
import "./style.css"
const products = [
  {
    id: 1,
    name: "GUESS UV Protected ROUND Sun Glasses",
    href: "#",
    imageSrc:
      "https://assets.ajio.com/medias/sys_master/root/20240713/RYgu/66922da46f60443f3106a1c1/-473Wx593H-464805313-brown-MODEL.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "14.99",
    color: "Black",
  },
  {
    id: 2,
    name: "GUESS UV Protected ROUND Sun Glasses",
    href: "#",
    imageSrc: "https://m.media-amazon.com/images/I/91CDvsP0CyL._AC_UY1100_.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "16.99",
    color: "Black",
  },
  {
    id: 3,
    name: "GUESS UV Protected ROUND Sun Glasses",
    href: "#",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAGkgokQWkeIrVRPnZyhMWocf70GRzDiU9Xw&s",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "19.99",
    color: "Black",
  },
  {
    id: 4,
    name: "GUESS UV Protected ROUND Sun Glasses",
    href: "#",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp8hyY6uY2wLIYq9wPWXoovXXZMsC4mi2YvA&s",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "09.99",
    color: "Black",
  },
  {
    id: 5,
    name: "GUESS UV Protected ROUND Sun Glasses",
    href: "#",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp8hyY6uY2wLIYq9wPWXoovXXZMsC4mi2YvA&s",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "09.99",
    color: "Black",
  },
  {
    id: 6,
    name: "GUESS UV Protected ROUND Sun Glasses",
    href: "#",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp8hyY6uY2wLIYq9wPWXoovXXZMsC4mi2YvA&s",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "09.99",
    color: "Black",
  },
  {
    id: 7,
    name: "GUESS UV Protected ROUND Sun Glasses",
    href: "#",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp8hyY6uY2wLIYq9wPWXoovXXZMsC4mi2YvA&s",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "09.99",
    color: "Black",
  },
];


const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    largeDesktop: {
      breakpoint: { max: 3000, min: 1600 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    smallTablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  

export default function ProductList({ title }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[90vw] py-7">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>

        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-20-px"
        >
            {products?.length > 0 ? (
                      products.map(
                        (product) =>
                          product && <ProductCard key={product.id} product={product} />
                      )
                    ) : (
                      <p>No products available</p>
                    )}
          {/* {products.map((product) => (
            <div
              key={product.id}
              className="group relative mx-2 w-[300px] h-auto mt-[20px] max-h-[500px]"
            >
              <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                <div className="absolute top-[10px] left-[10px] text-[13px] py-[3px] px-3 text-[#00cf1f] bg-[#ffffff] rounded border border-[#00cf1f]">
                  <p>45%</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center w-full">
                <h3 className="text-sm text-gray-700 w-[70%] font-[500]">
                  {product.name}
                </h3>
                <p className="text-sm px-2 py-1 bg-gray-200 rounded font-[600]">
                  AED {product.price}
                </p>
              </div>
              <div className="flex items-center mt-3 gap-3">
                <img src={expressLogo} alt="" />
                <div className="flex items-center gap-1">
                  <img src={truckImg} alt="" />
                  <p>Free Delivery</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 bg-gray-900 rounded mt-4 py-1.5 text-white">
                <ShoppingBagIcon />
                <p className="">Add to cart</p>
              </div>
            </div>
          ))} */}
        </Carousel>
      </div>
    </div>
  );
}