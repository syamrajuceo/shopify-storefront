import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "./Carousel";
import ShapeSelector from "./ShapeSelector";
import ProductCategories from "./ProductCategories";
import Brand from "./Brand";
import Banner from "./Banner";
import BannerImage1 from "../../assets/banner1.png";
import BannerImage2 from "../../assets/banner2.png";
import BannerImage3 from "../../assets/banner3.png";
import { ProductCarousel } from "./ProductCarousel";
import bannerMobile from "../../assets/bannerMobile.png";
import bannerMobile2 from "../../assets/bannerMobile2.png";
import bannerMobile3 from "../../assets/bannerMobile3.png";
import Promo2 from "../../assets/promo3.png";
import { HomePageSkeleton } from "../skeleton/Home";
import { ProductCarousel2 } from "./ProductCarousel2";

export const Home = () => {
  return (
    <div>
      {status === "loading" ? (
        <HomePageSkeleton />
      ) : (
        <>
          <Carousel />
          <ShapeSelector />
          <div className="flex flex-col gap-6">
            <ProductCategories />
            <Banner image={BannerImage1} mobile={bannerMobile} />
          </div>

          <ProductCarousel title="Contact Lenses" category="contact lenses" />

          <ProductCarousel
            title="Sunglasses"
            Promoimage={Promo2}
            category="sunglasses"
          />

          <div className="flex flex-col gap-5">
            <Banner image={BannerImage2} mobile={bannerMobile2} />
            <Banner image={BannerImage3} mobile={bannerMobile3} />
          </div>

          <ProductCarousel2 title="Bestsellers" />

          <ProductCarousel2 title="New Arrivals" />

          <Brand />

          <ProductCarousel2 title="Explore Our Products" />
        </>
      )}
    </div>
  );
};
