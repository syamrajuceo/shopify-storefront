import React from "react";
import Carousel from "./Carousel";
import ShapeSelector from "./ShapeSelector";
import ProductCategories from "./ProductCategories";
import Brand from "./Brand";
import Banner from "./Banner";
import BannerImage1 from "../../assets/banner1.png";
import BannerImage2 from "../../assets/banner2.png";
import BannerImage3 from "../../assets/banner3.png";
import { ProductCarousel } from "./ProductCarousel";
import { ProductCarousel2 } from "./ProductCarousel2";
import bannerMobile from "../../assets/bannerMobile.png";
import bannerMobile2 from "../../assets/bannerMobile2.png";
import bannerMobile3 from "../../assets/bannerMobile3.png";
import Promo2 from "../../assets/promo3.png";
import { HomePageSkeleton } from "../skeleton/Home";
import { useSelector } from "react-redux";
export const Home = () => {
  const { status,products } = useSelector((state) => state.products);
  return (
    <div>
      {status == "loading" ? (
        <HomePageSkeleton />
      ) : (
        <>
          <Carousel />
          <ShapeSelector />
          <div className="flex flex-col gap-6">
            <ProductCategories />
            {/* <Banner image={BannerImage1} mobile={bannerMobile} /> */}
          </div>
          <ProductCarousel category={"contact lenses"} products = {products}/>
          <ProductCarousel Promoimage={Promo2} category={"sunglasses"}  products ={products}/>
          <div className="flex flex-col gap-5">
            <Banner image={BannerImage2} mobile={bannerMobile2} />
            <Banner image={BannerImage3} mobile={bannerMobile3} />
          </div>
          <Brand />
          <ProductCarousel2 tittle={"Explore Our Products"} products ={products}/>
        </>
      )}
    </div>
  );
};
