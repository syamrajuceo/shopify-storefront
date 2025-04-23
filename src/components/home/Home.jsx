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
import { fetchProducts } from "../../redux/slices/productSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  // Filter products based on categories or tags
  const contactLenses = products.filter(
    (product) =>
      product.category === "contact-lenses" ||
      product.category === "contact-lenses"
  );

  const sunglasses = products.filter(
    (product) =>
      product.category === "Sunglasses" || product.category === "sunglasses"
  );

  const bestsellers = products.filter(
    (product) =>
      product.tags?.includes("bestseller") ||
      product.tags?.includes("bestsellers")
  );

  const newArrivals = products.filter(
    (product) =>
      product.tags?.includes("new") || product.tags?.includes("new arrivals")
  );

  // For explore products, you might want to show a mix or all products
  const exploreProducts = [...products].slice(0, 20); // Show first 20 products

  // Fetch products for each category with limit
  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        // Fetch contact lenses
        await dispatch(
          fetchProducts({
            category: "contact-lenses",
            limit: 20,
          })
        );

        // Fetch sunglasses
        await dispatch(
          fetchProducts({
            category: "Sunglasses",
            limit: 20,
          })
        );

        // Fetch bestsellers
        await dispatch(
          fetchProducts({
            tags: "bestseller",
            limit: 20,
          })
        );

        // Fetch new arrivals
        await dispatch(
          fetchProducts({
            tags: "new",
            limit: 20,
          })
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchInitialProducts();
  }, [dispatch]);

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

          <ProductCarousel
            title="Contact Lenses"
            category="contact lenses"
            products={contactLenses}
          />

          <ProductCarousel
            title="Sunglasses"
            Promoimage={Promo2}
            category="sunglasses"
            products={sunglasses}
          />

          <div className="flex flex-col gap-5">
            <Banner image={BannerImage2} mobile={bannerMobile2} />
            <Banner image={BannerImage3} mobile={bannerMobile3} />
          </div>

          <ProductCarousel2 title="Bestsellers" products={bestsellers} />

          <ProductCarousel2 title="New Arrivals" products={newArrivals} />

          <Brand />

          <ProductCarousel2
            title="Explore Our Products"
            products={exploreProducts}
          />
        </>
      )}
    </div>
  );
};
