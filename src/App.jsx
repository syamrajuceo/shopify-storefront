import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { router } from "./routes/Router";
import useShopifyStore from "./store/useShopifyStore";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "./redux/slices/reviewsSlice";
import { fetchCart } from "./redux/slices/cartSlice";
import { fetchProducts } from "./redux/slices/productSlice";



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchReviews());
    dispatch(fetchCart());
  }, [dispatch]);
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchCart();
      } catch (error) {
        console.error("Error during initial fetch:", error.message);
      }
    };
    loadData();
  }, []);

  // useEffect(() => {
  //   const isPopupShown = localStorage.getItem("popupShown");
  //   if (!isPopupShown) {
  //     setShowPopup(true);
  //     localStorage.setItem("popupShown", "true");
  //   }
  // }, []);

  // const closeModal = () => {
  //   setShowPopup(false);
  // };

  return (
    <HelmetProvider>
      <Helmet>
        <title>
          Shop High-Quality Eyewear | Sunglasses, Eyeglasses & Contact Lenses
        </title>
        <meta
          name="description"
          content="Explore a wide range of sunglasses, eyeglasses, contact lenses,
          and prescription glasses. Find stylish eyewear options to match your needs and comfort.
          Shop now for the best prices!"
        />
        <meta
          name="keywords"
          content="Sunglasses, Eyeglasses, Contact Lenses, Prescription Glasses,
           Fashion Eyewear, Stylish Sunglasses, Polarized Glasses, UV Protection,
           Blue Light Glasses, Vision Accessories, Designer Eyewear,Lightweight Frames,
           Durable Frames, Eye Care Products, Online Specs Store, Affordable Eyewear,
           Visible Frames ,eye store, Eye Care Products Dubai,Eye Care Products UAE"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://shopify-storefront-7ct7u6sbc-salih-kms-projects.vercel.app" />
      </Helmet>
      {/* {showPopup && <PopupModal closeModal={closeModal} />} */}
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};

export default App;
